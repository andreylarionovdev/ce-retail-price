<?php declare(strict_types=1);

namespace Ce\SuggestedRetailPrice\Core\Content\SuggestedRetailPrice;

use Shopware\Core\Checkout\Customer\Aggregate\CustomerGroup\CustomerGroupEntity;
use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;

class SuggestedRetailPriceEntity extends Entity
{

    use EntityIdTrait;

    /**
     * @var string
     */
    protected $targetCustomerGroupId;

    /**
     * @var string
     */
    protected $sourceCustomerGroupId;

    /**
     * @var CustomerGroupEntity
     */
    protected $targetCustomerGroup;

    /**
     * @var CustomerGroupEntity
     */
    protected $sourceCustomerGroup;

    /**
     * @var boolean
     */
    protected $isGross;

    /**
     * @var boolean
     */
    protected $showSavedPercentage;

    /**
     * @var boolean
     */
    protected $considerPseudoprice;

    public function getTargetCustomerGroupId(): string
    {
        return $this->targetCustomerGroupId;
    }

    public function setTargetCustomerGroupId(string $targetCustomerGroupId): void
    {
        $this->targetCustomerGroupId = $targetCustomerGroupId;
    }

    public function getSourceCustomerGroupId(): string
    {
        return $this->sourceCustomerGroupId;
    }

    public function setSourceCustomerGroupId(string $sourceCustomerGroupId): void
    {
        $this->sourceCustomerGroupId = $sourceCustomerGroupId;
    }

    public function getTargetCustomerGroup(): CustomerGroupEntity
    {
        return $this->targetCustomerGroup;
    }

    public function setTargetCustomerGroup(CustomerGroupEntity $targetCustomerGroup): void
    {
        $this->targetCustomerGroup = $targetCustomerGroup;
    }

    public function getSourceCustomerGroup(): CustomerGroupEntity
    {
        return $this->sourceCustomerGroup;
    }

    public function setSourceCustomerGroup(CustomerGroupEntity $sourceCustomerGroup): void
    {
        $this->sourceCustomerGroup = $sourceCustomerGroup;
    }

    public function getIsGross(): bool
    {
        return $this->isGross;
    }

    public function setIsGross(bool $isGross): void
    {
        $this->isGross = $isGross;
    }

    public function getShowSavedPercentage(): bool
    {
        return $this->showSavedPercentage;
    }

    public function setShowSavedPercentage(bool $showSavedPercentage): void
    {
        $this->showSavedPercentage = $showSavedPercentage;
    }

    public function getConsiderPseudoprice(): bool
    {
        return $this->considerPseudoprice;
    }

    public function setConsiderPseudoprice(bool $considerPseudoprice): void
    {
        $this->considerPseudoprice = $considerPseudoprice;
    }
}