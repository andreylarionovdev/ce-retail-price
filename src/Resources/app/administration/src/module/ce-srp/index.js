import './page/ce-srp-list';
import './page/ce-srp-detail';
import './page/ce-srp-create';

Shopware.Module.register('ce-srp', {
  type: 'plugin',
  name: 'Suggested Retail Price',
  color: '#cb45ff',
  icon: 'default-building-home',
  title: 'Suggested Retail Price',
  description: 'Manage Suggested Retail Price',

  routes: {
    list: {
      component: 'ce-srp-list',
      path: 'list'
    },
    detail: {
      component: 'ce-srp-detail',
      path: 'detail/:id',
      meta: {
        parentPath: 'ce.srp.list'
      }
    },
    create: {
      component: 'ce-srp-create',
      path: 'create',
      meta: {
        parentPath: 'ce.srp.list'
      }
    },
  },

  navigation: [{
    label: 'Suggested Retail Price',
    color: '#ff3d58',
    path: 'ce.srp.list',
    icon: 'default-shopping-paper-bag-product',
    position: 100
  }]
});