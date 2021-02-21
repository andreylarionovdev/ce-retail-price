import './page/ce-retail-price-list';
import './page/ce-retail-price-detail';
import './page/ce-retail-price-create';

import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';

Shopware.Module.register('ce-retail-price', {
  type: 'plugin',
  name: 'SRP for Retailers',
  color: '#cb45ff',
  title: 'ce-retail-price.general.mainMenuItemGeneral',
  description: 'ce-retail-price.general.descriptionTextModule',

  snippets: {
    'de-DE': deDE,
    'en-GB': enGB
  },

  routes: {
    list: {
      component: 'ce-retail-price-list',
      path: 'list'
    },
    detail: {
      component: 'ce-retail-price-detail',
      path: 'detail/:id',
      meta: {
        parentPath: 'ce.retail.price.list'
      }
    },
    create: {
      component: 'ce-retail-price-create',
      path: 'create',
      meta: {
        parentPath: 'ce.retail.price.list'
      }
    },
  },

  navigation: [{
    label: 'ce-retail-price.general.mainMenuItemGeneral',
    color: '#ff3d58',
    path: 'ce.retail.price.list',
    icon: 'default-building-home',
    position: 100
  }]
});