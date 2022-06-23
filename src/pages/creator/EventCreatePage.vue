<template>
  <q-page class="q-pa-lg bg-grey-1">
    <q-form
      @submit="submitEvent"
    >
      <events-create-edit-component v-model="emptyEvent"/>

      <div class="row q-pb-md q-pt-md">
        <div class="col">
          <q-btn
            class="q-py-md q-px-xl"
            color="primary"
            type="submit"
            no-caps
          >Create event</q-btn>
        </div>
        <div class="col text-right">
          <q-btn
            class="q-py-md q-px-xl"
            flat
            no-caps
            @click="$router.push({name: 'creator-events'})"
          >Cancel</q-btn>
        </div>
      </div>

    </q-form>
  </q-page>
</template>

<script lang="ts">
import EventsCreateEditComponent from 'components/EventsCreateEditComponent.vue';
import {reactive} from 'vue';
import {IEvent} from 'src/models/EventModels';
import {Notify} from 'quasar';
import {useRouter} from 'vue-router';
import {eventCreateRequest} from 'src/api/creatorRequests';

export default {
  name: 'EventCreatePage',
  components: {EventsCreateEditComponent},
  setup: function () {
    const emptyEvent = reactive<Partial<IEvent>>({accessType: 'paid'});
    const router = useRouter();

    const submitEvent = async () => {
      const eventCreateResponse = await eventCreateRequest(<IEvent>emptyEvent)

      if (eventCreateResponse.event?.id) {
        Notify.create({
          message: 'Event created',
          type: 'positive',
        })

        await router.push({
          name: 'creator-events'
        })
      }
    }
    return {
      submitEvent,
      emptyEvent
    }
  }
}
</script>

<style scoped>

</style>
