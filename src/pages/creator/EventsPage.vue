<template>
  <q-page class="q-pa-lg bg-grey-1">

    <div class="q-pb-md">
      <q-btn
        class="q-pa-md"
        color="primary"
        no-caps
        icon="add"
        :to="{name: 'creator-event-create'}"
      >Create event
      </q-btn>
    </div>

    <div class="row q-col-gutter-md">
      <event-card-component v-for="event in events" :key="event.id" :event="event">
        <q-btn
          v-if="clipboard.isSupported"
          @click="onShare(event)"
          rounded no-caps
          class="full-width q-pa-sm copy-link-btn"
        >
          <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.66683 0.666626H1.66683C0.933496 0.666626 0.333496 1.26663 0.333496 1.99996V11.3333H1.66683V1.99996H9.66683V0.666626ZM11.6668 3.33329H4.3335C3.60016 3.33329 3.00016 3.93329 3.00016 4.66663V14C3.00016 14.7333 3.60016 15.3333 4.3335 15.3333H11.6668C12.4002 15.3333 13.0002 14.7333 13.0002 14V4.66663C13.0002 3.93329 12.4002 3.33329 11.6668 3.33329ZM11.6668 14H4.3335V4.66663H11.6668V14Z"
              fill="black"/>
          </svg>
          {{ lastClickedCopyBtn!==event.id ? copyBtnText : clickedCopyBtnText }}

        </q-btn>
      </event-card-component>

    </div>
  </q-page>
</template>

<style lang="scss">
.copy-link-btn {
  margin-bottom: 16px;
  background-color: #F9F9F9;

  svg {
    margin-right: 5px;
  }
}

</style>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref} from 'vue';
import {api} from 'boot/axios'
import {IEvent} from 'src/models/EventModels'
import {env} from 'src/services/Env';
import {Notify} from 'quasar';
import {useClipboard} from '@vueuse/core';
import EventCardComponent from 'components/event/EventCardComponent.vue';

export default defineComponent({
  name: 'EventsPage',
  components: {EventCardComponent},
  setup() {
    onMounted(async () => {
      await actions.loadEvents()
    })

    const eventsListRequest = async () => {
      const response = await api.get<{events: Array<IEvent>}>('/api/creator/events')

      return response.data.events
    }

    const eventApi = {
      eventsListRequest,
    }

    const copyBtnText = ref('Copy link')
    const clickedCopyBtnText = ref('Link copied')

    const lastClickedCopyBtn = ref<number>()

    const events = ref<IEvent[]>([]);

    const actions = {
      loadEvents: async () => {
        const eventsListResponse = await eventApi.eventsListRequest()

        console.log(eventsListResponse)

        events.value.push(...eventsListResponse)
      }
    }

    const clipboard = useClipboard();

    const onShare = async (event: IEvent) => {
      lastClickedCopyBtn.value = event.id
      // linkCopyBtnText.value = 'Link copied'
      // copy first link (workaround before we have interface)
      const eventLink = event.eventLinks[0] as { uid: string };
      const eventLinkUid = String(eventLink?.uid);

      if (eventLinkUid) {
        await clipboard.copy(`${env.appAddress}/#/event/${eventLinkUid}`);

        Notify.create({
          type: 'positive',
          message: 'Share link is copied to the clipboard',
          icon: 'share',
          badgePosition: 'bottom-left',
          position: 'top',
          // closeBtn: true,
        })
      }
    }

    return {
      user: reactive({
        name: '',
        surname: '',
      }),
      eventApi,
      events,
      actions,
      lastClickedCopyBtn,
      onShare,
      clipboard,
      copyBtnText,
      clickedCopyBtnText
      //   tab: ref('login'),
      //   ...useGlobalLocale()
    };
  },
});
</script>
