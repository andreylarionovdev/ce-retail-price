<?php declare(strict_types=1);

namespace Ce\RetailPrice\Storefront\Subscriber;

use Ce\RetailPrice\Core\Content\RetailPriceRule\RetailPriceRuleEntity;
use Shopware\Core\Checkout\Customer\Aggregate\CustomerGroup\CustomerGroupEntity;
use Shopware\Core\Content\Product\SalesChannel\Detail\AbstractProductDetailRoute;
use Shopware\Core\Content\Rule\Aggregate\RuleCondition\RuleConditionEntity;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Sorting\FieldSorting;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Storefront\Page\Product\ProductPageLoadedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class RetailPriceRuleSubscriber implements EventSubscriberInterface
{
    private AbstractProductDetailRoute $productDetailRoute;

    private EntityRepositoryInterface $customerGroupRepository;

    private EntityRepositoryInterface $retailPriceRepository;

    private EntityRepositoryInterface $ruleConditionRepository;

    public function __construct(
        AbstractProductDetailRoute $productDetailRoute,
        EntityRepositoryInterface $customerGroupRepository,
        EntityRepositoryInterface $retailPriceRepository,
        EntityRepositoryInterface $ruleConditionRepository
    )
    {
        $this->productDetailRoute = $productDetailRoute;
        $this->customerGroupRepository = $customerGroupRepository;
        $this->retailPriceRepository = $retailPriceRepository;
        $this->ruleConditionRepository = $ruleConditionRepository;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            ProductPageLoadedEvent::class => 'onProductPageLoaded',
        ];
    }

    public function onProductPageLoaded(ProductPageLoadedEvent $event): void
    {
        $context = $event->getSalesChannelContext();

        $currentCustomerGroup = $context->getCurrentCustomerGroup();
        if (!$currentCustomerGroup) {
            $currentCustomerGroup = $context->getFallbackCustomerGroup();
        }

        $retailPriceRule = $this->fetchRetailPriceRuleByTargetCustomerGroupId($currentCustomerGroup->getId());

        if (!$retailPriceRule) {
            return;
        }

        $sourceCustomerGroup = $this->fetchSourceCustomerGroupByRetailPriceRule($retailPriceRule);

        if (!$sourceCustomerGroup) {
            return;
        }

        $sourceSalesChannelContext = new SalesChannelContext(
            $context->getContext(),
            $context->getToken(),
            $context->getSalesChannel(),
            $context->getCurrency(),
            $sourceCustomerGroup,
            $sourceCustomerGroup,
            $context->getTaxRules(),
            $context->getPaymentMethod(),
            $context->getShippingMethod(),
            $context->getShippingLocation(),
            null,
            $context->getItemRounding(),
            $context->getTotalRounding(),
        );

        $ruleId = $this->fetchPriceRuleIdByCustomerGroup($sourceCustomerGroup);

        $sourceSalesChannelContext->setRuleIds(array_merge([$ruleId], $context->getRuleIds()));

        $criteria = (new Criteria())
            ->addAssociation('manufacturer.media')
            ->addAssociation('options.group')
            ->addAssociation('properties.group')
            ->addAssociation('mainCategories.category');

        $criteria
            ->getAssociation('media')
            ->addSorting(new FieldSorting('position'));

        $originalProductId = $event->getPage()->getProduct()->getId();

        $result = $this->productDetailRoute->load(
            $originalProductId,
            $event->getRequest(),
            $sourceSalesChannelContext,
            $criteria
        );

        $productWithRetailPrice = $result->getProduct();

        $event->getPage()->getProduct()->addExtension('product_with_retail_price', $productWithRetailPrice);
    }

    private function fetchPriceRuleIdByCustomerGroup(CustomerGroupEntity $customerGroup): string {
        $ruleConditionsCustomerGroup = $this->ruleConditionRepository->search(
            (new Criteria())->addFilter(
                new EqualsFilter('type', 'customerCustomerGroup')
            ),
            Context::createDefaultContext()
        );

        /**
         * @var $ruleCondition RuleConditionEntity
         */
        foreach ($ruleConditionsCustomerGroup->getEntities() as $ruleCondition) {
            $value = $ruleCondition->getValue();
            $customerGroupId = $customerGroup->getId();
            $ruleCustomerGroupIds = $value['customerGroupIds'];
            $sourceCustomerGroupFoundInArray = array_search($customerGroupId, $ruleCustomerGroupIds) !== false;

            if ($value['operator'] === '=' && $sourceCustomerGroupFoundInArray) {
                return $ruleCondition->getRuleId();
            }
        }

        return '';
    }

    private function fetchRetailPriceRuleByTargetCustomerGroupId(string $targetCustomerGroupId): RetailPriceRuleEntity {
        return $this->retailPriceRepository->search(
            (new Criteria())->addFilter(
                new EqualsFilter('targetCustomerGroupId', $targetCustomerGroupId)
            ),
            Context::createDefaultContext()
        )->first();
    }

    private function fetchSourceCustomerGroupByRetailPriceRule(RetailPriceRuleEntity $retailPriceRule): CustomerGroupEntity {
        return $this->customerGroupRepository->search(
            new Criteria([
                $retailPriceRule->getSourceCustomerGroupId()
            ]),
            Context::createDefaultContext()
        )->first();
    }
}
