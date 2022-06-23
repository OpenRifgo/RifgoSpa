<template>
  <q-page class='q-pa-lg bg-grey-1'>
    <div
      class="row"
    >
      <div class="col-8">

        <div v-if='event.streamingSessionId && event.streamingToken'>
          <vonage-session
            :api-key='apiKey'
            :session-id='event.streamingSessionId'
            :token='event.streamingToken'
            ref="vonageSessionRef"
          />
        </div>

        <div>
          <div
            v-for="eventLink in event.eventLinks"
            v-bind:key="eventLink.uid"
          >
            <q-input
              type="text"
              :model-value="`https://app.rifgo.com/#/event/${eventLink.uid}`"
              outlined
              disable
            />
          </div>
        </div>
      </div>

      <div class="col-4">

        <event-chat-widget
          :event-id="eventId"
        />

      </div>

    </div>
  </q-page>
</template>

<style>
.auth_tabs .q-tab__label {
  color: #1D1D1D;
}
</style>

<script lang='ts'>
import {defineComponent, onMounted, reactive, ref} from 'vue';
import VonageSession from 'components/vonage/VonageSession.vue'
import {api} from 'boot/axios'
import {useRoute} from 'vue-router'
import EventChatWidget from 'src/widgets/chat/EventChatWidget.vue'

interface IEvent {
  id: number
}

export default defineComponent({
  name: 'EventShowPage',
  components: {EventChatWidget, VonageSession},

  data() {
    return {
      opts: {},
      apiKey: 47282464,
      sessionId: '2_MX40NzI4MjQ2NH5-MTYyNjc4ODU5NDI4Nn5yN3hhQWJtdWJMeVRnamMwQWZqZzlJQnJ-fg',
      token: 'T1==cGFydG5lcl9pZD00NzI4MjQ2NCZzaWc9OTA5ODEzYmJjZDI4ZDA3MjNiMGJhYjZmN2IxMzZkOGM5YTI3YmM1YTpzZXNzaW9uX2lkPTJfTVg0ME56STRNalEyTkg1LU1UWXlOamM0T0RVNU5ESTRObjV5TjNoaFFXSnRkV0pNZVZSbmFtTXdRV1pxWnpsSlFuSi1mZyZjcmVhdGVfdGltZT0xNjI2Nzg4NTk0Jm5vbmNlPTAuNzY1ODU0MzE0MzIyOTk5NCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjI2ODc0OTk0JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9'
    }
  },

  setup() {
    const route = useRoute()
    const eventId = Number(route.params.eventId)
    const vonageSessionRef = ref<InstanceType<typeof VonageSession>>();

    const event = reactive({
      name: '',
      description: '',
      date: '',
      timeFrom: '',
      timeTo: '',
      accessType: 'paid',
      amount: null,
      eventLinks: []
    })

    const eventShowRequest = async (eventId: number) => {
      const response = await api.get<{event: IEvent}>(`/api/creator/events/${eventId}`)
      return response.data.event
    }

    const eventStartSessionRequest = async (eventId: number) => {
      const response = await api.post<{event: IEvent}>(`/api/creator/events/${eventId}/start-session`)
      return response.data.event
    }

    const eventStartBroadcastRequest = async (eventId: number) => {
      const response = await api.post<{event: IEvent}>(`/api/creator/events/${eventId}/start-broadcast`)
      return response.data.event
    }

    const eventStopBroadcastRequest = async (eventId: number) => {
      const response = await api.post<{event: IEvent}>(`/api/creator/events/${eventId}/stop-broadcast`)
      return response.data.event
    }

    const eventApi = {
      eventShowRequest,
    }

    const actions = {
      startSession: async () => {
        Object.assign(event, await eventStartSessionRequest(eventId))
      },
      startBroadcast: async () => {
        Object.assign(event, await eventStartBroadcastRequest(eventId))
      },
      stopBroadcast: async () => {
        Object.assign(event, await eventStopBroadcastRequest(eventId))
      },
      screenShare: () => {
        // eslint-disable-next-line
        vonageSessionRef.value?.screenShare()
      }
    }

    onMounted(async () => {
      Object.assign(event, await eventApi.eventShowRequest(eventId))
    })

    return {
      event,
      eventId,
      actions,
      vonageSessionRef,
    }
  },
});
</script>
