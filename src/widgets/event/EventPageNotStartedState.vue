<template>
  <q-page
    class="row items-center justify-between" style="flex-direction: column;"
  >
    <div class="full-width">
      <q-img
        src="~assets/logo/Rifgo-Logo-Black.svg"
        style="width: 100px"
        class="q-mt-md q-mx-lg"
      />
      <q-separator class="q-mx-lg q-my-md"/>
    </div>

    <div class="full-width">

      <div class="row full-width q-pa-md items-center justify-evenly">
        <div
          v-if="event"
          class="col-md-6 col-sm-8 col-12"
        >

          <div
            v-if="event.speakerName"
            style="margin-left: -12px"
          >
            <speaker-component
              :speaker="{ name: event.speakerName, title: event.speakerTitle, avatarUrl: event.speakerAvatarUrl }"
            />
          </div>

          <date-time-component :event="event"/>

          <div class="text-h4 q-pb-md">
            {{ event.name }}
          </div>

          <div
            v-if="event.speakers"
          >
            <div>
              Speakers
            </div>
            <q-list
              v-for="(speaker, i) of event.speakers"
              v-bind:key="i"
            >
              <q-item>
                <q-item-section avatar>
                  <!--                <q-avatar>-->
                  <q-img
                    :src="speaker.img"
                    placeholder-src="~assets/profile_avatar_placeholder_large.png"
                    :ratio="1"
                    fit="fill"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-bold">{{ speaker.name }}</q-item-label>
                  <q-item-label caption>{{ speaker.title }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div>

            <q-card>
              <q-card-section>
                <div
                  class="text-h6 text-center"
                >
                  Thank you for registering to the event!<br />
                  Event is not started yet<br />
                  Please open this page at {{ eventDate }} — {{ eventDateTimeFrom }}-{{ eventDateTimeTo }}
                </div>
              </q-card-section>
            </q-card>

          </div>

          <div class="row q-pb-md q-pt-md">
            <div class="col">

              <div
                class="q-pb-md text-h6"
              >Description</div>

              <div v-html="event.description" />

            </div>
          </div>

        </div>
      </div>

    </div>

    <div class="full-width" style="color: #8B8B8B">
      <q-separator class="q-mx-md"/>

      <div class="row q-ma-md">
        <div class="col-9">
          <span class="q-pr-md">Terms & Conditions</span>
          <span class="q-pr-md">Privacy Policy</span>
        </div>

        <div class="col-3 text-right">
          &copy; RIFGO 2022
        </div>
      </div>
    </div>

  </q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import SpeakerComponent from '../../components/event/SpeakerComponent.vue';
import DateTimeComponent from 'components/DateTimeComponent.vue';
import {useFormattingDateTime} from 'src/uses/useFormattingDateTime';

export default defineComponent({
  name: 'EventPageNotStartedState',
  components: {DateTimeComponent, SpeakerComponent},
  props: {
    event: {
      type: Object,
    },
  },
  setup(props){
    return useFormattingDateTime(props.event as {date: string, dateTimeFrom: string, dateTimeTo: string}, true)
  },
});
</script>
