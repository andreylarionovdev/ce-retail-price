import './page/ce-retail-price-list';
import './page/ce-retail-price-detail';
import './page/ce-retail-price-create';

Shopware.Module.register('ce-retail-price', {
  type: 'plugin',
  name: 'Suggested Retail Price',
  color: '#cb45ff',
  title: 'Suggested Retail Price',
  description: 'Manage Suggested Retail Price',

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
    label: 'Suggested Retail Price',
    color: '#ff3d58',
    path: 'ce.retail.price.list',
    icon: 'default-building-home',
    position: 100
  }]
});