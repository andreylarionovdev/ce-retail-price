(this.webpackJsonp=this.webpackJsonp||[]).push([["retail-price"],{AFxO:function(e,t){e.exports='{% block ce_retail_price_list %}\n    <sw-page class="ce-retail-price-list">\n        {% block ce_retail_price_list_smart_bar_actions %}\n            <template slot="smart-bar-actions">\n                <sw-button variant="primary" :routerLink="{ name: \'ce.retail.price.create\' }">\n                    {{ $t(\'ce-retail-price.list.addButtonText\') }}\n                </sw-button>\n            </template>\n        {% endblock %}\n\n        <template slot="content">\n            {% block ce_retail_price_list_content %}\n                <sw-entity-listing\n                    v-if="entities"\n                    :items="entities"\n                    :repository="repository"\n                    :showSelection="false"\n                    :columns="columns"\n                    detailRoute="ce.retail.price.detail">\n                </sw-entity-listing>\n            {% endblock %}\n        </template>\n    </sw-page>\n{% endblock %}\n'},INo5:function(e,t){e.exports='{% block ce_retail_price_detail %}\n    <sw-page class="ce-retail-price-detail">\n        <template slot="smart-bar-actions">\n            <sw-button :routerLink="{ name: \'ce.retail.price.list\' }">\n                {{ $t(\'ce-retail-price.detail.cancelButtonText\') }}\n            </sw-button>\n\n            <sw-button-process\n                :isLoading="isLoading"\n                :processSuccess="processSuccess"\n                variant="primary"\n                @process-finish="saveFinish"\n                @click="onClickSave">\n                {{ $t(\'ce-retail-price.detail.saveButtonText\') }}\n            </sw-button-process>\n        </template>\n\n        <template slot="content">\n            <sw-card-view>\n                <sw-card v-if="entity" :isLoading="isLoading">\n                    <sw-entity-single-select\n                        required\n                        :label="$t(\'ce-retail-price.detail.targetCustomerGroupLabel\')"\n                        v-model="entity.targetCustomerGroupId"\n                        entity="customer_group">\n                    </sw-entity-single-select>\n                    <sw-entity-single-select\n                        required\n                        :label="$t(\'ce-retail-price.detail.sourceCustomerGroupLabel\')"\n                        v-model="entity.sourceCustomerGroupId"\n                        entity="customer_group">\n                    </sw-entity-single-select>\n                    <sw-switch-field\n                        :label="$t(\'ce-retail-price.detail.displayGrossLabel\')"\n                        v-model="entity.displayGross">\n                    </sw-switch-field>\n                    <sw-switch-field\n                        :label="$t(\'ce-retail-price.detail.displaySavedPercentageLabel\')"\n                        v-model="entity.showSavedPercentage">\n                    </sw-switch-field>\n                    <sw-switch-field\n                        :label="$t(\'ce-retail-price.detail.considerPseudopriceLabel\')"\n                        v-model="entity.considerPseudoprice">\n                    </sw-switch-field>\n                </sw-card>\n            </sw-card-view>\n        </template>\n    </sw-page>\n{% endblock %}\n'},LigV:function(e,t,i){"use strict";i.r(t);var r=i("AFxO"),n=i.n(r);const{Component:s}=Shopware,{Criteria:o}=Shopware.Data;s.register("ce-retail-price-list",{template:n.a,inject:["repositoryFactory"],data:()=>({repository:null,entities:null}),metaInfo(){return{title:this.$createTitle()}},computed:{columns(){return[{property:"targetCustomerGroup.name",dataIndex:"targetCustomerGroup.name",label:this.$t("ce-retail-price.list.columnTargetCustomerGroup")},{property:"sourceCustomerGroup.name",dataIndex:"sourceCustomerGroup.name",label:this.$t("ce-retail-price.list.columnSourceCustomerGroup")}]}},created(){this.repository=this.repositoryFactory.create("ce_retail_price_rule");const e=new o;e.addAssociation("targetCustomerGroup").addAssociation("sourceCustomerGroup"),this.repository.search(e,Shopware.Context.api).then(e=>{this.entities=e})}});var a=i("INo5"),c=i.n(a);const{Component:l,Mixin:p}=Shopware;l.register("ce-retail-price-detail",{template:c.a,inject:["repositoryFactory"],mixins:[p.getByName("notification")],metaInfo(){return{title:this.$createTitle()}},data:()=>({entity:null,isLoading:!1,processSuccess:!1,repository:null}),created(){this.repository=this.repositoryFactory.create("ce_retail_price_rule"),this.getEntity()},methods:{getEntity(){this.repository.get(this.$route.params.id,Shopware.Context.api).then(e=>{this.entity=e})},onClickSave(){this.isLoading=!0,this.repository.save(this.entity,Shopware.Context.api).then(()=>{this.getEntity(),this.isLoading=!1,this.processSuccess=!0}).catch(e=>{this.isLoading=!1,this.createNotificationError({title:this.$t("ce-retail-price.detail.errorTitle"),message:e})})},saveFinish(){this.processSuccess=!1}}});i("ZeMR");var u=i("R8cX"),d=i("kYi+");Shopware.Module.register("ce-retail-price",{type:"plugin",name:"SRP for Retailers",color:"#cb45ff",title:"ce-retail-price.general.mainMenuItemGeneral",description:"ce-retail-price.general.descriptionTextModule",snippets:{"de-DE":u,"en-GB":d},routes:{list:{component:"ce-retail-price-list",path:"list"},detail:{component:"ce-retail-price-detail",path:"detail/:id",meta:{parentPath:"ce.retail.price.list"}},create:{component:"ce-retail-price-create",path:"create",meta:{parentPath:"ce.retail.price.list"}}},navigation:[{label:"ce-retail-price.general.mainMenuItemGeneral",color:"#ff3d58",path:"ce.retail.price.list",icon:"default-building-home",position:100}]})},R8cX:function(e){e.exports=JSON.parse('{"ce-retail-price":{"general":{"mainMenuItemGeneral":"UVP für Händler","descriptionTextModule":"Verwalte die UVP hier"},"list":{"addButtonText":"Neue Relation hinzufügen","columnTargetCustomerGroup":"Anzeigen für Kundengruppe","columnSourceCustomerGroup":"Kundengruppe für Preis","columnDisplayGross":"Brutto UVP","columnShowSavedPercentage":"Gesparte Prozent anzeigen","columnConsiderPseudoprice":"Pseudopreis berücksichtigen"},"detail":{"targetCustomerGroupLabel":"Anzeigen für Kundengruppe","sourceCustomerGroupLabel":"UVP Preise von Kundengruppe nutzen","displayGrossLabel":"Brutto UVP anzeigen","displaySavedPercentageLabel":"Gesparte Prozent anzeigen","considerPseudopriceLabel":"Pseudopreis berücksichtigen","cancelButtonText":"Abbrechen","saveButtonText":"Speichern","errorTitle":"Fehler beim Speichern der Relation"}}}')},ZeMR:function(e,t){const{Component:i}=Shopware;i.extend("ce-retail-price-create","ce-retail-price-detail",{methods:{getEntity(){this.entity=this.repository.create(Shopware.Context.api)},onClickSave(){this.isLoading=!0,this.repository.save(this.entity,Shopware.Context.api).then(()=>{this.isLoading=!1,this.$router.push({name:"ce.retail.price.detail",params:{id:this.entity.id}})}).catch(e=>{this.isLoading=!1,this.createNotificationError({title:this.$t("ce-retail-price.detail.errorTitle"),message:e})})}}})},"kYi+":function(e){e.exports=JSON.parse('{"ce-retail-price":{"general":{"mainMenuItemGeneral":"SRP for Retailers","descriptionTextModule":"Manage SRP"},"list":{"addButtonText":"Add new rule","columnTargetCustomerGroup":"Display for Customer Group","columnSourceCustomerGroup":"Customer Group for Price","columnDisplayGross":"Display Gross","columnShowSavedPercentage":"Show Saved Percentage","columnConsiderPseudoprice":"Consider Pseudopreis"},"detail":{"targetCustomerGroupLabel":"Display for Customer Group","sourceCustomerGroupLabel":"Customer Group for Price","displayGrossLabel":"Display Gross","displaySavedPercentageLabel":"Show Saved Percentage","considerPseudopriceLabel":"Consider Pseudopreis","cancelButtonText":"Cancel","saveButtonText":"Save","errorTitle":"Error by saving rule"}}}')}},[["LigV","runtime"]]]);