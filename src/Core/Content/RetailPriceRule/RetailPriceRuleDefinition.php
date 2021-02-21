<?php declare(strict_types=1);

namespace Ce\RetailPrice\Core\Content\RetailPriceRule;

use Shopware\Core\Checkout\Customer\Aggregate\CustomerGroup\CustomerGroupDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\BoolField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\ApiAware;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;

class RetailPriceRuleDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'ce_retail_price_rule';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new ApiAware(), new PrimaryKey(), new Required()),
            (new FkField('target_customer_group_id', 'targetCustomerGroupId', CustomerGroupDefinition::class))->addFlags(new ApiAware(), new Required()),
            (new FkField('source_customer_group_id', 'sourceCustomerGroupId', CustomerGroupDefinition::class))->addFlags(new ApiAware(), new Required()),
            (new ManyToOneAssociationField('targetCustomerGroup', 'target_customer_group_id', CustomerGroupDefinition::class))->addFlags(new ApiAware()),
            (new ManyToOneAssociationField('sourceCustomerGroup', 'source_customer_group_id', CustomerGroupDefinition::class))->addFlags(new ApiAware()),
            new BoolField('is_gross', 'isGross'),
            new BoolField('show_saved_percentage', 'showSavedPercentage'),
            new BoolField('consider_pseudoprice', 'considerPseudoprice')
        ]);
    }
}