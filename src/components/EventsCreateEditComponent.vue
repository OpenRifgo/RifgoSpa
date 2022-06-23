<template>
  <div class="q-pb-md">
    <q-input label="Event name" outlined v-model="event.name"/>
  </div>

  <div class="q-pb-md">
    <q-editor v-model="event.description" min-height="5rem" />
  </div>

  <div class="q-pb-md">
    <q-input label="Expert name" outlined v-model="event.speakerName"/>
  </div>

  <div class="q-pb-md">
    <q-input label="Expert title" outlined v-model="event.speakerTitle"/>
  </div>

  <div class="q-pb-md">
    <q-input label="Expert avatar URL" outlined v-model="event.speakerAvatarUrl"/>
  </div>

  <div class="row q-col-gutter-md q-pb-md">
    <div class="col">
      <q-input label="Date" outlined v-model="event.date" readonly class="begin-date" >
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale" target=".begin-date">
              <q-date v-model="event.date" mask="DD MMM YYYY">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat/>
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="col">
      <q-select
        v-model="event.timezone"
        :options="timezoneOptions"
        use-input
        @filter="filterFn"
        label="Timezone"
        outlined
      />
    </div>
    <div class="col">
      <q-input v-model="event.timeFrom" filled type="time" label="From" />
    </div>
    <div class="col">
      <q-input v-model="event.timeTo" filled type="time" label="To" />
    </div>
  </div>



  <div class="text-h6 q-pb-md">Access</div>

  <div class="q-pb-md">
    <q-radio v-model="event.accessType" val="free" label="Free" class="q-pr-xl"/>

    <q-radio v-model="event.accessType" val="paid" label="Paid" class="q-pr-xl"/>

  </div>

  <q-input class="q-pb-md" v-if="amountIsVisible" label="Amount (USD)" outlined v-model="event.amount"/>
</template>

<style>
.auth_tabs .q-tab__label {
  color: #1D1D1D;
}

.q-field--outlined.q-field--readonly .q-field__control:before {
  border-style: solid;
}
</style>

<script lang="ts">
import {computed, defineComponent, onMounted, ref} from 'vue';
import {useTimezones} from 'src/uses/useTimezones'

export default defineComponent({
  name: 'EventsCreateEditComponent',
  components: {},
  props: {
    modelValue: {
      type: Object,
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    onMounted(async () => {
      await timezones.timezonesLoad();
      formattedTimezone.value = timezones.timezones.value.map(item => item.name)
      if (event.value && !event.value.description)
        event.value.description = '';
      if (event.value && !event.value.timezone)
        event.value.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    });

    const event = computed({
      get: () => props.modelValue,
      set: (newValue) => emit('update:modelValue', newValue)
    })
    const timezones = useTimezones();
    let formattedTimezone = ref<Array<string>>([''])
    const timezoneOptions = ref(formattedTimezone.value)

    const filterFn = (val: string, update: (cb: () => void) => void) => {
      update(() => {
        const needle = val.toLowerCase()
        timezoneOptions.value = formattedTimezone.value.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }
    const amountIsEnabled = computed(() => event.value ? event.value.accessType === 'paid' : true)

    return {
      event,
      timezones,
      formattedTimezone,
      timezoneOptions,
      filterFn,
      amountIsVisible: amountIsEnabled
    };
  },
});
</script>
