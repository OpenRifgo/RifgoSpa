<template>
  <main class="onboarding-stripe-page">

    <div class="title-wrapper">
      <h2> Stripe account </h2>
      <div class="title-icon">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 0.75C3.10078 0.75 0.75 3.10078 0.75 6C0.75 8.89922 3.10078 11.25 6 11.25C8.89922 11.25 11.25 8.89922 11.25 6C11.25 3.10078 8.89922 0.75 6 0.75ZM6.375 8.53125C6.375 8.58281 6.33281 8.625 6.28125 8.625H5.71875C5.66719 8.625 5.625 8.58281 5.625 8.53125V5.34375C5.625 5.29219 5.66719 5.25 5.71875 5.25H6.28125C6.33281 5.25 6.375 5.29219 6.375 5.34375V8.53125ZM6 4.5C5.8528 4.497 5.71265 4.43641 5.60961 4.33125C5.50658 4.22609 5.44887 4.08473 5.44887 3.9375C5.44887 3.79027 5.50658 3.64891 5.60961 3.54375C5.71265 3.43859 5.8528 3.378 6 3.375C6.1472 3.378 6.28735 3.43859 6.39039 3.54375C6.49342 3.64891 6.55113 3.79027 6.55113 3.9375C6.55113 4.08473 6.49342 4.22609 6.39039 4.33125C6.28735 4.43641 6.1472 4.497 6 4.5Z"
            fill="#333333"/>
        </svg>
      </div>
    </div>

    <section class="public-warning">
      <span>Link your existing account</span>
    </section>


      <div v-if="!onboardingLink">
        <rifgo-btn
          label="Link Stripe account"
          @click="createStripeAccountOnboardingLink"
          :loading="isStripeAccountOnboardingLinkCreating"
          class="full-width"
        />
      </div>

      <div v-else>
        <rifgo-btn
          color="primary"
          type="a"
          target="_blank"
          :href="onboardingLink"
          label="Proceed with Stripe"
          class="full-width"
        />
      </div>

      <!--    <div class="q-mb-md">-->
      <!--      <q-btn-->
      <!--        label="Check account"-->
      <!--        color="primary"-->
      <!--        @click="checkStripeAccount"-->
      <!--      />-->
      <!--    </div>-->

      <!--    <div class="q-mb-md">-->
      <!--      <pre>{{ stripeAccountData }}</pre>-->
      <!--    </div>-->

          <rifgo-btn
            type="back"
            label="Go back"
            class="full-width navigate-back"
            @click="navigateBack"
            flat
          />

    <q-inner-loading
      :showing="isPageLoading"
    />
  </main>
</template>

<style lang="scss">
.auth_tabs .q-tab__label {
  color: #1D1D1D;
}

main.onboarding-stripe-page {
  width: 320px;
  margin: 0 auto;
  color: #333333;

  .title-wrapper {
    display: flex;
    margin-top: 64px;
    justify-content: flex-start;

    &.subtitle-wrapper {
      margin-top: 25px;
    }

    h2 {
      margin: 0;
      font-weight: 600;
      font-size: 24px;
      line-height: 22px;
    }

    .title-icon {
      margin-left: 8px;
      margin-top: 3px;
    }

    span.actual-step {
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      text-align: right;

      color: #979797;
    }

  }

  .public-warning {
    margin: 13px 0 32px;
    background: #FFFDD0;
    border-radius: 8px;
    text-align: left;
    padding: 16px;
  }

  .navigate-back {
    margin-top: 18px;
  }

}
</style>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref} from 'vue';
import {httpApi} from 'src/services/httpApi'
import RifgoBtn from 'components/custom/RifgoBtn.vue'
import {useRouter} from 'vue-router'

export default defineComponent({
  name: 'StripePage',
  components: {RifgoBtn},
  setup() {
    const $router = useRouter();
    const isPageLoading = ref(true);
    const isStripeAccountOnboardingLinkCreating = ref(false);

    onMounted(async () => {
      isPageLoading.value = true;

      await httpApi.post('/stripe/createAccount', {
        ifNotExists: true,
      });

      isPageLoading.value = false;
    })

    // const createStripeAccount = async () => {
    //   await httpApi.post('/stripe/createAccount');
    // }

    const onboardingLink = ref('');
    const createStripeAccountOnboardingLink = async () => {
      isStripeAccountOnboardingLinkCreating.value = true;

      const result = await httpApi.post<{ url: string }>('/stripe/createAccountOnboardingLink');
      onboardingLink.value = result.data.url;

      isStripeAccountOnboardingLinkCreating.value = false;
    }

    const stripeAccountData = reactive({});
    const checkStripeAccount = async () => {
      Object.assign(stripeAccountData, (await httpApi.post('/stripe/checkAccount')).data);
    }

    const navigateBack = async () => {
      await $router.push({name: 'onboarding-referral'});
    }

    return {
      onboardingLink,
      stripeAccountData,
      // createStripeAccount,
      createStripeAccountOnboardingLink,
      checkStripeAccount,
      navigateBack,
      isPageLoading,
      isStripeAccountOnboardingLinkCreating,
    }
  },
});
</script>
