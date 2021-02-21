<?php declare(strict_types=1);

namespace Ce\SuggestedRetailPrice\Storefront\Page\Product\Subscriber;

use Shopware\Core\Checkout\Cart\Price\QuantityPriceCalculator;
use Shopware\Core\Checkout\Cart\Price\Struct\PriceCollection;
use Shopware\Core\Checkout\Customer\Aggregate\CustomerGroup\CustomerGroupEntity;
use Shopware\Core\Content\Product\ProductEvents;
use Shopware\Core\Content\Product\SalesChannel\Price\ProductPriceDefinitionBuilderInterface;
use Shopware\Core\Content\Product\SalesChannel\SalesChannelProductEntity;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Event\EntityLoadedEvent;
use Shopware\Core\Framework\DataAbstractionLayer\Pricing\CalculatedListingPrice;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Storefront\Page\Product\ProductPageLoadedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ProductPageSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            ProductPageLoadedEvent::class => 'onProductPageLoaded',
            ProductEvents::PRODUCT_LOADED_EVENT => 'onProductsLoaded',
        ];
    }

    /**
     * @var QuantityPriceCalculator
     */
    private $priceCalculator;

    /**
     * @var ProductPriceDefinitionBuilderInterface
     */
    private $priceDefinitionBuilder;

    /**
     * @var EntityRepositoryInterface
     */
    private $customerGroupRepository;

    /**
     * @var EntityRepositoryInterface
     */
    private $suggestedRetailPriceRepository;

    public function __construct(
        QuantityPriceCalculator $quantityPriceCalculator,
        ProductPriceDefinitionBuilderInterface $priceDefinitionBuilder,
        EntityRepositoryInterface $customerGroupRepository,
        EntityRepositoryInterface $suggestedRetailPriceRepository
    )
    {
        $this->priceCalculator = $quantityPriceCalculator;
        $this->priceDefinitionBuilder = $priceDefinitionBuilder;
        $this->customerGroupRepository = $customerGroupRepository;
        $this->suggestedRetailPriceRepository = $suggestedRetailPriceRepository;
    }

    public function onProductPageLoaded(ProductPageLoadedEvent $event): void
    {
//        /**
//         * @var SalesChannelProductEntity
//         */
//        $product = $event->getPage()->getProduct();
//        /**
//         * @var CalculatedPrice
//         */
//        $fromCalculatedPrice = $product->getCalculatedListingPrice()->getFrom();
//        /**
//         * @var float
//         */
//        $fromPrice = $fromCalculatedPrice->getUnitPrice();
//        /**
//         * @var CalculatedPrice
//         */
//        $toCalculatedPrice = $product->getCalculatedListingPrice()->getTo();
//        /**
//         * @var float
//         */
//        $toPrice = $toCalculatedPrice->getUnitPrice();

        /**
         * @var SalesChannelContext
         */
        $context = $event->getSalesChannelContext();

        $currentCustomerGroup = $context->getCurrentCustomerGroup();
        if (!$currentCustomerGroup) {
            $currentCustomerGroup = $context->getFallbackCustomerGroup();
        }

        $matchedSuggestedRetailPriceRule = $this->suggestedRetailPriceRepository->search(
            (new Criteria())->addFilter(
                new EqualsFilter('targetCustomerGroupId', $currentCustomerGroup->getId())
            ),
            Context::createDefaultContext()
        )->first();

        if (!$matchedSuggestedRetailPriceRule) {
            return;
        }

        /**
         * @var CustomerGroupEntity
         */
        $sourceCustomerGroup = $this->customerGroupRepository->search(
            new Criteria([
                $matchedSuggestedRetailPriceRule['sourceCustomerGroupId']
            ]),
            Context::createDefaultContext()
        )->first();

        if (!$sourceCustomerGroup) {
            return;
        }

//        dd($sourceCustomerGroup->getName());

        /**
         * @var bool
         */
        $showSavedPercentage = $matchedSuggestedRetailPriceRule['showSavedPercentage'];
        /**
         * @var bool
         */
        $considerPseudoprice = $matchedSuggestedRetailPriceRule['considerPseudoprice'];

        /**
         * @var bool
         */
        $isGross = $matchedSuggestedRetailPriceRule['isGross'];

//        $sourceCustomerGroup->setDisplayGross(true);

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
            $context->getTotalRounding()
        );

//        dd($context, $sourceSalesChannelContext);

        $originalProduct = $event->getPage()->getProduct();
        $toProduct = clone $originalProduct;

//        dd($sourceCustomerGroup);
        dd($originalProduct->getPrices());

        $this->calculatePrices($sourceSalesChannelContext, $originalProduct);

        dd($originalProduct);

//        /**
//         * @var CalculatedPrice
//         */
//        $srpFromCalculatedPrice = $this->priceCalculator->calculate(
//            $fromPrice,
//            $product->getCalculatedPrices(),
//            $sourceSalesChannelContext
//        );
//        /**
//         * @var CalculatedPrice
//         */
//        $srpToCalculatedPrice = $this->priceCalculator->calculate(
//            $toPrice,
//            $product->getCalculatedPrices(),
//            $sourceSalesChannelContext
//        );

//        dd($srpFromCalculatedPrice, $srpToCalculatedPrice);
//        $event->getPage()->getProduct()->addExtension('ce_suggested_retail_price', );
    }

    public function onProductsLoaded(EntityLoadedEvent $event): void
    {
//        $products = $event->getEntities();
////        dd($event);
//
//        /** @var SalesChannelProductEntity $product */
//        foreach ($products as $product) {
////            dd($product);
//            try {
//                $suggestedRetailPrice = $product->getCalculatedPrices();
//            } catch (\TypeError $e) {
//                $suggestedRetailPrice = null;
//            }
//
//            $product->addExtension('ce_suggested_retail_price', $suggestedRetailPrice);
//        }
    }

    private function calculatePrices(SalesChannelContext $context, SalesChannelProductEntity $product): void
    {
        $prices = $this->priceDefinitionBuilder->build($product, $context);

        //calculate listing price
        $product->setCalculatedListingPrice(
            new CalculatedListingPrice(
                $this->priceCalculator->calculate($prices->getFrom(), $context),
                $this->priceCalculator->calculate($prices->getTo(), $context)
            )
        );

        $priceCollection = new PriceCollection();
        foreach ($prices->getPrices() as $price) {
            $priceCollection->add($this->priceCalculator->calculate($price, $context));
        }

        //calculate context prices
        $product->setCalculatedPrices($priceCollection);

        //calculate simple price
        $product->setCalculatedPrice(
            $this->priceCalculator->calculate($prices->getPrice(), $context)
        );
    }
}
