<template>
  <div
    class="stripe-pay full-width full-height"
  >
    <div class="stripe-pay__widget">
      <div ref="paymentElementRef"/>
      <div class="stripe-pay__btns">
        <q-btn
          class="q-mt-md justify-sm-end stripe-pay__pay-btn"
          color="primary"
          unelevated
          :label="`Pay $${props.amount}`"
          no-caps
          @click="confirm"
        />
        <div ref="paymentRequestBtnRef" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted,
  ref
} from 'vue'
import {StripePaymentElement} from '@stripe/stripe-js'
import {PaymentRequest} from '@stripe/stripe-js/types/stripe-js/payment-request'
import {env} from 'src/services/Env'
import {createPaymentFor} from 'src/api/publicRequests'
import {useStripe} from 'src/uses/useStripe'


export default defineComponent({
  name: 'StripePayConsultantOffer',
  props: {
    paymentFor: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    paymentForId: {
      type: [String, Number],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    }
  },
  setup(props) {
    const paymentElementRef = ref<HTMLElement>({} as HTMLElement);
    const paymentRequestBtnRef = ref<HTMLElement>({} as HTMLElement);
    let stripePaymentElement: StripePaymentElement | null = null;

    onMounted(async () => {
      const createPaymentResponse = await createPaymentFor(props.paymentFor, props.paymentForId, props.amount, props.title);
      await useStripe.load(createPaymentResponse.stripePublicKey, createPaymentResponse.stripeAccountId);
      useStripe.createElements(createPaymentResponse.clientSecret);
      stripePaymentElement = useStripe.createPaymentElement();
      stripePaymentElement?.mount(paymentElementRef.value);

      // setup for Apple Pay and Google Pay
      if (props.title && props.amount) {
        const paymentTitle = props.title;
        const paymentRequest = useStripe.createPaymentRequest(paymentTitle, props.amount) as PaymentRequest;
        const btn = useStripe.createPaymentRequestBtn(paymentRequest)
        paymentRequest?.canMakePayment().then(result => {
          if (result) {
            btn?.mount(paymentRequestBtnRef.value)
          }
        })
      }
    })

    const confirm = async () => {
      await useStripe.confirm(document.location.href + `?paymentForId=${props.paymentForId}&paymentFor=${props.paymentFor}&email=${props.email}`)
    }

    return {
      backendURL: env.backendUrl,
      paymentElementRef,
      confirm,
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.stripe-pay {
  display: flex;
  justify-content: center;
  align-items: center;

  &__widget {
    min-width: 512px;
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.12);
  }

  &__btns {
    display: flex;
    align-items: center;
  }

  &__pay-btn {
    margin-right: 12px;
  }
}
</style>
