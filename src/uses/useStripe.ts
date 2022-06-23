import {loadStripe, Stripe, StripeElements, StripePaymentElement} from '@stripe/stripe-js'
import {PaymentRequest} from '@stripe/stripe-js/types/stripe-js/payment-request'

function stripeFactory() {
  let instance: Stripe | null = null
  let elements: StripeElements | null = null

  const load = async (publishableKey: string, stripeAccount: string): Promise<Stripe | null> => {
    if (instance) {
      return instance
    }

    try {
      instance = await loadStripe(publishableKey, {stripeAccount})
      return instance
    } catch (e) {
      return null
    }
  }

  const createElements = (clientSecret: string): StripeElements | null => {
    elements = instance?.elements({clientSecret}) || null
    return elements
  }

  const createPaymentElement = (): StripePaymentElement | null => {
    return elements?.create('payment') || null
  }

  const createPaymentRequest = (label: string, amount: number) => {
    return instance?.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: label,
        amount,
      },
      requestPayerName: false,
      requestPayerEmail: false
    })
  }

  const createPaymentRequestBtn = (paymentRequest: PaymentRequest) => {
    return elements?.create('paymentRequestButton', {
      paymentRequest
    })
  }

  const confirm = async (returnUrl: string) => {
    return await instance?.confirmPayment({
      elements: elements as StripeElements,
      confirmParams: {
        return_url: returnUrl,
      }
    })
  }

  return {
    instance,
    elements,
    load,
    createElements,
    createPaymentElement,
    createPaymentRequest,
    createPaymentRequestBtn,
    confirm
  }
}

export const useStripe = stripeFactory()
