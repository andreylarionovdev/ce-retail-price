import template from './ce-srp-list.html.twig';

const { Component, Mixin } = Shopware;
const { Criteria } = Shopware.Data;

Component.register('ce-srp-list', {
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
        // naturalSorting: true,
        label: 'Target Customer Group',
        // allowResize: true,
        // inlineEdit: 'string',
        // align: 'right',
        // useCustomSort: true,
      }, {
        property: 'sourceCustomerGroup.name',
        dataIndex: 'sourceCustomerGroup.name',
        // naturalSorting: true,
        label: 'Source Customer Group',
        // allowResize: true,
        // inlineEdit: 'string',
        // align: 'right',
        // useCustomSort: true,
      }];
    }
  },

  created() {
    this.repository = this.repositoryFactory.create('ce_suggested_retail_price');

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