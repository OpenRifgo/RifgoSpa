<template>

  <q-card-section
    class="row"
    style="padding: 0"
  >
    <div style="width: 3rem; margin-right: 0.5rem">
      <q-avatar
        style="width: 2.5rem; height: 2.5rem; padding-top: 0.25rem; display: flex"
        @click="updateScreenName"
      >
        <q-img :src="`https://eu.ui-avatars.com/api/?name=${screenName}&background=random`"/>
      </q-avatar>
    </div>
    <div class="col mobile-chat" style="padding-top: 0.25rem">
      <q-form
        class="eventChat"
        @submit="sendMessage"
      >
        <q-input
          type="text"
          v-model="messageText"
          class="full-width eventChat_messageInput"
          rounded outlined
          bg-color="grey-4"
          label-slot
        >
          <template v-slot:label>
<!--            <div>Add comment</div>-->
          </template>
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

</template>

<style lang="scss">
.auth_tabs .q-tab__label {
  color: #1D1D1D;
}

.mobile-chat .eventChat .q-field__control {
  height: 2.5rem !important;
  padding-bottom: 1px;
}

.mobile-chat .eventChat .q-field__control input {
  padding: 5px 4px 10px 0 !important;
}

.mobile-chat .eventChat .q-field__control .q-field__label {
  top: 11px !important;
}
.mobile-chat .q-field__marginal {
  margin-top: 3px;
  height: auto !important;
}

.mobile-chat {
  .eventChat_messageInput {
    .q-field__control {
      background-color: rgba(244, 244, 244, 0.3) !important;
      color: #C7C4C4 !important;

    }

    .q-field__native {
      color: #C7C4C4 !important;
    }

    .q-field__label {
      top: 14px !important;;
      color: #C7C4C4 !important;
    }
  }
}

//.mobile-chat .eventChat  .eventChat_messageInput  .q-field__control {
//.mobile-chat .q-field__control {
//  height: 2.5rem !important;
//}
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
  components: {},
  props: {
    eventId: {
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
