<template>
  <event-template-component
    v-if="event"
    :is-chat-shown="isChatShown"
  >
    <template v-slot:name>
      {{ event.name }}
    </template>

    <template v-slot:video>
      <div
        v-if='event.streamingSessionId && event.streamingToken && vonageApiKey'
        class="full-width full-height"
      >
        <vonage-session
          :api-key='vonageApiKey'
          :session-id='event.streamingSessionId'
          :token='event.streamingToken'
          ref="vonageSessionRef"
        />
      </div>
    </template>

    <template v-slot:menu-left>
      <div class="inline-block text-red">
        <event-counter-widget
          v-if="event && event.id"
          :event-id="event.id"
        />
      </div>
      <div class="inline-block text-red">
        <div class="text-white" style="font-size: 30px; padding: 0 8px">|</div>
      </div>
      <div class="inline-block text-red">
        <div class="text-white"
             style="font-weight: 500; font-size: 16px; line-height: 16px;">
          $ {{ eventAmountsDonated }}
          <q-tooltip>Donated</q-tooltip>
        </div>
      </div>
    </template>

    <template v-slot:menu-center>

      <q-btn v-if="clipboard.isSupported"
             flat dense round size="lg"
             class="q-my-md q-mx-sm bg-grey-9"
             icon="share"
             @click="actions.onShare"
      >
        <q-tooltip>Get link</q-tooltip>
      </q-btn>

      <q-btn v-if='streamState === "NoVideo"'
             flat dense round size="lg"
             class="q-my-md q-mx-sm bg-grey-9"
             icon="fas fa-video"
             @click='actions.startSession'
      >
        <q-tooltip>Start Video</q-tooltip>
      </q-btn>

      <q-btn v-if='streamState === "NoBroadcast"'
             flat dense round size="lg"
             class="q-my-md q-mx-sm bg-grey-9"
             icon="fas fa-video"
             :loading="eventStartBroadcastRequestProcessing"
             @click='actions.startBroadcast'
      >
        <q-tooltip>Start Broadcast</q-tooltip>
      </q-btn>

      <q-btn v-if='streamState === "Broadcast"'
             flat dense round size="lg"
             class="q-my-md q-mx-sm bg-grey-9"
             icon="fas fa-video-slash"
             :loading="eventStopBroadcastRequestProcessing"
             @click='actions.stopBroadcast'
      >
        <q-tooltip>Finish Broadcast</q-tooltip>
      </q-btn>

      <q-btn flat dense round size="lg"
             class="q-my-md q-mx-sm bg-grey-9"
             :class="{streamingPage_btn_isActive: isChatShown}"
             icon="chat_bubble"
             @click="isChatShown = !isChatShown"
      >
        <q-tooltip>Chat</q-tooltip>
      </q-btn>

      <q-btn v-if='streamState !== "NoVideo" && !isScreenShared'
             flat dense round size="lg"
             class="q-my-md q-mx-sm bg-grey-9"
             icon="screen_share"
             @click="actions.screenShare"
      >
        <q-tooltip>Share screen</q-tooltip>
      </q-btn>

      <q-btn v-else-if='streamState !== "NoVideo" && isScreenShared'
             flat dense round size="lg"
             class="q-my-md q-mx-sm bg-grey-9"
             icon="stop_screen_share"
             @click="actions.stopScreenSharing()"
      >
        <q-tooltip>Stop screen sharing</q-tooltip>
      </q-btn>
    </template>

    <template v-slot:chat>
      <event-chat-widget
        v-if="event && event.id"
        :event-id="event.id"
        :streamer-id="event.userId"
        class="full-height"
      />
    </template>

    <template v-slot:chat-messages>
      <event-chat-messages-widget
        v-if="event && event.id"
        :event-id="event.id"
        :streamer-id="event.userId"
      />
    </template>

    <template v-slot:chat-send>
      <event-chat-send-widget
        v-if="event && event.id"
        :event-id="event.id"
      />
    </template>

  </event-template-component>

  <q-dialog ref="dialogRef" @hide="onDialogHide">

    <q-card class="q-dialog-plugin finish-modal">
      <q-card-section>
        <h2>
          What type of stream are you finishing?
        </h2>
        <q-radio v-model="finishedOption" val="test"
                 label="I did a test stream, and now I am ready to stream to my audience" />
        <q-radio v-model="finishedOption" val="livestream"
                 label="I just finished a livestream with my audience and said goodbye" />
      </q-card-section>
      <q-card-actions align="between">
        <q-btn no-caps label="Cancel" @click="onCancelClick"
               style="margin-left: 16px; color: #4D4D4D" flat
        />
        <q-btn color="primary" no-caps @click="onOKClick"
               style="margin-right: 16px; padding: 12px 24px; border-radius: 6px; margin-bottom: 16px"
               :disabled="isEnabledFinishButton"
        >

          <span style="margin-left: 7px;">Confirm</span>
        </q-btn>
      </q-card-actions>
    </q-card>

  </q-dialog>

</template>

<style lang="scss">
.auth_tabs .q-tab__label {
  color: #1D1D1D;
}

.eventShow_chatWrap {
  height: calc(100vh - 10px);

  /* mobile viewport bug fix */
  /*height: -webkit-fill-available;*/
}

.finish-modal {
  max-width: 320px;
  width: 320px;

  .q-card__section {
    padding: 24px;

  }

  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    /* or 133% */
    color: #333333;

    margin-bottom: 32px;
  }
}
</style>

<script lang='ts'>
import {computed, defineComponent, onMounted, provide, reactive, ref} from 'vue';
import VonageSession from 'components/vonage/VonageSession.vue'
import {api} from 'boot/axios'
import {useRoute} from 'vue-router'
import EventChatWidget from 'src/widgets/chat/EventChatWidget.vue'
import {websocketsEmitter, websocketsInstance} from 'src/uses/useSockets'
import EventTemplateComponent from 'components/event/EventTemplateComponent.vue'
import EventCounterWidget from 'src/widgets/counter/EventCounterWidget.vue'
import {TEmptyObject} from 'src/lib/commonTypes'
import {onUnmounted} from '@vue/runtime-core'
import {useClipboard} from '@vueuse/core'
import {Notify, useDialogPluginComponent} from 'quasar'
import {env} from 'src/services/Env'
import {IChatMessageWebSocket} from 'src/modules/chat/chatModels'
import {retryUntilWs} from 'src/lib/retry'
import EventChatMessagesWidget from 'src/widgets/chat/EventChatMessagesWidget.vue'
import EventChatSendWidget from 'src/widgets/chat/EventChatSendWidget.vue'
import {ComputedRef} from '@vue/reactivity'


interface IEvent {
  id: number
}

export default defineComponent({
  name: 'EventShowPage',
  components: {
    EventChatSendWidget,
    EventChatMessagesWidget, EventCounterWidget, EventTemplateComponent, EventChatWidget, VonageSession,
  },
  emits: [
    // REQUIRED
    'ok', 'hide',
  ],
  setup(props, {emit}) {
    onMounted(async () => {
      eventSubscribeWithRetry(10);
      websocketsEmitter.on<TEmptyObject>('ws:connected', onWsConnect);
      websocketsEmitter.on<IChatMessageWebSocket>('chat:donation', onChatDonation);

      await Promise.all([
        getVideoConfigRequest().then(result => vonageApiKey.value = result.apiKey),
        loadEvent(),
      ]);
    });

    onUnmounted(() => {
      websocketsEmitter.off<TEmptyObject>('ws:connected', onWsConnect);
      websocketsEmitter.off<IChatMessageWebSocket>('chat:donation', onChatDonation);
    });

    const ws = websocketsInstance;
    const clipboard = useClipboard();
    const route = useRoute();

    const eventId = computed(() => Number(route.params.eventId));

    const vonageSessionRef = ref<InstanceType<typeof VonageSession>>();
    const isChatShown = ref(true);
    const event = reactive({
      id: null,
      name: '',
      description: '',
      date: '',
      timeFrom: '',
      timeTo: '',
      accessType: 'paid',
      eventLinks: [],
      streamingSessionId: null,
      streamingToken: null,
      streamingBroadcastId: null,
      amounts: {tickets: null, donated: null},
      userId: null,
    });

    const eventAmountsDonated = computed(() => Number(event.amounts?.donated) + Number(event.amounts?.tickets));
    provide('event', event);

    const eventShowRequest = async (eventId: number) => {
      const response = await api.get<{ event: IEvent }>(`/api/creator/events/${eventId}`)
      return response.data.event
    }

    const eventStartSessionRequest = async (eventId: number) => {
      const response = await api.post<{ event: IEvent }>(`/api/creator/events/${eventId}/start-session`)
      return response.data.event
    }

    const eventStartBroadcastRequestProcessing = ref(false);
    const eventStartBroadcastRequest = async (eventId: number) => {
      try {
        eventStartBroadcastRequestProcessing.value = true;
        const response = await api.post<{ event: IEvent }>(`/api/creator/events/${eventId}/start-broadcast`);
        eventStartBroadcastRequestProcessing.value = false;

        return response.data.event
      } catch (e) {
        console.log(e);

        await actions.startSession();

        setTimeout(() => {
          void eventStartBroadcastRequest(eventId);
        }, 1000);
      }
    }

    const eventStopBroadcastRequestProcessing = ref(false);
    const eventStopBroadcastRequest = async (eventId: number, isFinallyStoped: boolean) => {
      try {

       eventStopBroadcastRequestProcessing.value = true;
        const response = await api.post<{ event: IEvent }>(
          `/api/creator/events/${eventId}/stop-broadcast`,
          {isFinallyStoped: isFinallyStoped}
        );
        eventStopBroadcastRequestProcessing.value = false;

        return response.data.event
      } catch (e) {
        console.log(e);

        setTimeout(() => {
          void eventStopBroadcastRequest(eventId, isFinallyStoped);
        }, 1000);
      }
    }

    const vonageApiKey = ref<number | null>(null);
    const getVideoConfigRequest = async () => {
      const response = await api.get<{ config: { apiKey: number } }>('/api/video/config');
      return response.data.config;
    }

    const loadEvent = async () => {
      const result = await eventShowRequest(eventId.value);
      Object.assign(event, result);

      if (streamState.value == 'NoVideo') {
        await actions.startSession();
      }
    }

    const streamState = computed(() => {
      if (!event.streamingSessionId) {
        return 'NoVideo'
      } else if (!event.streamingBroadcastId) {
        return 'NoBroadcast'
      } else {
        return 'Broadcast'
      }
    });

    const actions = {
      startSession: async () => {
        Object.assign(event, await eventStartSessionRequest(eventId.value))
      },
      startBroadcast: async () => {
        try {
          Object.assign(event, await eventStartBroadcastRequest(eventId.value));

          ws.socketInstance?.send(JSON.stringify({
            module: 'event',
            event: 'broadcast:started',
            data: {
              eventId: eventId.value,
            },
          }));
        } catch (e) {
          await actions.startSession();
        }
      },
      stopBroadcast: () => {
        show()
      },
      screenShare: () => {
        // eslint-disable-next-line
        vonageSessionRef.value?.screenShare()
      },
      stopScreenSharing: () => {
        // eslint-disable-next-line
        vonageSessionRef.value?.stopScreenSharing()
      },
      onShare: async () => {
        // copy first link (workaround before we have interface)
        const eventLink = event.eventLinks[0] as { uid: string };
        const eventLinkUid = String(eventLink?.uid);

        if (eventLinkUid) {
          await clipboard.copy(`${env.appAddress}/#/event/${eventLinkUid}`);

          Notify.create({
            type: 'positive',
            message: 'Share link is copied to the clipboard',
            icon: 'share',
            badgePosition: 'bottom-left',
            position: 'top',
            // closeBtn: true,
          })
        }
      },
    }

    // eslint-disable-next-line
    const isScreenShared: ComputedRef<Boolean> = computed(() => vonageSessionRef.value ? vonageSessionRef.value.isScreenShared : false);

    const eventSubscribe = () => {
      ws.socketInstance?.send(JSON.stringify({
        module: 'sub',
        event: 'subscribe:event',
        data: {
          eventId: eventId.value,
        },
      }));
    }

    const eventSubscribeWithRetry = (timeout: number) => {
      if (ws.socketInstance) retryUntilWs(eventSubscribe, timeout, ws.socketInstance);
    }

    // webhook handler
    const onChatDonation = (/* data?: IChatDonateEvent */) => {
      void loadEvent();
    }

    // handle reconnect
    const onWsConnect = () => {
      eventSubscribe();
    }

    const isFinalModalShown = ref(false);
    const {dialogRef, onDialogHide, onDialogOK, onDialogCancel} = useDialogPluginComponent()
    // following method is REQUIRED
    // (don't change its name --> "show")
    const show = () => {
      if (dialogRef.value) dialogRef.value.show()
    };

    // following method is REQUIRED
    // (don't change its name --> "hide")
    const hide = () => {
      if (dialogRef.value) {



        dialogRef.value.hide()
        isFinalModalShown.value = false
      }
    };

    const onOKClick = async () => {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      Object.assign(event, await eventStopBroadcastRequest(eventId.value, finishedOption.value === 'livestream'));

      ws.socketInstance?.send(JSON.stringify({
        module: 'event',
        event: 'broadcast:finished',
        data: {
          eventId: eventId.value,
        },
      }));

      emit('ok')
      // or with payload: this.$emit('ok', { ... })
      // then hiding dialog
      hide()
    };

    const onCancelClick = () => {
      // we just need to hide the dialog
      hide()
    }

    const finishedOption = ref('')
    const isEnabledFinishButton = computed(() => !['test', 'livestream'].includes(finishedOption.value))

    return {
      event,
      eventId,
      actions,
      vonageSessionRef,
      isChatShown,
      clipboard,
      streamState,
      vonageApiKey,
      eventAmountsDonated,
      eventStartBroadcastRequestProcessing,
      eventStopBroadcastRequestProcessing,
      isScreenShared,

      dialogRef,
      show,
      hide,
      onDialogHide,
      onDialogOK,
      onDialogCancel,
      onOKClick,
      onCancelClick,
      finishedOption,
      isEnabledFinishButton
    }
  },
});
</script>
