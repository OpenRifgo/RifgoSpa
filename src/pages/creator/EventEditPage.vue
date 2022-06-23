<template>
  <q-page class="q-pa-lg bg-grey-1">
    <q-form
      @submit="submitEvent"
    >
      <events-create-edit-component v-model="eventById"/>

      <div class="row q-pb-md q-pt-md">
        <div class="col">
          <q-btn
            class="q-py-md q-px-xl"
            color="primary"
            type="submit"
            no-caps
          >Update event</q-btn>
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
import {useRoute, useRouter} from 'vue-router';
import {eventUpdateRequest, getEventById} from 'src/api/creatorRequests';
import {onMounted, reactive} from 'vue';
import {IEvent} from 'src/models/EventModels';
import {Notify} from 'quasar';
export default {
  name: 'EventEditPage',
  components: {EventsCreateEditComponent},
  setup(){
    onMounted(async () => {
      if (useRoute().params.eventId) {
        const eventId = String(useRoute().params.eventId)
        const event = await getEventById(eventId)
        Object.assign(eventById, event)
      }
    });

    const router = useRouter();
    const eventById = reactive<Partial<IEvent>>({});

    const submitEvent = async () => {

      const eventCreateResponse = await eventUpdateRequest(<IEvent>eventById)
      if (eventCreateResponse.event?.id) {
        Notify.create({
          message: 'Event updated',
          type: 'positive',
        })

        await router.push({
          name: 'creator-events'
        })
      }
    }

    return {
      submitEvent,
      eventById
    }
  }
}
</script>

<style scoped>

</style>



