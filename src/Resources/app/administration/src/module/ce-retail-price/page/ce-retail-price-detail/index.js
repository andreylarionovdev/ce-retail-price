import template from './ce-retail-price-detail.html.twig';

const { Component, Mixin } = Shopware;

Component.register('ce-retail-price-detail', {
  template,

  inject: [
    'repositoryFactory'
  ],

  mixins: [
    Mixin.getByName('notification')
  ],

  metaInfo() {
    return {
      title: this.$createTitle()
    };
  },

  data() {
    return {
      entity: null,
      isLoading: false,
      processSuccess: false,
      repository: null
    };
  },

  created() {
    this.repository = this.repositoryFactory.create('ce_retail_price_rule');
    this.getEntity();
  },

  methods: {
    getEntity() {
      this.repository
        .get(this.$route.params.id, Shopware.Context.api)
        .then((entity) => {
          this.entity = entity;
        });
    },

    onClickSave() {
      this.isLoading = true;

      this.repository
        .save(this.entity, Shopware.Context.api)
        .then(() => {
          this.getEntity();
          this.isLoading = false;
          this.processSuccess = true;
        }).catch((exception) => {
        this.isLoading = false;
        this.createNotificationError({
          title: this.$t('ce-retail-price.detail.errorTitle'),
          message: exception
        });
      });
    },

    saveFinish() {
      this.processSuccess = false;
    }
  }
});
