<?php declare(strict_types=1);

namespace Ce\RetailPrice;

use Shopware\Core\Framework\Plugin;
use Shopware\Core\Framework\Plugin\Context\UninstallContext;
use Shopware\Core\Kernel;

class RetailPrice extends Plugin
{
    public function uninstall(UninstallContext $context): void
    {
        parent::uninstall($context);

        if ($context->keepUserData()) {
            return;
        }

        $connection = Kernel::getConnection();

        $connection->executeUpdate('DROP TABLE IF EXISTS `ce_retail_price_rule`');
    }
}