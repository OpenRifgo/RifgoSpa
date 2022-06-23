<template>
  <q-card style="margin: 2px">
    <q-card-section>

<!--      Workshop-->
      <div class="text-h5 q-pb-md">
        {{ event.name }}
      </div>

      <date-time-component :event="event"/>

      <div class="stream-description q-pb-md"
           v-html="event.description" />

      <div class="q-mb-md" style="margin-bottom: 32px">
        <div style="margin-bottom: 7px">Speaker</div>
        <speaker-component :with-padding="false"
          :speaker="{ name: event.speakerName, title: event.speakerTitle, avatarUrl: event.speakerAvatarUrl }"
        />
      </div>
      <slot></slot>


    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import SpeakerComponent from './SpeakerComponent.vue'
import moment from 'moment';
import DateTimeComponent from 'components/DateTimeComponent.vue';

export default defineComponent({
  name: 'EventPromoCardComponent',
  components: {DateTimeComponent, SpeakerComponent},
  props: {
    event: {
      type: Object,
    },
    withoutOldTime: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const eventProps = computed(() => props.event )
    const eventDate = computed(() => eventProps.value?moment.utc(eventProps.value.date).format('MMMM D'):'' )

    const eventTime = (time: string) => {
      let localEventTime = moment(eventDate.value).add(time)
      return (localEventTime.minute()===0) ? localEventTime.format('ha') : localEventTime.format('h:mma')
    }

    const eventTimeFrom = computed(() => eventProps.value ? eventTime(eventProps.value.timeFrom) : '')
    const eventTimeTo = computed(() => eventProps.value ? eventTime(eventProps.value.timeTo) : '')

    return {eventDate, eventTimeFrom, eventTimeTo}
  },
  methods: {}
});

</script>
<style lang="scss">
.stream-description {
  color: #666666;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.4px;
}
</style>
