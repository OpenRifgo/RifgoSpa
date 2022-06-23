<template>
  <q-card flat class="q-pa-md referral-dialog">
    <q-card-section>
      <q-tab-panels v-model="promoDialogTab" animated>
        <q-tab-panel name="init">
          <p>
            Please, provide your email to have access to referral bonuses:
          </p>

          <q-input
            filled
            v-model="promoDialogEmail"
            label="Your Email"
            class="q-mb-md text-input"
            :rules="[value => helpers.validateEmail(value) || 'Please enter valid email']"
            @keyup.enter="onGetReferralLinkByEmailClick"
            lazy-rules
          />

          <rifgo-btn
            color="primary"
            class="full-width"
            label="Get link"
            @click="onGetReferralLinkByEmailClick"
          />
        </q-tab-panel>

        <q-tab-panel name="link">
          <p>
            Email succesfully sent to {{promoDialogEmail}}
          </p>

          <q-input
            filled
            disable
            class="q-mb-md text-input"
            :model-value="referralLink.url || ''"
          />

          <rifgo-btn
            color="primary"
            class="full-width"
            label="Copy link"
            @click="onReferralLinkCopyClick"
          />
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>


<script lang="ts">

import {defineComponent, ref} from 'vue';
import {
  createConsultantReferralLink,
  IConsultantReferralLink,
} from 'src/api/publicRequests';
import {validateEmail} from 'src/lib/helpers'
import {useClipboard} from '@vueuse/core'
import {Notify} from 'quasar'
import RifgoBtn from '../custom/RifgoBtn.vue'

export default defineComponent({
  components: {RifgoBtn},
  props: {
    consultantSlug: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const referralLink = ref<Partial<IConsultantReferralLink>>({});
    const $clipboard = useClipboard();

    const promoDialogEmail = ref('');
    const promoDialogTab = ref('init');

    const onGetReferralLinkByEmailClick = () => {
      void createConsultantReferralLink(props.consultantSlug, {email: promoDialogEmail.value})
        .then(data => referralLink.value = data);

      promoDialogTab.value = 'link';
    }

    const onReferralLinkCopyClick = () => {
      void $clipboard.copy(referralLink.value.url || '');
      Notify.create({
        type: 'positive',
        color: 'primary',
        message: 'Your referral link is copied'
      });
    }

    return {
      onGetReferralLinkByEmailClick,
      onReferralLinkCopyClick,

      promoDialogEmail,
      promoDialogTab,
      referralLink,

      helpers: {
        validateEmail
      },
    }
  }
});
</script>

<style lang="scss" scoped>
.referral-dialog {
  width: 342px;
  border-radius: 12px;
  padding: 24px;

  .q-card__section {
    padding: 0;

    .q-tab-panel {
      padding: 0;

      p.book-dialog-title {
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        margin-bottom: 12px;
      }

    }

    button {
      width: 100%;
      border-radius: 6px;
      padding: 11px;
      margin-top: 12px;

      span {
        color: #615DFF;
      }
    }
  }
}
</style>
