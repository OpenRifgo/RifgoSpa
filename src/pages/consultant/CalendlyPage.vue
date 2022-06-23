<template>
  <q-page class="q-pa-lg bg-grey-1 row items-center justify-between">
    <div
      v-if="!isPageLoading"
      class="q-mb-md col-12 text-center"
    >
      <div
        v-if="calendlyData.codeRetrieved"
      >
        <div class="q-pb-md">
          Calendly integration is<br/>
          <q-badge color="green">active</q-badge>
        </div>
<!--        <div class="q-pb-md">-->
<!--          <rifgo-btn-->
<!--            label="Create one-time-link (for test)"-->
<!--            @click="createSchedulingLink"-->
<!--          />-->
<!--        </div>-->
<!--        <div class="q-pb-md">-->
<!--          <rifgo-btn-->
<!--            label="Load event types"-->
<!--            @click="getEventTypes"-->
<!--          />-->
<!--          <pre v-if="eventTypes.length > 0">-->
<!--            {{ eventTypes }}-->
<!--          </pre>-->
<!--        </div>-->
      </div>
      <div
        v-else
      >
        <div class="q-pb-md">
          Please click this button to integrate your account with Calendly:
        </div>

        <rifgo-btn
          v-if="connectCalendlyHref"
          label="Connect your Calendly"
          type="a"
          :href="connectCalendlyHref"
        />
      </div>
    </div>

    <q-inner-loading
      :showing="isPageLoading"
    />
  </q-page>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref} from 'vue';
import {httpApi} from 'src/services/httpApi';
import RifgoBtn from 'components/custom/RifgoBtn.vue'

export default defineComponent({
  name: 'CalendlyPage',
  components: {RifgoBtn},
  setup() {
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
      }>('creator/calendly/status');
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

    return {
      isPageLoading,
      connectCalendlyHref,
      calendlyData,
      eventTypes,
      createSchedulingLink,
      getEventTypes,
    }
  },
});
</script>
