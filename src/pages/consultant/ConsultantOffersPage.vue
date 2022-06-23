<template>
  <q-page class="q-pa-lg bg-grey-1">
    <div
      v-for="(offer, i) in offers"
      :key="i"
      class="q-pb-md"
    >
      <q-card class="full-width" flat style="border: 1px solid #DDDDDD; border-radius: 8px">
        <q-card-section>
          <span class="consultant_offer_subtitle">
              {{ offer.subtitle }}
          </span>
          <div class="edit-wrapper">
            <div class="text-h6" :class="{'disabled_offer': !offer.isEnabled}">
              <span v-if="!offer.isEnabled">(disabled)</span>

              {{ offer.title }}

            </div>
            <div>
              <q-btn icon="edit" :to="{name: 'consultant-edit-offer', params: {offerId: offer.id}}" flat
                     color="primary"/>
            </div>
          </div>
          <div>
            {{ offer.description }}
          </div>
          <br>
          <div>
            Price: ${{ offer.price }}
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div
      class="text-right"
    >
      <rifgo-btn
        icon="add"
        label="Add offer"
        :to="{name: 'consultant-create-offer'}"
      />
    </div>

  </q-page>
</template>

<style lang="scss">
.copy-link-btn {
  margin-bottom: 16px;
  background-color: #F9F9F9;

  svg {
    margin-right: 5px;
  }
}

.edit-wrapper {
  display: flex;
  justify-content: space-between;
}

.disabled_offer {
  color: #c7c7c7;
  text-decoration: line-through;
}

.consultant_offer_subtitle {
  color: #9C9C9C;
  line-height: 24px;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
}

</style>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {IConsultantOffer} from 'src/models/ConsultantInterfaces'
import RifgoBtn from 'components/custom/RifgoBtn.vue'
import {getConsultantOffers} from 'src/api/consultantRequests'

export default defineComponent({
  components: {RifgoBtn},
  setup() {
    const offers = ref<Array<IConsultantOffer>>([]);

    onMounted(async () => {
      offers.value = await getConsultantOffers();
    });

    return {
      offers,
    }
  },
});
</script>
