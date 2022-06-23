<template>
  <main class="onboarding-calendly-page">
    <div class="back-arrow" @click="$router.push({name: 'onboarding'})">
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 10.58L3.42 6L8 1.41L6.59 0L0.59 6L6.59 12L8 10.58Z" fill="#3E3E3E"/>
      </svg>
    </div>
    <div class="title-wrapper">
      <h2>{{ stepName[actualStep] }}</h2>
      <span class="actual-step">{{ actualStep + 1 + '/ ' + stepLength }}</span>
    </div>

    <div v-if="calendlyData.codeRetrieved">
      <div class="ok-icon">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="24" fill="#F9F9F9" stroke="#E7E7E7"/>
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M34.7202 18.0521C34.0641 17.396 33.0004 17.396 32.3443 18.0521L21.8917 28.5046L17.5486 24.1615C16.8925 23.5054 15.8288 23.5054 15.1727 24.1615C14.5166 24.8175 14.5166 25.8813 15.1727 26.5373L20.6033 31.9679C20.9569 32.3216 21.429 32.4846 21.8918 32.457C22.3546 32.4845 22.8266 32.3215 23.1802 31.9679L34.7202 20.4279C35.3762 19.7719 35.3762 18.7081 34.7202 18.0521Z"
                fill="#615DFF"/>
        </svg>
      </div>
      <div class="ok-text">Successful connection</div>
      <rifgo-btn
        type="next"
        label="Create referral program"
        class="full-width"
        @click="navigateNext"
      />
    </div>
    <div v-else>
      <section class="public-warning-calendly-step">
      <span>
        Connect your calendar to Calendly and create free calls with the new clients you get through the referral system
      </span>
      </section>

      <rifgo-btn
        v-if="connectCalendlyHref"
        label="Connect your Calendly"
        type="a"
        class="connect-calendly"
        :href="connectCalendlyHref"
      />
    </div>
  </main>
</template>
<style lang="scss">
main.onboarding-calendly-page {
  width: 327px;
  margin: 0 auto;
  color: #333333;

  .back-arrow {
    margin-top: 26px;
    cursor: pointer;
  }

  .ok-icon {
    margin: 32px 0 16px;
    display: flex;
    justify-content: center;
  }

  .ok-text {
    color: #979797;
    text-align: center;
    margin-bottom: 28px;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
  }

  .title-wrapper {
    display: flex;
    margin-top: 26px;
    justify-content: space-between;

    h2 {
      margin: 0;
      font-weight: 600;
      font-size: 24px;
      line-height: 22px;
    }

    span.actual-step {
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      text-align: right;

      color: #979797;
    }


  }

  .public-warning-calendly-step {
    margin: 16px 0 32px;
    background: #FFFDD0;
    border-radius: 8px;
    text-align: left;

    padding: 13.5px 16px;

    span {
      font-size: 14px;
      line-height: 16px;

    }
  }

  .connect-calendly {
    width: 100%;
    margin: 0;
  }
}
</style>
<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref} from 'vue';
import {httpApi} from 'src/services/httpApi';
import RifgoBtn from 'components/custom/RifgoBtn.vue'
import {useRouter} from 'vue-router'

export default defineComponent({
  name: 'CalendlyPage',
  components: {RifgoBtn},
  setup() {
    const $router = useRouter();
    const isPageLoading = ref(true);

    const calendlyData = reactive({
      clientId: '',
      redirectUrl: '',
      codeRetrieved: false,
    })

    onMounted(async () => {
      isPageLoading.value = true;
      const response = await httpApi.get<{
        calendly: {
          clientId: string,
          redirectUrl: string,
          codeRetrieved: boolean,
        }
      }>('creator/calendly/status', {
        params: {
          onboarding: true,
        }
      });
      isPageLoading.value = false;

      Object.assign(calendlyData, response.data.calendly);

    });

    const connectCalendlyHref = computed(() => {
      if (!calendlyData.clientId) return '';
      if (!calendlyData.redirectUrl) return '';

      return [
        'https://calendly.com/oauth/authorize', '?',
        [
          `client_id=${calendlyData.clientId}`,
          'response_type=code',
          `redirect_uri=${calendlyData.redirectUrl}`,
        ].join('&'),
      ].join('')
    })

    const createSchedulingLink = async () => {
      const response = await httpApi.post<{
        booking_url: string
        owner: string
        owner_type: 'EventType'
      }>('creator/calendly/schedulingLinks');

      alert(response.data.booking_url)

      window.open(response.data.booking_url, '_blank')?.focus();
    }

    const eventTypes = ref<Array<{
      booking_url: string
      owner: string
      owner_type: 'EventType'
    }>>([]);
    const getEventTypes = async () => {
      const eventTypesResponse = await httpApi.post<Array<{
        booking_url: string
        owner: string
        owner_type: 'EventType'
      }>>('creator/calendly/eventTypes');

      eventTypes.value = eventTypesResponse.data;
    }

    const navigateNext = async () => {
      await $router.push({name: 'onboarding-stripe'});
    }

    const stepName = ref(['About you', 'Calendly'])
    const actualStep = ref(1)
    const stepLength = computed(() => stepName.value.length)

    return {
      isPageLoading,
      connectCalendlyHref,
      calendlyData,
      eventTypes,
      createSchedulingLink,
      getEventTypes,
      navigateNext,

      stepName,
      actualStep,
      stepLength,
    }
  },
});
</script>
