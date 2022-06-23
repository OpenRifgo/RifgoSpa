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
          :label="`Pay $${props.event.amount}`"
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
  PropType, ref
} from 'vue'
import {useRoute} from 'vue-router'
import {StripePaymentElement} from '@stripe/stripe-js'
import {PaymentRequest} from '@stripe/stripe-js/types/stripe-js/payment-request'
import {IEvent, IEventRegistration} from 'src/models/EventModels'
import {env} from 'src/services/Env'
import {getPaymentDataBySecret} from 'src/api/publicRequests'
import {useStripe} from 'src/uses/useStripe'


export default defineComponent({
  name: 'StripePayEventIframe',
  props: {
    event: {
      type: Object as PropType<Partial<IEvent>>,
      required: true
    },
    eventRegistration: {
      type: Object as PropType<Partial<IEventRegistration>>,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const regSecret = route.params.regSecret as string
    const paymentElementRef = ref<HTMLElement>({} as HTMLElement)
    const paymentRequestBtnRef = ref<HTMLElement>({} as HTMLElement)
    let stripePaymentElement: StripePaymentElement | null = null

    onMounted(async () => {
      const paymentResponse = await getPaymentDataBySecret(regSecret)
      await useStripe.load(paymentResponse.data.stripePublicKey, paymentResponse.data.stripeAccountId)
      useStripe.createElements(paymentResponse.data.clientSecret)
      stripePaymentElement = useStripe.createPaymentElement()
      stripePaymentElement?.mount(paymentElementRef.value)

      // setup for Apple Pay and Google Pay
      if (props.event.name && props.event.amount) {
        const paymentLabel = `Rifgo event ${props.event.name}`
        const paymentRequest = useStripe.createPaymentRequest(paymentLabel, props.event.amount) as PaymentRequest
        const btn = useStripe.createPaymentRequestBtn(paymentRequest)
        paymentRequest?.canMakePayment().then(result => {
          if (result) {
            btn?.mount(paymentRequestBtnRef.value)
          }
        })
      }
    })

    const confirm = async () => {
      await useStripe.confirm(document.location.href)
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
