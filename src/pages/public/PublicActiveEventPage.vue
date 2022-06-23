<template>

  <q-page
    class="row items-center justify-evenly"
    v-if="!userHasAccess"
  >
    <div class="full-width" style="height: 100vh">
      <stripe-pay-event-iframe
        :event="event"
        :eventRegistration="eventRegistration"
      />
    </div>
  </q-page>

  <event-page-finished-state
    v-else-if="event.isFinallyStoped"
    :event-registration="eventRegistration"
  />

  <event-page-not-started-state
    v-else-if="!isStreamStarted"
    :event="event"
  />

  <event-page-active-state
    :event="event"
    :event-registration="eventRegistration"
    v-else
  />
</template>

<style lang="scss">
.auth_tabs .q-tab__label {
  color: #1D1D1D;
}

@media (max-width: $breakpoint-sm-max) {
  .streamingPage {
    font-size: 0.8rem;

    .q-message-name, .q-message-stamp, .q-message-label {
      font-size: 0.8rem;
    }

    .q-input {
      font-size: 0.8rem;
      //transform: scale(0.8);
    }
  }
}
</style>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref, watch} from 'vue';
import {useGlobalLocale} from 'src/uses/useGlobalLocale'
import {websocketsInstance, websocketsEmitter} from 'src/uses/useSockets'
import {useRoute} from 'vue-router'
import {api} from 'boot/axios'
import {IEvent, IEventRegistration} from 'src/models/EventModels'
import EventPageActiveState from 'src/widgets/event/EventPageActiveState.vue'
import EventPageNotStartedState from 'src/widgets/event/EventPageNotStartedState.vue'
import {onUnmounted} from '@vue/runtime-core'
import {useEventSubscriptionFactory} from 'src/uses/useEventSubscription'
import EventPageFinishedState from 'src/widgets/event/EventPageFinishedState.vue';
import StripePayEventIframe from 'components/stripe/StripePayEventIframe.vue'

export default defineComponent({
  name: 'PublicActiveEventPage',
  components: {StripePayEventIframe, EventPageNotStartedState, EventPageFinishedState, EventPageActiveState},
  setup() {
    const route = useRoute();

    const ws = websocketsInstance;

    const regSecret = computed(() => String(route.params.regSecret))
    const eventSubscription = useEventSubscriptionFactory({secret: regSecret.value});

    const eventId = ref<number>()

    const event = reactive<Partial<IEvent>>({});

    const eventRegistration = reactive<Partial<IEventRegistration>>({});

    const userHasAccess = computed(() => event.accessType == 'free' || eventRegistration.paid);

    const loadEventId = async () => {
      const response = await api.get<{ event: IEvent, eventRegistration: {paid: boolean} }>(`/api/public/event?regSecret=${regSecret.value}`);
      Object.assign(event, response.data.event);
      Object.assign(eventRegistration, response.data.eventRegistration);
      eventId.value = response.data.event.id;
    }

    onMounted(async () => {
      eventSubscription.onMounted();
      await loadEventId();
      console.log({event})
    });
    watch(regSecret, loadEventId);

    onUnmounted(() => {
      eventSubscription.onUnmounted();
    })

    websocketsEmitter.on('event:broadcast:started', () => {
      // todo: send from back & check event id or uid
      void loadEventId()
    });

    websocketsEmitter.on('event:broadcast:finished', () => {
      // todo: send from back & check event id or uid
      void loadEventId()
    });

    return {
      tab: ref('login'),
      ...useGlobalLocale(),
      websocketsInstance: ws,
      eventId,
      event,
      eventRegistration,
      userHasAccess,
      isStreamStarted: computed(() => event?.streamingBroadcastLink)
    };
  },
});
</script>
