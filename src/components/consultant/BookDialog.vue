<template>
  <q-card flat class="q-pa-md referral-dialog book-dialog">
    <q-card-section >
    <q-tab-panels v-model="dialogTab" animated>
      <q-tab-panel name="init">
        <p class="book-dialog-title">
          We will send the link to book the session to your email
        </p>

        <q-input
          filled
          v-model="dialogEmail"
          label="Your Email"
          class="email-field"
          :rules="[value => helpers.validateEmail(value) || 'Please enter valid email']"
          @keyup.enter="onBookByEmailClick"
          lazy-rules
        />

        <rifgo-btn
          color="primary"
          class="full-width"
          :label="formatBookButton(offer)"
          @click="onBookByEmailClick"
        />
      </q-tab-panel>

      <q-tab-panel name="pay">
        <stripe-pay-consultant-offer
          :amount="booking.price"
          title="booking"
          :payment-for="paymentFor"
          :payment-for-id="paymentForId"
          :email="dialogEmail"
        />
      </q-tab-panel>
    </q-tab-panels>
  </q-card-section>
  </q-card>
</template>


<script lang="ts">

import {computed, defineComponent, PropType, ref} from 'vue';
import {
  createConsultantBooking, IConsultantBooking,
} from 'src/api/publicRequests';
import {validateEmail} from 'src/lib/helpers'
import RifgoBtn from '../custom/RifgoBtn.vue'
import StripePayConsultantOffer from 'components/stripe/StripePayConsultantOffer.vue'
import {IConsultantOffer} from 'src/models/ConsultantInterfaces'
import {useRouter} from 'vue-router'
import {useReferralTracking} from 'src/uses/useReferralTracking'

export default defineComponent({
  components: {StripePayConsultantOffer, RifgoBtn},
  props: {
    consultantSlug: {
      type: String,
      required: true,
    },
    offer: {
      type: Object as PropType<IConsultantOffer>
    }
  },
  setup(props) {
    const $router = useRouter();
    const $referralTracking = useReferralTracking();

    const booking = ref<IConsultantBooking | null>(null);

    const dialogEmail = ref('');
    const dialogTab = ref('init');
    const paymentFor = 'ConsultantOffer';
    const paymentForId = computed(() => booking.value?.uid);

    const onBookByEmailClick = async () => {
      const offerId = props.offer?.id;
      if (!offerId) return console.error('OfferId is missing');

      // app.eventNotifyService.notify('consultant:bookByEmail:click', {
      //   slug: slug.value,
      //   offerId: currentOffer.value.id,
      //   offerTitle: currentOffer.value.title,
      //   offerPrice: currentOffer.value.price,
      // });

      const referralUid = $referralTracking.getReferral(props.consultantSlug)?.uid;
      booking.value = await createConsultantBooking(props.consultantSlug, offerId,{
        email: dialogEmail.value,
        referralUid,
      });

      if (booking.value.price > 0) {
        dialogTab.value = 'pay';
      } else {

        await $router.push({
          name: 'consultant-page',
          params: {slug: props.consultantSlug},
          query: {paymentForId: paymentForId.value, paymentFor, email: dialogEmail.value}
        });
      }
    }

    return {
      onBookByEmailClick,

      dialogEmail,
      dialogTab,
      booking,
      paymentFor,
      paymentForId,

      formatBookButton: (offer: IConsultantOffer) =>
        offer.price > 0 ? `Book for $${offer.price}` : 'Book for free',

      helpers: {
        validateEmail
      },
    }
  }
});
</script>

<style lang="scss" scoped>
.referral-dialog {
  .text-input {
    //min-width: min(400px, calc(100vw - 140px))
  }

}

.book-dialog.referral-dialog {
  min-width: min(342px, calc(100vw - 140px));

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

      .email-field {
        //background: #F2F2F2;
        //border: 0.5px solid #E5E5E5;
        //border-radius: 8px;

        input {
          //height: 48px;
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
}
</style>
