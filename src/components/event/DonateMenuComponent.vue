<template>
  <div v-if="state === 'input'">

    <div
      class="q-px-lg text-grey"
    >
      {{ donationText || 'You can thank the streamer by transferring any amount' }}
    </div>

    <div class="q-pa-lg">
      <q-card class="q-pa-sm">
        <q-card-section>
          <q-input
            v-if="!Boolean(price)"
            :label="Boolean(price) ? 'Amount' : 'Enter amount'"
            outlined
            prefix="$"
            v-model="donationAmount"
            style="margin-bottom: 12px"
            :rules="[value => value > 0 || 'Please enter numeric amount']"
            :disable="Boolean(price)"
          />

          <q-input
            :label="commentInputPlaceholder || 'Add a comment'"
            outlined
            :type="donateConfig.textarea ? 'textarea' : 'text'"
            v-model="donationQuestion"
            class="col"
            bottom-slots
            maxlength="255"
          >
            <template v-slot:counter>
              <div style="margin-top: -35px">
                {{ (255 - String(donationQuestion || '').length) }}
              </div>
            </template>
          </q-input>

          <q-btn
            :label="actionText || 'Donate by card'"
            color="primary"
            size="lg"
            class="full-width q-mt-md"
            no-caps
            @click="onDonateByCardClicked"
          />
        </q-card-section>
      </q-card>
    </div>

  </div>

  <div
    v-if="state === 'card'"
    class="q-pa-lg full-height"
  >

    <iframe
      style="border: 0; min-height: calc(100vh - 100px)"
      class="full-width full-height"
      :src="donationUrl"
    />

  </div>

</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref} from 'vue'
import {env} from 'src/services/Env'
import {IEventRegistration} from 'src/models/EventModels'
import {useEventDonate} from 'src/uses/useEventDonate'
import {stateScreenName} from 'src/uses/useScreenName'
import {useQuasar} from 'quasar'
import {IDonateConfig} from 'components/models'

export default defineComponent({
  props: {
    event: {
      type: Object,
    },
    eventRegistration: {
      type: Object as PropType<Partial<IEventRegistration>>,
    },
    screenName: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    actionText: {
      type: String,
      default: 'Donate by card'
    },
    donationText: {
      type: String,
      default: null
    },
    commentInputPlaceholder: {
      type: String,
      default: null
    },
    donateConfig: {
      type: Object as PropType<IDonateConfig>,
      default: () => ({})
    },
  },
  setup(props) {
    const donationAmount = ref<number | null>(props.price);
    const donationQuestion = ref<string>('');
    const state = ref<'input' | 'card'>('input');
    const $q = useQuasar();

    const { onDonateClick } = useEventDonate({
      screenName: stateScreenName(),
      $q,
    });

    const onDonateByCardClicked = () => {
      onDonateClick()
      state.value = 'card';
    }
    const secret = computed(() =>
      props.eventRegistration && props.eventRegistration.secret ? props.eventRegistration.secret : '',
    )
    const donationParams = computed(() => {
        const baseParams = donationAmount.value ? `donationAmount=${donationAmount.value}` : null;
        const nameParam = props.screenName ? `screenName=${props.screenName}` : null;
        const questionParam = donationQuestion.value ? `donationQuestion=${donationQuestion.value}` : null;
        const privateParam = props.donateConfig.private ? 'private=true' : null;

        return [baseParams, nameParam, questionParam, privateParam].filter(v => v).join('&');
      },
    )

    const donationUrl = computed(() => {
      let donateUrl = ''
      if (props.event && props.eventRegistration) {
        donateUrl = `${env.backendUrl}/api/registered/${secret.value}/donationFrame?${donationParams.value}`
      } else if (props.slug) {
        donateUrl = `${env.backendUrl}/api/public/streamers/${props.slug}/donationFrame?${donationParams.value}`
      }

      return donateUrl
    })

    return {
      state,
      donationAmount,
      donationQuestion,
      onDonateByCardClicked,
      backendURL: env.backendUrl,
      donationUrl,
    }
  },
})
</script>
