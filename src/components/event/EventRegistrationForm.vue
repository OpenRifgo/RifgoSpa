<template>
  <div>
    <q-card>
      <q-card-section>
        <div
          class="q-pb-md text-h6"
        >
          Get the link to the live stream
        </div>

        <div
          class="q-pb-md"
        >
          <q-input
            filled
            placeholder="Enter your email"
            v-model="email"
          />
        </div>

        <div
          class="q-pb-md"
        >
          <q-btn
            class="q-py-sm q-px-xl full-width"
            style="background-color: #615DFF; color: #FFFFFF"
            no-caps
            :disable="isRegistrationBtnDisabled"
            @click="registrationClicked"
            :label="event.accessType === 'free' ? 'Send stream link' : `Attend for $${event.amount}`"
          />

        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {sendRegistrationEmail} from 'src/api/publicRequests';
import {validateEmail} from 'src/lib/helpers';

export default defineComponent({
  name: 'EventRegistrationForm',
  props: {
    eventUid: {
      type: String,
      default: ''
    },
    event: {
      type: Object,
    },
    withEmailSentDialog: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }){
    const eventUidProps = computed(() => props.eventUid )
    const registrationClicked = () => {
      // emailSentDialogOpened.value = true;
      if (props.withEmailSentDialog) emit('open-email-sent-dialog')
      else emit('open-next-event-sent-tab')
      void sendRegistrationEmail(eventUidProps.value, email.value);
      email.value = '';
    };
    const email = ref<string>('')
    return{
      email,
      registrationClicked,
      isRegistrationBtnDisabled: computed(() => !email.value || !validateEmail(email.value)),

    }
  }
})
</script>

<style scoped>

</style>
