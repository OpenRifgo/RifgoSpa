<template>
  <q-page class="q-pa-lg bg-grey-1">
    <q-card flat bordered class="q-mb-md">
      <!--      <q-card-section horizontal>-->
      <q-card-section>
        <q-input
          label="template"
          v-model="templateName"
          filled
          class="q-pb-md"
        />

        <q-input
          label="subject"
          v-model="subject"
          filled
          class="q-pb-md"
        />

        <q-input
          label="email"
          v-model="email"
          filled
          class="q-pb-md"
          type="email"
        />

      </q-card-section>

      <q-separator/>

      <q-card-section class="row">
        <div class="col text-right">
          <q-btn
            label="Send email"
            @click="sendEmail"
            color="primary"
            :loading="isSendEmailProcessing"
            :disable="isSendEmailProcessing || !templateName || !subject || !email"
          />
        </div>
      </q-card-section>

      <q-separator/>

    </q-card>

  </q-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {api} from 'boot/axios';
import {Notify} from 'quasar';
import {AxiosError} from 'axios';
import {normErrorMessage} from 'src/lib/helpers';

export default defineComponent({
  setup() {
    const templateName = ref('');
    const subject = ref('');
    const email = ref('');
    const isSendEmailProcessing = ref(false);

    const sendEmail = async () => {
      isSendEmailProcessing.value = true;

      await api.post<{
        ok: boolean
      }>('/api/admin/send-email/send-to', {
        templateName: templateName.value,
        email: email.value,
        subject: subject.value,
      }).then((result) => {
        isSendEmailProcessing.value = false;

        if (result.data.ok) {
          Notify.create({
            message: 'Email is sent',
            type: 'positive',
          });
        }
      }).catch((err: AxiosError) => {
        isSendEmailProcessing.value = false;

        Notify.create({
          message: normErrorMessage(err),
          type: 'negative',
        });
      });
    };

    return {
      templateName,
      subject,
      email,
      isSendEmailProcessing,

      sendEmail,
    }
  },
})

</script>
