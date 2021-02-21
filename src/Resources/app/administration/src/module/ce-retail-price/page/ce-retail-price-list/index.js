import template from './ce-retail-price-list.html.twig';

const { Component } = Shopware;
const { Criteria } = Shopware.Data;

Component.register('ce-retail-price-list', {
  template,

  inject: [
    'repositoryFactory'
  ],

  data() {
    return {
      repository: null,
      entities: null
    };
  },

  metaInfo() {
    return {
      title: this.$createTitle()
    };
  },

  computed: {
    columns() {
      return [{
        property: 'targetCustomerGroup.name',
        dataIndex: 'targetCustomerGroup.name',
        label: this.$t('ce-retail-price.list.columnTargetCustomerGroup'),
      }, {
        property: 'sourceCustomerGroup.name',
        dataIndex: 'sourceCustomerGroup.name',
        label: this.$t('ce-retail-price.list.columnSourceCustomerGroup'),
      }];
    }
  },

  created() {
    this.repository = this.repositoryFactory.create('ce_retail_price_rule');

    const criteria = new Criteria();

    criteria
      .addAssociation('targetCustomerGroup')
      .addAssociation('sourceCustomerGroup');

    this.repository
      .search(criteria, Shopware.Context.api)
      .then((result) => {
        this.entities = result;
      });
  }
});