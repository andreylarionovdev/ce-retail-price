const { Component } = Shopware;

Component.extend('ce-srp-create', 'ce-srp-detail', {
  methods: {
    getEntity() {
      this.entity = this.repository.create(Shopware.Context.api);
    },

    onClickSave() {
      this.isLoading = true;

      this.repository
        .save(this.entity, Shopware.Context.api)
        .then(() => {
          this.isLoading = false;
          this.$router.push({ name: 'ce.srp.detail', params: { id: this.entity.id } });
        }).catch((exception) => {
        this.isLoading = false;

        this.createNotificationError({
          title: 'Unexpected Error!',
          message: exception
        });
      });
    }
  }
});
