<?php declare(strict_types=1);

namespace Ce\RetailPrice\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1613661918RetailPriceRule extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1613661918;
    }

    public function update(Connection $connection): void
    {
        $connection->executeUpdate('
            CREATE TABLE IF NOT EXISTS `ce_retail_price_rule` (
              `id` BINARY(16) NOT NULL,
              `target_customer_group_id` BINARY(16) NOT NULL,
              `source_customer_group_id` BINARY(16) NOT NULL,
              `is_gross` BOOLEAN NOT NULL DEFAULT FALSE,
              `show_saved_percentage` BOOLEAN NOT NULL DEFAULT FALSE,
              `consider_pseudoprice` BOOLEAN NOT NULL DEFAULT FALSE,
              `created_at` DATETIME(3) NOT NULL,
              `updated_at` DATETIME(3) NULL,
              PRIMARY KEY (`id`),
              CONSTRAINT `fk.customer_group.target_id` FOREIGN KEY (`target_customer_group_id`)
                REFERENCES `customer_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
              CONSTRAINT `fk.customer_group.source_id` FOREIGN KEY (`source_customer_group_id`)
                REFERENCES `customer_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ');
    }

    public function updateDestructive(Connection $connection): void
    {
        // implement update destructive
    }
}
