<template>
  <div class="text-white" style="font-size: 1rem; line-height: 1.4rem">
    <q-icon name="visibility" size="1.4rem" style="position: relative; top: -0.1rem"/> {{ viewersCounter || 0 }}
  </div>
</template>

<style lang="scss">
</style>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {websocketsEmitter} from 'src/uses/useSockets'
import {onUnmounted} from '@vue/runtime-core'
import {IViewersCountChanged} from 'src/modules/chat/chatModels'

export default defineComponent({
  name: 'EventCounterWidget',
  components: {},
  props: {
    eventId: {
      type: Number
    }
  },
  setup() {
    const viewersCounter = ref<number | null>(null);

    // handler
    const onViewersCountChanged = (data?: IViewersCountChanged) => {
      viewersCounter.value = data?.data?.viewersCount || null;
    }

    onMounted(() => {
      websocketsEmitter.on<IViewersCountChanged>('sub:broadcast:viewers-count-changed', onViewersCountChanged);
    });

    onUnmounted(() => {
      websocketsEmitter.off<IViewersCountChanged>('sub:broadcast:viewers-count-changed', onViewersCountChanged);
    });

    return {
      viewersCounter
    }
  },
});
</script>
