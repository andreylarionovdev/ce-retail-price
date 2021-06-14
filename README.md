# Shopware 6 Plugin
Give your retailer customers the [RRP (recommended retail price)](https://en.wikipedia.org/wiki/List_price) directly in the shop view. No price entry is required. The price will be taken from the specified customer group.
## How to install
Clone plugin to your Shopware 6 plugins folder:

``git clone https://github.com/andreylarionovdev/ce-retail-price.git``

#### Using terminal
Refresh plugin list and install plugin using `bin/console` from root development folder:

``bin/console plugin:refresh``

``bin/console plugin:install --activate --clearCache RetailPrice``

#### Using administration panel
Login to the Shopware 6 admin panel and enable plugin manually.

![Activate plugin](https://user-images.githubusercontent.com/53269810/121904610-a1647280-cd29-11eb-8ed4-91d44e8e4e71.png)
*Activate Plugin*

![Create new rule](https://user-images.githubusercontent.com/53269810/121904617-a2959f80-cd29-11eb-988a-541c975ad837.png)
*Create new rule*

![Rules list](https://user-images.githubusercontent.com/53269810/121904620-a32e3600-cd29-11eb-82e2-89000795df48.png)
*Rules list*
