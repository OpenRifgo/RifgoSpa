<template>
  <q-page class="q-pa-lg bg-grey-1">
    <q-card flat bordered class="q-mb-md">
      <q-card-section horizontal>
        <q-card-section>
          <q-select
            :options="events"
            option-label="name"
            option-value="id"
            v-model="selectedEvent"
            @filter="filterEventsFn"
            filled
            use-input
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
<!--                <q-item-section avatar>-->
<!--                  <q-icon :name="scope.opt.icon" />-->
<!--                </q-item-section>-->
                <q-item-section>
                  <q-item-label>{{ scope.opt.name }}</q-item-label>
                  <q-item-label caption>ID#{{ scope.opt.id }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-card-section>

        <q-separator vertical/>

        <q-card-section>
          <div>
            <q-toggle toggle-indeterminate v-model="confirmed" label="confirmed"/>
          </div>
          <div>
            <q-toggle toggle-indeterminate v-model="paid" label="paid"/>
          </div>
        </q-card-section>
      </q-card-section>

      <q-separator/>

      <q-card-section class="row">
        <div class="col">
          <q-chip
            v-if="loaded"
          >
            Total: {{ registrations.length }}
          </q-chip>
        </div>
        <div class="col text-right">
          <q-btn
            label="load data"
            @click="loadRegistrations()"
            color="primary"
            :disable="!eventId"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-table
      v-if="loaded"
      :rows="registrations"
      :columns="registrationsColumns"
      :pagination="{rowsPerPage: 100}"
    />

  </q-page>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, Ref, ref} from 'vue'
import {api} from 'boot/axios'
import {Notify} from 'quasar'
import {AxiosError} from 'axios'
import {normErrorMessage} from 'src/lib/helpers'

interface IEventRegistration {
  id: number,
}

interface IEvent {
  id: number,
}

export default defineComponent({
  setup() {
    const selectedEvent = ref<IEvent | null>(null);
    const eventId = computed(() => selectedEvent.value?.id);

    const confirmed = ref(null);
    const paid = ref(null);
    const registrations = ref<IEventRegistration[]>([]);
    const loaded = ref(false);

    onMounted(async () => {
      await loadEvents();
    })

    const loadRegistrations = async () => {
      await api.get<{
        eventRegistrations: IEventRegistration[]
      }>('/api/creator/event-registrations', {
        params: {
          eventId: eventId.value,
          confirmed: confirmed.value,
          paid: paid.value,
        },
      }).then((result) => {
        registrations.value = result.data.eventRegistrations;
        loaded.value = true;
      }).catch((err: AxiosError) => {
        registrations.value = [];
        loaded.value = false;

        Notify.create({
          message: normErrorMessage(err),
          type: 'negative',
        });
      });
    };

    const events: Ref<{id: number, name: string}[]> = ref([]);
    const eventsNameFilter = ref('');

    const loadEvents = async () => {
      await api.get<{
        events: {id: number, name: string}[]
      }>('/api/admin/events', {
        params: {
          name: eventsNameFilter.value || undefined,
          // eventId: eventId.value,
          // confirmed: confirmed.value,
          // paid: paid.value,
        },
      }).then((result) => {
        events.value = result.data.events;
        // loaded.value = true;
      }).catch((err: AxiosError) => {
        events.value = [];
        // loaded.value = false;

        Notify.create({
          message: normErrorMessage(err),
          type: 'negative',
        });
      });
    }

    const filterEventsFn = (val: string, update: (fn: () => void) => void) => {
      update(() => {
        eventsNameFilter.value = val.toLowerCase();
        void loadEvents();
      })
    }

    const registrationsColumns = [
      {name: 'id', label: 'ID', field: 'id', sortable: true},
      {name: 'email', label: 'Email', field: 'email', sortable: true},
      {name: 'confirmed', label: 'Confirmed', field: 'confirmed', sortable: true},
      {name: 'paid', label: 'Paid', field: 'paid', sortable: true},
      {name: 'createdAt', label: 'Created', field: 'createdAt', sortable: true},
      {name: 'eventId', label: 'Event ID', field: 'eventId', sortable: true},
      {name: 'eventLinkId', label: 'Event Link ID', field: 'eventLinkId', sortable: true},
    ];

    return {
      eventId,
      confirmed,
      paid,
      registrations,
      loadRegistrations,
      registrationsColumns,
      loaded,
      events,
      selectedEvent,
      filterEventsFn,
    }
  },
})

</script>
