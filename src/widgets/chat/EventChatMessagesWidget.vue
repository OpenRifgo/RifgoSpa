<template>

  <div
    class="eventChat full-height"
  >
    <div
      class="q-pa-md row"
    >
      <div
        class="col chatMessages"
      >
        <div v-if="messagesLoading"
             class="text-center">
          <q-spinner
            color="primary"
            size="3em"
          />
        </div>

        <template
          v-for="(chatMessage, chatMessageIdx) in chatMessages" v-bind:key="chatMessageIdx"
        >
          <chat-message
            :chat-message="chatMessage"
            @avatar-clicked="onAvatarClicked(chatMessage)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth_tabs .q-tab__label {
  color: #1D1D1D;
}

.eventChat {
  .q-message-name {
    color: #ffffff;
    padding-left: 0.5rem;
    font-size: 1rem !important;
  }

  .q-message-container {
    align-items: flex-start !important;
  }

  .q-message-avatar {
    width: 2rem;
    height: 2rem;
    min-width: 2rem;
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
    margin-left: 4px;
    margin-right: 15px;
    letter-spacing: -0.016em;
  }
}
</style>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, nextTick} from 'vue';
import {websocketsInstance, websocketsEmitter} from 'src/uses/useSockets'
import {useAuthInstance} from 'src/uses/useAuth'
import {onUnmounted} from '@vue/runtime-core'
import {useRoute} from 'vue-router'
import {IChatMessageWebSocket, IChatMessage, IChatErrorMessage, IChatMessageRemoved} from 'src/modules/chat/chatModels'
import {TEmptyObject} from 'src/lib/commonTypes'
import {getChatMessages} from 'src/api/chatRequests';
import {stateScreenName} from 'src/uses/useScreenName'
import {retryUntilWs} from 'src/lib/retry'
import ChatMessage from 'components/chat/ChatMessage.vue'
import {useQuasar} from 'quasar'

export default defineComponent({
  components: {ChatMessage},
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
  emits: ['avatarClicked'],
  setup(props, { emit }) {
    onMounted(async () => {
      if (ws.socketInstance) retryUntilWs(eventSubscribe, 10, ws.socketInstance);
      websocketsEmitter.on<IChatMessageWebSocket>('chat:message', onChatMessage);
      websocketsEmitter.on<TEmptyObject>('ws:connected', onWsConnect);
      websocketsEmitter.on<IChatMessageWebSocket>('chat:donation', onChatDonation);
      websocketsEmitter.on<IChatErrorMessage>('chat:error', onChatError);
      websocketsEmitter.on<IChatMessageRemoved>('chat:messageRemoved', onChatMessageRemoved);

      await loadMessages();
    });

    onUnmounted(() => {
      websocketsEmitter.off<IChatMessageWebSocket>('chat:message', onChatMessage);
      websocketsEmitter.off<TEmptyObject>('ws:connected', onWsConnect);
      websocketsEmitter.off<IChatMessageWebSocket>('chat:donation', onChatDonation);
      websocketsEmitter.off<IChatErrorMessage>('chat:error', onChatError);
      websocketsEmitter.off<IChatMessageRemoved>('chat:messageRemoved', onChatMessageRemoved);
    });

    const ws = websocketsInstance;
    const route = useRoute();
    const $q = useQuasar();

    const authInstance = useAuthInstance;
    const screenName = stateScreenName();

    const chatMessages = ref<Record<number, IChatMessage>>({});
    const messagesLoading = ref(true);

    const eventId = computed(() => props.eventId);
    const regSecret = computed(() => String(route.params.regSecret));
    const streamerId = computed(() => props.streamerId);

    // scroll document body to bottom
    const scroll = () => {
      void nextTick(() => {
        window.scrollTo(0, document.body.clientHeight);
      });
    }

    const loadMessages = async () => {
      messagesLoading.value = true;

      const responseChatMessages: Array<IChatMessage> = await getChatMessages(eventId.value)

      chatMessages.value = {};

      responseChatMessages.forEach(chatMessage => {
        if (chatMessage.messageType === 'donation') {
          chatMessage.donationAmount = chatMessage.meta.donationAmount
        }
        if (chatMessage.userId && chatMessage.userId === streamerId.value) {
          chatMessage.userType = 'streamer'
        }

        chatMessages.value[chatMessage.id] = {
          ...chatMessage,
          isCurrentUser: Boolean(authInstance.me.value?.id && chatMessage.userId == authInstance.me.value?.id),
        }
      })

      scroll();

      messagesLoading.value = false;
    }

    // webhook handler
    const onChatMessage = (data?: IChatMessageWebSocket) => {
      if (!data) return;

      const chatMessage = data.data;

      console.log({chatMessage})

      if (chatMessage.userId && chatMessage.userId === streamerId.value) {
        chatMessage.userType = 'streamer'
      }


      chatMessages.value[chatMessage.id] = {
        ...chatMessage,
        isCurrentUser: Boolean(authInstance.me.value?.id && chatMessage.userId == authInstance.me.value?.id),
      }

      scroll();
    }

    // webhook handler
    const onChatDonation = (data?: IChatMessageWebSocket) => {
      if (!data) return;
      console.log({data})
      const chatDonate = data.data;
      chatDonate.messageType = 'donation';

      chatMessages.value[chatDonate.id] = {
        ...chatDonate,
        isCurrentUser: Boolean(authInstance.me.value?.id && chatDonate.userId == authInstance.me.value?.id),
      }

      scroll();
    }

    const onChatMessageRemoved = (data?: IChatMessageRemoved) => {
      const messageId = data?.data.chatMessage.id;

      if (messageId) {
        delete chatMessages.value[messageId];
      }
    }

    const onChatError = (data?: IChatErrorMessage) => {
      $q.notify({
        type: 'negative',
        message: data?.data.message || 'Error'
      });
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

    const onAvatarClicked = (chatMessage: IChatMessage) => {
      emit('avatarClicked', chatMessage);
    }

    return {
      screenName,
      chatMessages,
      authInstance,
      messagesLoading,
      onAvatarClicked,
    }
  },
});
</script>
