<template>
  <div class="col-xs-12 col-md-6">
    <q-card class="rifgo-card">
      <q-card-section>
        <div class="q-pb-sm event-card flex">
          <div class="col-grow q-pa-sm">
            {{ event.name }}
          </div>
          <div>
            <q-btn icon="edit" :to="{name: 'creator-event-edit', params: {eventId: event.id}}" flat color="primary"/>
          </div>
        </div>
        <date-time-component :event=event :with-week-day="false"/>
        <div
          style="font-size: 16px; color: #838383; margin-top: 14px"
          v-html="event.description"
        />
      </q-card-section>

      <q-card-section
        v-if="event.speakerName"
      >
        <div>
          Speaker
        </div>

        <q-item>
          <q-item-section avatar>
            <q-avatar size="48px">
              <q-img
                :src="event.speakerAvatarUrl"
                placeholder-src="~assets/profile_avatar_placeholder_large.png"
                :ratio="1"
                fit="cover"
              />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-bold">{{ event.speakerName }}</q-item-label>
            <q-item-label caption>{{ event.speakerTitle }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-card-section
        class="row"
      >
        <div class="col-12 q-pt-md-none q-pt-md">
          <slot></slot>
          <q-btn
            rounded
            class="full-width q-pa-sm"
            color="primary"
            no-caps
            :to="{name: 'creator-event-show', params: {eventId: event.id}}"
          >Start event
          </q-btn>
        </div>
      </q-card-section>

    </q-card>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import DateTimeComponent from '../DateTimeComponent.vue';

export default defineComponent({
  name: 'EventCardComponent',
  props: {
    event: {
      type: Object,
    },
  },
  components: {DateTimeComponent},

})
</script>

<style lang="scss" scoped>
.event-card {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 16px;
  margin-bottom: 8px;

}
</style>
