<template>
  <q-page class="row items-center justify-between" style="flex-direction: column;">
    <div class="full-width">
      <q-img
        src="~assets/logo/Rifgo-Logo-Black.svg"
        style="width: 100px"
        class="q-mt-md q-mx-lg"
      />
      <q-separator class="q-mx-lg q-my-md"/>
    </div>

    <div class="full-width">

      <div class="row full-width q-pa-md items-center justify-evenly">
        <div
          v-if="event"
          class="col-md-6 col-sm-8 col-12"
        >

          <div
            v-if="event.speakerName"
            style="margin-left: -12px"
          >
            <speaker-component
              :speaker="{ name: event.speakerName, title: event.speakerTitle, avatarUrl: event.speakerAvatarUrl }"
            />
          </div>

          <date-time-component :event="event"/>


          <div class="text-h4 q-pb-md">
            {{ event.name }}
          </div>

          <event-registration-form
            :event-uid="eventUid"
            :event="event"
            :with-email-sent-dialog="true"
            @open-email-sent-dialog="emailSentDialogOpened=true"/>

          <div class="row q-pb-md q-pt-md">
            <div class="col">

              <div
                class="q-pb-md text-h6"
              >Description
              </div>

              <div v-html="event.description"/>

            </div>
          </div>

        </div>
      </div>

    </div>

    <div class="full-width" style="color: #8B8B8B">
      <q-separator class="q-mx-md"/>

      <div class="row q-ma-md">
        <div class="col-9">
          <span class="q-pr-md">Terms & Conditions</span>
          <span class="q-pr-md">Privacy Policy</span>
        </div>

        <div class="col-3 text-right">
          &copy; RIFGO 2022
        </div>
      </div>
    </div>

    <q-dialog v-model="emailSentDialogOpened">
      <q-card
        style="min-width: 272px"
      >
        <q-card-section
          class="text-center text-green q-pa-none"
        >
          <div class="modal-icon-check">
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M20.7202 1.05206C20.0641 0.395977 19.0004 0.395978 18.3443 1.05206L7.89188 11.5045L3.54885 7.16147C2.89277 6.50539 1.82905 6.50539 1.17297 7.16147C0.516888 7.81755 0.516888 8.88127 1.17297 9.53735L6.60355 14.9679C6.95716 15.3215 7.42917 15.4846 7.89196 15.457C8.35471 15.4845 8.82666 15.3215 9.18023 14.9679L20.7202 3.42794C21.3763 2.77186 21.3763 1.70814 20.7202 1.05206Z"
                    fill="#615DFF"/>
            </svg>
          </div>
        </q-card-section>

        <q-card-section
          style="max-height: 50vh"
          class="text-bold text-center"
        >

          <p>We have sent a stream link <br/> to your email</p>
          <q-btn class="full-width whatsapp-btn" no-caps type="a" target="_blank"
                 style=""
                 :href="whatsappURI"
                 unelevated
          >
            <q-icon name="whatsapp"/>
            <p style="margin: 0 0 0 10px">Share via Whatsapp</p>
          </q-btn>
          <q-btn
            class="full-width"
            style="background-color: #F2F2F2; color: #333333; border: 0.5px solid #CCCCCC"
            label="OK"
            @click="emailSentDialogOkClick"
            unelevated
          />
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<style>
.auth_tabs .q-tab__label {
  color: #1D1D1D;
}

.modal-icon-check {
  background: #F9F9F9;
  border: 1px solid #E7E7E7;
  border-radius: 50px;
  width: 48px;
  height: 48px;
  display: flex;
  margin: 32px auto 0;
  align-content: center;
  padding: 16px 13px
}

.whatsapp-btn {
  background-color: #25D366;
  color: #FFFFFF;
  margin: 8px auto
}

.whatsapp-btn:hover {

  background: #15AB4D;
}

</style>

<script lang="ts">
import {computed, defineComponent, onMounted, ref} from 'vue';
import {useGlobalLocale} from 'src/uses/useGlobalLocale'
import {websocketsInstance} from 'src/uses/useSockets'
import {IEvent} from 'src/models/EventModels'
import {useRoute} from 'vue-router'
import SpeakerComponent from 'components/event/SpeakerComponent.vue'
import {getEventRequest} from 'src/api/publicRequests';
import EventRegistrationForm from 'components/event/EventRegistrationForm.vue';
import DateTimeComponent from 'components/DateTimeComponent.vue';
import {env} from 'src/services/Env';

export default defineComponent({
  name: 'PublicEventPage',
  components: {DateTimeComponent, EventRegistrationForm, SpeakerComponent},
  setup() {
    onMounted(
      () => {
        const whatsappURITextParameter = (`I invite you to watch an interesting stream ${env.appAddress}`)
        whatsappURI.value = encodeURI(`https://wa.me/?text=${whatsappURITextParameter}`) + '%2F%23' + useRoute().fullPath
      }
    )
    const ws = websocketsInstance;

    const eventUid = computed(() => String(useRoute().params.eventUid))
    const event = ref<IEvent>()


    const getEvent = async () => {
      event.value = await getEventRequest(eventUid.value)
    }

    onMounted(getEvent)

    const emailSentDialogOpened = ref(false)

    const whatsappURI = ref('')

    return {
      ...useGlobalLocale(),
      event,
      eventUid,
      websocketsInstance: ws,
      emailSentDialogOpened: emailSentDialogOpened,
      emailSentDialogOkClick: () => emailSentDialogOpened.value = false,
      whatsappURI
    };
  },
});
</script>
