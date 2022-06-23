<template>

  <div
    v-if="settings.showDonate && isDesktop && !isMaximized"
    class="inline-block q-pl-md">
    <q-btn
      label="Donate"
      icon="redeem"
      no-caps
      class="streamingPage_donateBtn"
      rounded
      @click="onDonateClick"
    />
  </div>

  <div
    v-if="settings.shopUrl && isDesktop && !isMaximized"
    class="inline-block q-pl-md"
  >
    <q-btn
      label="Shop"
      icon="fas fa-shopping-cart"
      no-caps
      class="streamingPage_donateBtn"
      rounded
      type="a"
      target="_blank"
      :href="settings.shopUrl"
    />
  </div>

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
