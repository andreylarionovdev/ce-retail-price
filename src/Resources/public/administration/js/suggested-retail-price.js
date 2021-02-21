(this.webpackJsonp=this.webpackJsonp||[]).push([["suggested-retail-price"],{K0Kg:function(e,t){e.exports='{% block ce_srp_detail %}\n    <sw-page class="ce-srp-detail">\n        <template slot="smart-bar-actions">\n            <sw-button :routerLink="{ name: \'ce.srp.list\' }">\n                Cancel\n            </sw-button>\n\n            <sw-button-process\n                :isLoading="isLoading"\n                :processSuccess="processSuccess"\n                variant="primary"\n                @process-finish="saveFinish"\n                @click="onClickSave">\n                Save\n            </sw-button-process>\n        </template>\n\n        <template slot="content">\n            <sw-card-view>\n                <sw-card v-if="entity" :isLoading="isLoading">\n                    <sw-entity-single-select\n                        required\n                        :label="\'Target Customer Group\'"\n                        v-model="entity.targetCustomerGroupId"\n                        entity="customer_group">\n                    </sw-entity-single-select>\n                    <sw-entity-single-select\n                        required\n                        :label="\'Source Customer Group\'"\n                        v-model="entity.sourceCustomerGroupId"\n                        entity="customer_group">\n                    </sw-entity-single-select>\n                    <sw-switch-field\n                        :label="\'Gross\'"\n                        v-model="entity.isGross">\n                    </sw-switch-field>\n                    <sw-switch-field\n                        :label="\'Show saved percentage\'"\n                        v-model="entity.showSavedPercentage">\n                    </sw-switch-field>\n                    <sw-switch-field\n                        :label="\'Consider Pseudoprice\'"\n                        v-model="entity.considerPseudoprice">\n                    </sw-switch-field>\n                </sw-card>\n            </sw-card-view>\n        </template>\n    </sw-page>\n{% endblock %}\n'},QHT9:function(e,t){const{Component:s}=Shopware;s.extend("ce-srp-create","ce-srp-detail",{methods:{getEntity(){this.entity=this.repository.create(Shopware.Context.api)},onClickSave(){this.isLoading=!0,this.repository.save(this.entity,Shopware.Context.api).then(()=>{this.isLoading=!1,this.$router.push({name:"ce.srp.detail",params:{id:this.entity.id}})}).catch(e=>{this.isLoading=!1,this.createNotificationError({title:"Unexpected Error!",message:e})})}}})},ifrv:function(e,t){e.exports='{% block ce_srp_list %}\n    <sw-page class="ce-srp-list">\n        {% block ce_srp_list_smart_bar_actions %}\n            <template slot="smart-bar-actions">\n                <sw-button variant="primary" :routerLink="{ name: \'ce.srp.create\' }">\n                    Add Row\n                </sw-button>\n            </template>\n        {% endblock %}\n\n        <template slot="content">\n            {% block ce_srp_list_content %}\n                <sw-entity-listing\n                    v-if="entities"\n                    :items="entities"\n                    :repository="repository"\n                    :showSelection="false"\n                    :columns="columns"\n                    detailRoute="ce.srp.detail">\n                </sw-entity-listing>\n            {% endblock %}\n        </template>\n    </sw-page>\n{% endblock %}\n'},x5jw:function(e,t,s){"use strict";s.r(t);var i=s("ifrv"),n=s.n(i);const{Component:r,Mixin:o}=Shopware,{Criteria:a}=Shopware.Data;r.register("ce-srp-list",{template:n.a,inject:["repositoryFactory"],data:()=>({repository:null,entities:null}),metaInfo(){return{title:this.$createTitle()}},computed:{columns:()=>[{property:"targetCustomerGroup.name",dataIndex:"targetCustomerGroup.name",label:"Target Customer Group"},{property:"sourceCustomerGroup.name",dataIndex:"sourceCustomerGroup.name",label:"Source Customer Group"}]},created(){this.repository=this.repositoryFactory.create("ce_suggested_retail_price");const e=new a;e.addAssociation("targetCustomerGroup").addAssociation("sourceCustomerGroup"),this.repository.search(e,Shopware.Context.api).then(e=>{this.entities=e})}});var c=s("K0Kg"),p=s.n(c);const{Component:l,Mixin:d}=Shopware;l.register("ce-srp-detail",{template:p.a,inject:["repositoryFactory"],mixins:[d.getByName("notification")],metaInfo(){return{title:this.$createTitle()}},data:()=>({entity:null,isLoading:!1,processSuccess:!1,repository:null}),created(){this.repository=this.repositoryFactory.create("ce_suggested_retail_price"),this.getEntity()},methods:{getEntity(){this.repository.get(this.$route.params.id,Shopware.Context.api).then(e=>{this.entity=e})},onClickSave(){this.isLoading=!0,this.repository.save(this.entity,Shopware.Context.api).then(()=>{this.getEntity(),this.isLoading=!1,this.processSuccess=!0}).catch(e=>{this.isLoading=!1,this.createNotificationError({title:"Unexpected Error!",message:e})})},saveFinish(){this.processSuccess=!1}}});s("QHT9");Shopware.Module.register("ce-srp",{type:"plugin",name:"Suggested Retail Price",color:"#cb45ff",icon:"default-building-home",title:"Suggested Retail Price",description:"Manage Suggested Retail Price",routes:{list:{component:"ce-srp-list",path:"list"},detail:{component:"ce-srp-detail",path:"detail/:id",meta:{parentPath:"ce.srp.list"}},create:{component:"ce-srp-create",path:"create",meta:{parentPath:"ce.srp.list"}}},navigation:[{label:"Suggested Retail Price",color:"#ff3d58",path:"ce.srp.list",icon:"default-shopping-paper-bag-product",position:100}]})}},[["x5jw","runtime"]]]);