<template>
  <q-page class="row items-center justify-evenly bg-black full-height" style="min-height: 100vh;">

    <div class="col-4" style="min-height: 100vh;">

      <event-chat-widget
        v-if="eventId"
        :event-id="eventId"
        class="full-height"
        style="min-height: 100vh;"

      />

    </div>

  </q-page>
</template>

<style>
.auth_tabs .q-tab__label {
  color: #1D1D1D;
}
</style>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref, watch} from 'vue';
import EventChatWidget from 'src/widgets/chat/EventChatWidget.vue'
import {useRoute} from 'vue-router'
import {api} from 'boot/axios'
import {IEvent, IEventRegistration} from 'src/models/EventModels'

export default defineComponent({
  name: 'EventChatPage',
  components: {EventChatWidget},
  setup() {
    const route = useRoute();
    const regSecret = computed(() => String(route.params.regSecret));
    const eventId = ref<number>();
    const screenName = ref('');
    const eventRegistration = reactive<Partial<IEventRegistration>>({});

    const loadEventId = async () => {
      const response = await api.get<{ event: IEvent, eventRegistration: {paid: boolean} }>(`/api/public/event?regSecret=${regSecret.value}`);
      Object.assign(event, response.data.event);
      Object.assign(eventRegistration, response.data.eventRegistration);
      eventId.value = response.data.event.id;
    }

    onMounted(loadEventId);
    watch(regSecret, loadEventId);

    return {
      eventId,
      screenName
    }
  },
});
</script>
