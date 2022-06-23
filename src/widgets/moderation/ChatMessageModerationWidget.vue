<template>

  <q-card class="column full-height" style="width: 300px" dark>
    <q-card-section>
      <div class="text-h6">Moderation</div>
    </q-card-section>

    <q-card-section class="col q-pt-none">
      <chat-message
        :chat-message="chatMessage"
      />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        label="Ban user"
        color="negative"
        unelevated
        @click="banUserByMessage(chatMessage)"
      />

      <q-btn
        label="Remove message"
        color="warning"
        unelevated
        @click="removeMessage(chatMessage)"
      />

      <q-btn flat label="OK" v-close-popup />
    </q-card-actions>
  </q-card>

</template>


<style lang="scss" scoped>

</style>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {IChatMessage} from 'src/modules/chat/chatModels'
import ChatMessage from 'components/chat/ChatMessage.vue'
import {httpApi} from 'src/services/httpApi'
import {useQuasar} from 'quasar'

export default defineComponent({
  components: {ChatMessage},
  props: {
    chatMessage: {
      type: Object as PropType<IChatMessage>,
    }
  },
  setup() {
    const $q = useQuasar();

    const banUserByMessage = async (message: IChatMessage) => {
      const response = await httpApi.post<{ok: boolean}>('moderator/chat/banUserByMessage', message);

      if (response.data.ok) {
        $q.notify({
          type: 'positive',
          message: 'Banned'
        });
      } else {
        $q.notify({
          type: 'warning',
          message: 'Banning failed'
        });
      }
    }

    const removeMessage = async (message: IChatMessage) => {
      const response = await httpApi.post<{ok: boolean}>('moderator/chat/removeMessage', message);

      if (response.data.ok) {
        $q.notify({
          type: 'positive',
          message: 'Message removed'
        });
      } else {
        $q.notify({
          type: 'warning',
          message: 'Message removed failed'
        });
      }
    }

    return {
      banUserByMessage,
      removeMessage,
    }
  },
});
</script>
