<template>
  <q-page class="q-pa-lg bg-grey-1 row items-center justify-between">

<!--    <div class="q-mb-md">-->
<!--      <q-btn-->
<!--        label="Create Stripe Account"-->
<!--        color="primary"-->
<!--        @click="createStripeAccount"-->
<!--      />-->
<!--    </div>-->

    <div
      v-if="!onboardingLink"
      class="q-mb-md col-12 text-center"
    >
      <div class="q-pb-md">
        Please click this button to integrate your account with Stripe:
      </div>
      <rifgo-btn
        label="Get onboarding link"
        @click="createStripeAccountOnboardingLink"
        :loading="isStripeAccountOnboardingLinkCreating"
      />
    </div>

    <div
      v-else
      class="q-mb-md col text-center"
    >
      <q-btn
        color="primary"
        type="a"
        target="_blank"
        :href="onboardingLink"
      >Proceed with Stripe</q-btn>
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

    <q-inner-loading
      :showing="isPageLoading"
    />
  </q-page>
</template>

<style>
.auth_tabs .q-tab__label {
  color: #1D1D1D;
}
</style>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref} from 'vue';
import {httpApi} from 'src/services/httpApi'
import RifgoBtn from 'components/custom/RifgoBtn.vue'

export default defineComponent({
  name: 'StripePage',
  components: {RifgoBtn},
  setup() {
    const isPageLoading = ref(true);
    const isStripeAccountOnboardingLinkCreating = ref(false);

    onMounted(async () => {
      isPageLoading.value = true;

      await httpApi.post('/stripe/createAccount', {
        ifNotExists: true
      });

      isPageLoading.value = false;
    })

    // const createStripeAccount = async () => {
    //   await httpApi.post('/stripe/createAccount');
    // }

    const onboardingLink = ref('');
    const createStripeAccountOnboardingLink = async () => {
      isStripeAccountOnboardingLinkCreating.value = true;

      const result = await httpApi.post<{url: string}>('/stripe/createAccountOnboardingLink');
      onboardingLink.value = result.data.url;

      isStripeAccountOnboardingLinkCreating.value = false;
    }

    const stripeAccountData = reactive({});
    const checkStripeAccount = async () => {
      Object.assign(stripeAccountData, (await httpApi.post('/stripe/checkAccount')).data);
    }

    return {
      onboardingLink,
      stripeAccountData,
      // createStripeAccount,
      createStripeAccountOnboardingLink,
      checkStripeAccount,
      isPageLoading,
      isStripeAccountOnboardingLinkCreating,
    }
  }
});
</script>
