<template>

  <q-btn
    v-if="settings.showDonate && !isDesktop && !isMaximized"
    flat dense round size="lg"
    icon="redeem"
    class="q-my-md q-mx-sm streamingPage_donateBtn"
    rounded
    @click="onDonateClick"
  >
    <q-tooltip>Donate</q-tooltip>
  </q-btn>

  <q-btn
    v-if="settings.shopUrl && !isDesktop && !isMaximized"
    flat dense round size="lg"
    icon="fas fa-shopping-cart"
    class="q-my-md q-mx-sm streamingPage_donateBtn"
    rounded
    type="a"
    target="_blank"
    :href="settings.shopUrl"
  >
    <q-tooltip>Shop</q-tooltip>
  </q-btn>

</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {IPublicEventSettings} from 'src/models/EventModels'

export default defineComponent({
  props: {
    isDesktop: {
      type: Boolean,
      default: false,
    },
    isMaximized: {
      type: Boolean,
      default: false,
    },
    settings: {
      type: Object as PropType<IPublicEventSettings>,
      default: () => ({}),
    }
  },
  emits: ['donateClick'],
  setup(props, {emit}) {
    const onDonateClick = () => emit('donateClick');

    return {
      onDonateClick
    }
  }
})
</script>
