<template>
  <q-tab-panels v-model="panel" animated>
    <q-tab-panel name="next-event-list">
      <div class="q-px-lg q-py-md">
        <speaker-component
          :speaker="{ name: event.speakerName, title: event.speakerTitle, avatarUrl: event.speakerAvatarUrl }"
        />
      </div>

      <div class="text-h5 q-pa-md" v-if="isMyEvent">
        My events
      </div>
      <div v-if="isMyEvent">
        <event-promo-card-component
          v-for="event in myEvents"
          :key="event.id"
          class="q-ma-md"
          :event="event"
        >
          <q-btn
            label="Attend"
            no-caps
            size="1.1rem"
            color="primary"
            @click='attendBtnListener(event)'
            style="width: 100%"
          />
        </event-promo-card-component>
      </div>
      <div class="text-h5 q-pa-md" v-if="isRecommendedEvent">
        I recommend
      </div>

      <div v-if="isRecommendedEvent">
        <event-promo-card-component
          v-for="event in recommendedEvents"
          :key="event.id"
          class="q-ma-md"
          :event="event"
        >
          <q-btn
            label="Attend"
            no-caps
            size="1.1rem"
            color="primary"
            @click='attendBtnListener(event)'
            style="width: 100%"

          />
        </event-promo-card-component>
      </div>
    </q-tab-panel>
    <q-tab-panel name="next-event-email">
      <div class="q-px-lg q-py-md">
        <speaker-component
          :speaker="{ name: actualRecommendedEvent.speakerName, title: actualRecommendedEvent.speakerTitle, avatarUrl: actualRecommendedEvent.speakerAvatarUrl }"
        />
      </div>

      <div class="text-h4 q-pb-md">
        {{ actualRecommendedEvent.name }}
      </div>

      <date-time-component :event="actualRecommendedEvent"/>

      <event-registration-form
        :event-uid="actualRecommendedEvent.publicEventLink.uid"
        :event="actualRecommendedEvent"
        @open-next-event-sent-tab='panel="next-event-sent-tab"'
      />

      <div class="row q-pb-md q-pt-md">
        <div class="col">

          <div class="q-pb-md text-h6">Description</div>

          <div v-html="actualRecommendedEvent.description" />

        </div>
      </div>

    </q-tab-panel>
    <q-tab-panel name="next-event-sent-tab">
      <q-card
        style="min-width: 272px"
      >
        <q-card-section
          class="text-center text-green q-pa-none"
        >
          <q-icon
            class="q-pt-lg q-pb-sm"
            name="fas fa-check-circle"
            size="xl"
          />
        </q-card-section>

        <q-card-section
          style="max-height: 50vh"
          class="text-bold text-center"
        >
          <p>
            We have sent<br/>
            a confirmation link<br/>
            to your email
          </p>

          <q-btn
            class="full-width"
            color="primary"
            label="OK"
            @click="$emit('finished')"
          />
        </q-card-section>
      </q-card>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script lang="ts">

import SpeakerComponent from './SpeakerComponent.vue';
import EventPromoCardComponent from 'components/event/EventPromoCardComponent.vue'
import {computed, onMounted, reactive, ref} from 'vue';
import {IEvent, IEventWithPublicEventLink} from 'src/models/EventModels';
import {useRoute} from 'vue-router';
import {getRecommendedEvents} from 'src/api/registredRequests';
import EventRegistrationForm from 'components/event/EventRegistrationForm.vue';
import DateTimeComponent from 'components/DateTimeComponent.vue';

export default {
  components: {DateTimeComponent, EventPromoCardComponent, SpeakerComponent, EventRegistrationForm},
  props: {
    event: {
      type: Object,
    },
  },
  emits: ['finished'],
  setup() {
    const regSecret = computed(() => String(useRoute().params.regSecret))

    const isMyEvent = computed(() => myEvents.value.length > 0)
    const isRecommendedEvent = computed(() => recommendedEvents.value.length > 0)
    const myEvents = ref<Array<IEvent>>([]);
    let actualRecommendedEvent = reactive<Partial<IEventWithPublicEventLink>>({});
    const recommendedEvents = ref<Array<IEventWithPublicEventLink>>([]);

    const loadRecommendedEvents = async () => {
      const response = await getRecommendedEvents(regSecret.value);
      Object.assign(myEvents.value, response.data.myEvents);
      Object.assign(recommendedEvents.value, response.data.recommendedEvents);
    }

    let panel = ref('next-event-list');
    // openNextEventSentTab

    const setActualRecommendedEvent = (chosenEvent: IEvent) => {
      console.log({chosenEvent})
      Object.assign(actualRecommendedEvent, chosenEvent);
    }

    const attendBtnListener = (chosenEvent: IEvent) => {
      setActualRecommendedEvent(chosenEvent);

      panel.value = 'next-event-email';
    }

    onMounted(async () => {
      await loadRecommendedEvents();
    });

    return {
      isMyEvent,
      isRecommendedEvent,
      myEvents,
      recommendedEvents,
      panel,
      actualRecommendedEvent,
      attendBtnListener,
      regSecret
    }
  }
}
</script>

