<template>

  <!-- deprecated -->

  <div
    class="eventChat full-height"
  >
    <div
      class="q-pa-md row"
    >
      <q-scroll-area
        ref="scrollAreaRef"
        class="col"
        :style="{height: chatHeight}"
      >
        <template v-for="(chatMessage, chatMessageIdx) in chatMessages" v-bind:key="chatMessageIdx">
          <q-chat-message
            :message-type="chatMessage.messageType"

            bg-color="transparent"
            text-color="white"
          >
            <template v-slot:name>
              <span :class="{'superuser-name': chatMessage.userType === 'streamer'}">
                {{ chatMessage.screenName }}
              </span>
            </template>
            <template v-slot:avatar>

              <img
                class="q-message-avatar"
                :class="{'superuser-outlined': chatMessage.userType === 'streamer'}"
                :src="`https://eu.ui-avatars.com/api/?name=${chatMessage.screenName}&background=random`"
              >
              <svg v-if="chatMessage.userType === 'streamer'"
                   class="superuser-mic-ico" width="18" height="18" viewBox="0 0 14 14" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <rect width="14" height="14" rx="7" fill="#FFD60A"/>
                <path
                  d="M6.89257 8.31579C7.76626 8.31579 8.47152 7.61053 8.47152 6.73684V3.57895C8.47152 2.70526 7.76626 2 6.89257 2C6.01889 2 5.31362 2.70526 5.31362 3.57895V6.73684C5.31362 7.61053 6.01889 8.31579 6.89257 8.31579ZM10.0031 6.73684C9.7452 6.73684 9.52941 6.92632 9.48731 7.18421C9.27152 8.42105 8.19257 9.36842 6.89257 9.36842C5.59257 9.36842 4.51362 8.42105 4.29783 7.18421C4.25573 6.92632 4.03994 6.73684 3.78204 6.73684C3.46099 6.73684 3.20836 7.02105 3.25573 7.33684C3.51362 8.91579 4.77678 10.1526 6.36626 10.3789V11.4737C6.36626 11.7632 6.6031 12 6.89257 12C7.18204 12 7.41889 11.7632 7.41889 11.4737V10.3789C9.00836 10.1526 10.2715 8.91579 10.5294 7.33684C10.582 7.02105 10.3242 6.73684 10.0031 6.73684Z"
                  fill="black"/>
              </svg>

            </template>
            <div style="display: flex; flex-direction: column; ">
              <q-badge v-if="chatMessage.messageText!==''" rounded class="no-bg"
                       style="white-space: initial; margin-bottom: 5px; padding-left: 0">
                <span class="message-text">{{ chatMessage.messageText }}</span>
              </q-badge>
              <q-badge rounded class="green-bg" v-if="chatMessage.messageType==='donation'">
                <q-icon style="margin-left: 6px;">
                  <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.5 2.45645H7.325C7.43911 2.22714 7.49893 1.97547 7.5 1.72027C7.50151 1.37836 7.39874 1.04382 7.20491 0.759729C7.01107 0.475635 6.73505 0.254985 6.41237 0.126182C6.08969 -0.00262191 5.73513 -0.033684 5.39431 0.0369936C5.05349 0.107671 4.74203 0.276854 4.5 0.522764C4.25797 0.276854 3.94651 0.107671 3.60569 0.0369936C3.26487 -0.033684 2.91031 -0.00262191 2.58763 0.126182C2.26495 0.254985 1.98893 0.475635 1.79509 0.759729C1.60126 1.04382 1.49849 1.37836 1.5 1.72027C1.50107 1.97547 1.56089 2.22714 1.675 2.45645H1.5C1.10218 2.45645 0.720644 2.61157 0.43934 2.88769C0.158035 3.16381 0 3.5383 0 3.92879V4.91036C0 5.04052 0.0526784 5.16535 0.146447 5.25739C0.240215 5.34943 0.367392 5.40114 0.5 5.40114H1V8.34583C1 8.73633 1.15804 9.11082 1.43934 9.38694C1.72064 9.66306 2.10218 9.81818 2.5 9.81818H6.5C6.89782 9.81818 7.27936 9.66306 7.56066 9.38694C7.84196 9.11082 8 8.73633 8 8.34583V5.40114H8.5C8.63261 5.40114 8.75979 5.34943 8.85355 5.25739C8.94732 5.16535 9 5.04052 9 4.91036V3.92879C9 3.5383 8.84196 3.16381 8.56066 2.88769C8.27936 2.61157 7.89782 2.45645 7.5 2.45645ZM4 8.83662H2.5C2.36739 8.83662 2.24021 8.78491 2.14645 8.69287C2.05268 8.60083 2 8.476 2 8.34583V5.40114H4V8.83662ZM4 4.41958H1V3.92879C1 3.79863 1.05268 3.6738 1.14645 3.58176C1.24021 3.48972 1.36739 3.43801 1.5 3.43801H4V4.41958ZM4 2.45645H3.25C3.10166 2.45645 2.95666 2.41327 2.83332 2.33238C2.70999 2.25149 2.61386 2.13651 2.55709 2.00199C2.50032 1.86748 2.48547 1.71946 2.51441 1.57665C2.54335 1.43385 2.61478 1.30268 2.71967 1.19972C2.82456 1.09676 2.9582 1.02665 3.10368 0.998245C3.24917 0.969839 3.39997 0.984418 3.53701 1.04014C3.67406 1.09586 3.79119 1.19021 3.8736 1.31128C3.95601 1.43234 4 1.57467 4 1.72027V2.45645ZM5 1.72027C5 1.57467 5.04399 1.43234 5.1264 1.31128C5.20881 1.19021 5.32594 1.09586 5.46299 1.04014C5.60003 0.984418 5.75083 0.969839 5.89632 0.998245C6.0418 1.02665 6.17544 1.09676 6.28033 1.19972C6.38522 1.30268 6.45665 1.43385 6.48559 1.57665C6.51453 1.71946 6.49968 1.86748 6.44291 2.00199C6.38614 2.13651 6.29001 2.25149 6.16668 2.33238C6.04334 2.41327 5.89834 2.45645 5.75 2.45645H5V1.72027ZM7 8.34583C7 8.476 6.94732 8.60083 6.85355 8.69287C6.75979 8.78491 6.63261 8.83662 6.5 8.83662H5V5.40114H7V8.34583ZM8 4.41958H5V3.43801H7.5C7.63261 3.43801 7.75979 3.48972 7.85355 3.58176C7.94732 3.6738 8 3.79863 8 3.92879V4.41958Z"
                      fill="white"/>
                  </svg>
                </q-icon>
                <span class="message-text">{{ chatMessage.donationAmount }}</span>
              </q-badge>
            </div>
          </q-chat-message>
        </template>
      </q-scroll-area>
    </div>
    <q-card-section
      class="row"
    >
      <div style="width: 3rem; margin-right: 0.5rem">
        <q-avatar
          style="width: 3rem; height: 3rem"
          @click="updateScreenName"
        >
          <q-img :src="`https://eu.ui-avatars.com/api/?name=${screenName}&background=random`"/>
        </q-avatar>
      </div>
      <div class="col">
        <q-form
          class="eventChat"
          @submit="sendMessage"
        >
          <q-input
            type="text"
            v-model="messageText"
            label="Add comment"
            class="full-width eventChat_messageInput"
            rounded outlined
            bg-color="grey-4"
          >
            <template v-slot:append>
              <q-btn
                round dense flat
                icon="send"
                color="grey-6"
                :disable="!messageText"
                @click="sendMessage"
              />
            </template>
          </q-input>
        </q-form>
      </div>
    </q-card-section>
  </div>
</template>

<style lang="scss">
.auth_tabs .q-tab__label {
  color: #1D1D1D;
}

.eventChat .q-message-avatar {
  width: 2.5rem !important;
  height: 2.5rem !important;
  min-width: 2.5rem !important;
}

.eventChat {
  .eventChat_messageInput {
    .q-field__control {
      background-color: rgba(244, 244, 244, 0.3) !important;
      color: #C7C4C4 !important;
      height: 3rem !important;
    }

    .q-field__native {
      color: #C7C4C4 !important;
    }

    .q-field__label {
      top: 14px !important;;
      color: #C7C4C4 !important;
    }
  }

  .q-message-name {
    color: #ffffff;
    padding-left: 0.5rem;

    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;

  }

  .q-message-container {
    align-items: flex-start !important;
  }

  .q-message-avatar {
    border-radius: 50%;
    //margin: 4px;
    //padding: 0.25rem;
    width: 40px;
    height: 40px;
    min-width: 40px;
  }

  .green-bg {
    width: 5rem;
    background-color: #34A951;
  }

  .no-bg {
    background-color: rgba(0, 0, 0, 0);
    padding: 0
  }

  .message-text {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 20px;
    //margin-left: 4px;
    margin-right: 15px;
    letter-spacing: -0.016em;
  }
}

img.superuser-outlined {
  border: 0.125rem #FFD60A solid;
  //outline: 0.125rem #FFD60A solid;
  padding: 0.125rem !important;
}

svg.superuser-mic-ico {
  position: absolute;
  border: 2px solid #000000;
  border-radius: 50%;
  margin-top: 25px;
  margin-left: 24px;
}

span.superuser-name {
  color: #FFD60A;

}
</style>

<script lang="ts">
import {computed, defineComponent, onMounted, ref} from 'vue';
import {websocketsInstance, websocketsEmitter} from 'src/uses/useSockets'
import {useRealtimeChat} from 'src/uses/useRealtimeChat'
import {useAuthInstance} from 'src/uses/useAuth'
import {QScrollArea, useQuasar} from 'quasar'
import {onUnmounted} from '@vue/runtime-core'
import {useRoute} from 'vue-router'
import {IChatMessageWebSocket, IChatMessage} from 'src/modules/chat/chatModels'
import {TEmptyObject} from 'src/lib/commonTypes'
import {getChatMessages} from 'src/api/chatRequests';
import {stateScreenName} from 'src/uses/useScreenName'
import {retryUntilWs} from 'src/lib/retry'

export default defineComponent({
  name: 'EventChatWidget',
  components: {},
  props: {
    eventId: {
      type: Number,
      default: null,
    },
    streamerId: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    onMounted(async () => {
      if (ws.socketInstance) retryUntilWs(eventSubscribe, 10, ws.socketInstance);
      websocketsEmitter.on<IChatMessageWebSocket>('chat:message', onChatMessage);
      websocketsEmitter.on<TEmptyObject>('ws:connected', onWsConnect);
      websocketsEmitter.on<IChatMessageWebSocket>('chat:donation', onChatDonation);

      await loadMessages();
    });

    onUnmounted(() => {
      websocketsEmitter.off<IChatMessageWebSocket>('chat:message', onChatMessage);
      websocketsEmitter.off<TEmptyObject>('ws:connected', onWsConnect);
      websocketsEmitter.off<IChatMessageWebSocket>('chat:donation', onChatDonation);
    });

    const $q = useQuasar();
    const ws = websocketsInstance;
    const route = useRoute();

    const authInstance = useAuthInstance;

    const messageText = ref('');
    // const screenNameId = Math.floor((Math.random()*1000));
    const screenName = stateScreenName()
    const eventId = computed(() => props.eventId);
    const streamerId = computed(() => props.streamerId);
    const realtimeChat = useRealtimeChat();

    const chatMessages = ref<Array<IChatMessage>>([]);

    const scrollAreaRef = ref<QScrollArea | null>(null);
    const regSecret = computed(() => String(route.params.regSecret));

    const scroll = () => {
      setTimeout(() => {
        console.log('scrollAreaRef.value?.getScrollPosition()', scrollAreaRef.value?.getScrollPosition())
        scrollAreaRef.value?.setScrollPercentage('vertical', 100);
      }, 100)
    }

    const loadMessages = async () => {
      const responseChatMessages: Array<IChatMessage> = await getChatMessages(eventId.value)

      chatMessages.value = [];

      responseChatMessages.forEach(chatMessage => {
        if (chatMessage.messageType === 'donation') {
          chatMessage.donationAmount = chatMessage.meta.donationAmount
        }
        if (chatMessage.userId && chatMessage.userId === streamerId.value) {
          chatMessage.userType = 'streamer'
        }
        chatMessages.value.push({
          ...chatMessage,
          isCurrentUser: Boolean(authInstance.me.value?.id && chatMessage.userId == authInstance.me.value?.id),
        })
      })

      scroll()
    }

    const sendMessage = () => {
      realtimeChat.sendMessage(messageText.value, {
        eventId: Number(eventId.value),
        secret: regSecret.value,
        screenName: screenName.value,
      })
      messageText.value = ''
    }

    const requestScreenName = () => {
      $q.dialog({
        title: 'What is your name?',
        message: 'Enter your name to add a comment',
        prompt: {
          model: '',
          type: 'text', // optional
          outlined: true,
          rounded: true,
        },
        cancel: true,
        persistent: true,
      }).onOk((data: string) => {
        screenName.value = data;
        sendMessage();
      });
    }

    const updateScreenName = () => {
      $q.dialog({
        title: 'What is your name?',
        message: 'Update your chat name',
        prompt: {
          model: screenName.value,
          type: 'text', // optional
          outlined: true,
          rounded: true,
        },
        cancel: true,
        persistent: true,
      }).onOk((data: string) => {
        screenName.value = data;
      });
    }

    const sendMessageAction = () => {
      if (!screenName.value) {
        requestScreenName();
        return
      }
      sendMessage();
    }

    // webhook handler
    const onChatMessage = (data?: IChatMessageWebSocket) => {
      if (!data) return;

      const chatMessage = data.data;

      if (chatMessage.userId && chatMessage.userId === streamerId.value) {
        chatMessage.userType = 'streamer'
      }

      console.log({chatMessage})
      chatMessages.value.push({
        ...chatMessage,
        isCurrentUser: Boolean(authInstance.me.value?.id && chatMessage.userId == authInstance.me.value?.id),
      });

      scroll();
    }

    // webhook handler
    const onChatDonation = (data?: IChatMessageWebSocket) => {
      if (!data) return;
      console.log({data})
      const chatDonate = data.data;
      chatDonate.messageType = 'donation'
      console.log({chatDonate})
      chatMessages.value.push({
        ...chatDonate,
        isCurrentUser: Boolean(authInstance.me.value?.id && chatDonate.userId == authInstance.me.value?.id),
      });

      scroll();
    }

    const eventSubscribe = () => {
      ws.socketInstance?.send(JSON.stringify({
        module: 'sub',
        event: 'subscribe:event',
        data: {
          secret: regSecret.value,
        },
      }));
    }

    // handle reconnect
    const onWsConnect = () => {
      eventSubscribe();
      void loadMessages();
    }

    const isMobile = Boolean($q.platform.is.mobile);

    return {
      isMobile,
      messageText,
      screenName,
      chatMessages,
      authInstance,
      scrollAreaRef,
      chatHeight: computed(() => {
        if ($q.screen.lt.sm) {
          return '30vh';
        } else if (isMobile) {
          return 'calc(100vh - 7rem)';
        } else {
          return 'calc(100vh - 9rem - 3rem)';
        }
      }),

      updateScreenName,
      sendMessage: sendMessageAction,
    }
  },
});
</script>
