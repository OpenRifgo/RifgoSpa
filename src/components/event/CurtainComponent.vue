<template>
  <main>
    <div class="main-content">
      <speaker-component :speaker="speaker" :with-padding="false"/>

      <section class="social-media-btn">
        <a v-if="insta" :href="processLink(insta)" target="_blank">
          <img src="../../assets/svg/insta_icon_black.svg" alt="">
        </a>
        <a v-if="fb" :href="processLink(fb)" target="_blank">
          <img src="../../assets/svg/fb_icon_black.svg" alt="">
        </a>
      </section>

      <section v-html="streamer.achievements" class="achievements"></section>

      <section class="paid-buttons">
        <q-btn
          v-if="donationEnabled"
          class="donate-btn"
          no-caps
          @click="onDonateBtnClick"
          flat
        >
          Donate
        </q-btn>
        <q-btn class="paid-btn"
               v-for="(button, idx) in buttons"
               :key="idx" no-caps
               type="a"
               target="_blank"
               :href="processLink(button.url)"
               flat
        >
          {{ button.label }}
        </q-btn>
      </section>
      <section class="recommendation q-gutter-y-md">
        <q-card>
          <q-btn-toggle
            v-model="tab"
            spread
            class="my-custom-toggle"
            no-caps
            rounded
            unelevated
            v-if="isRecommendedEvent && isMyEvent"
            toggle-color="white"
            color="grey-3"
            text-color="black-toggle-2"
            toggle-text-color="black-toggle-3"
            :options="[
              {label: 'My streams', value: 'stream'},
              {label: 'I recommend', value: 'recommendation'}
            ]"
          />
        </q-card>


        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="stream" style="padding: 0">
            <event-promo-card-component
              v-for="event in myEvents"
              :key="event.id"
              class="q-ma-md"
              :event="event"
              :without-old-time="true"
            >
              <event-registration-form
                :event-uid="event.publicEventLink.uid"
                :event="event"
                @open-next-event-sent-tab='tab="next-event-sent-tab"'
              />
            </event-promo-card-component>
          </q-tab-panel>

          <q-tab-panel name="recommendation" style="padding: 0">
            <event-promo-card-component
              v-for="event in recommendedEvents"
              :key="event.id"
              class="q-ma-md"
              :event="event"
              :without-old-time="true"
            >
              <event-registration-form
                :event-uid="event.publicEventLink.uid"
                :event="event"
                @open-next-event-sent-tab='tab="next-event-sent-tab"'
              />
            </event-promo-card-component>
          </q-tab-panel>
          <q-tab-panel name="next-event-sent-tab">
            <q-card
              style="min-width: 272px"
            >
              <q-card-section
                class="text-center text-green q-pa-none"
              >
                <q-icon
                  class="q-pt-lg q-pb-sm"
                  name="fas fa-check-circle"
                  size="xl"
                />
              </q-card-section>

              <q-card-section
                style="max-height: 50vh"
                class="text-bold text-center"
              >
                <p>
                  We have sent<br/>
                  a confirmation link<br/>
                  to your email
                </p>

                <q-btn
                  class="full-width"
                  style="background-color: #615DFF; color: #FFFFFF"
                  label="OK"
                  @click="tab='stream'"
                />
              </q-card-section>
            </q-card>
          </q-tab-panel>

        </q-tab-panels>

      </section>
    </div>
  </main>
  <div v-if="isLeftMenuShown"
       style="position: absolute; left: 0; top:0; height: 100vh; width: 100vw; background-color: rgba(0,0,0,0.5); z-index: 4000"
       @click="isLeftMenuShown = false"
  ></div>

  <transition name="streamingPage-slide-fade">
    <div v-if="isLeftMenuShown"
         style="position: absolute; right: 0; top:0; height: 100vh; width: 472px; max-width: 100vw; z-index: 4001; background-color: #fefefe"
    >

      <div class="text-right" style="height: 3rem">
        <q-btn dense round flat
               icon="close"
               color="grey"
               class="q-ma-sm"
               @click="isLeftMenuShown = false"
        />
      </div>

      <q-scroll-area style="height: calc(100vh - 3rem);">
        <slot name="donate">
          <donate-menu-component
            v-if="isDonateShown"
            :slug="slug"
          />
        </slot>
      </q-scroll-area>
    </div>
  </transition>
</template>

<script lang="ts">
import SpeakerComponent from 'components/event/SpeakerComponent.vue';
import {computed, defineComponent, onMounted, reactive, ref} from 'vue';
import EventPromoCardComponent from 'components/event/EventPromoCardComponent.vue';
import {IStreamer} from 'src/models/StreamerModels';
import {getStreamerBySlug, getStreamerRecommendation} from 'src/api/publicRequests';
import DonateMenuComponent from 'components/event/DonateMenuComponent.vue';
import {IEvent, IEventWithPublicEventLink} from 'src/models/EventModels';
import EventRegistrationForm from 'components/event/EventRegistrationForm.vue';
import {getRecommendedEvents, getStreamerBySecret} from 'src/api/registredRequests';
import {outLink} from 'src/services/outLink'

export default defineComponent({
  name: 'CurtainComponent',
  props: {
    slug: {
      type: String,
      default: '',
    },
    secret: {
      type: String,
      default: '',
    },
  },
  components: {EventRegistrationForm, DonateMenuComponent, EventPromoCardComponent, SpeakerComponent},
  setup(props) {
    onMounted(async () => {
      const streamerResponse = props.slug ? await getStreamerBySlug(props.slug) : await getStreamerBySecret(props.secret)

      Object.assign(streamer, streamerResponse)
      speaker.name = streamer.name
      speaker.title = streamer.title
      speaker.avatarUrl = streamer.avatarUrl

      await loadRecommendedEvents();
    });

    const isMyEvent = computed(() => myEvents.value.length > 0);
    const isRecommendedEvent = computed(() => recommendedEvents.value.length > 0);
    const myEvents = ref<Array<IEvent>>([]);
    let actualRecommendedEvent = reactive<Partial<IEventWithPublicEventLink>>({});
    const recommendedEvents = ref<Array<IEventWithPublicEventLink>>([]);

    const loadRecommendedEvents = async () => {
      const response = props.slug ? await getStreamerRecommendation(props.slug) : await getRecommendedEvents(props.secret);
      Object.assign(myEvents.value, response.data.myEvents);
      Object.assign(recommendedEvents.value, response.data.recommendedEvents);
    }

    const setActualRecommendedEvent = (chosenEvent: IEvent) => {
      console.log({chosenEvent})

      Object.assign(actualRecommendedEvent, chosenEvent);
    }

    let tab = ref('stream');

    const attendBtnListener = (chosenEvent: IEvent) => {
      setActualRecommendedEvent(chosenEvent);
      tab.value = 'next-event-email';
    }

    let streamer = reactive<Partial<IStreamer>>({});
    let speaker = reactive<Partial<{ name: string, title: string, avatarUrl: string }>>({});

    const insta = computed(() => (streamer.smm && streamer.smm.insta) ? streamer.smm.insta : undefined)
    const fb = computed(() => (streamer.smm && streamer.smm.fb) ? streamer.smm.fb : undefined)
    const buttons = computed(() => (streamer.buttons) ? streamer.buttons : undefined)

    const goPay = (url: Location) => {
      document.location = url
    }

    const onDonateBtnClick = () => {
      // Dialog of ScreenName
      // isDonateAreaShown.value = true;
      isDonateShown.value = true;
    }
    const isDonateShown = ref(false);

    const isLeftMenuShown = computed({
      get() {
        // left menu is shown either for donates or next events
        return isDonateShown.value;
      },
      set(val) {
        if (!val) {
          // set both hidden when closed from component via setter
          isDonateShown.value = false;

        } else {
          // component only close, doesn't initiate show
          console.error('unexpected left menu show via setter');
        }
      },
    });

    const processLink = (url: string) => outLink(url, {
      source: 'streamer:curtain',
      sourceId: props.slug,
    });

    return {
      streamer,
      speaker,
      insta,
      fb,
      buttons,

      isDonateShown,
      isLeftMenuShown,

      onDonateBtnClick,

      goPay,

      isMyEvent,
      isRecommendedEvent,
      myEvents,
      recommendedEvents,

      actualRecommendedEvent,
      attendBtnListener,

      tab,
      model: ref('one'),
      secondModel: ref('one'),
      donationEnabled: ref(false), //todo: config

      processLink,
    }
  },
})
</script>

<style lang="scss">
html {
  margin: 0;
  height: 100%;
  width: 100%;
}

body {
  margin: 0;
  min-height: 100%;
  width: 100%;
  background: #F9F9F9;
}

header {
  background: #212121;
  padding: 16px 0;

  .header-content {
    max-width: 560px;
    margin: 0 auto;
  }
}

main {
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  padding-top: 32px;

  .main-content {
    max-width: 560px;
    margin: 0 auto;

    .social-media-btn {
      margin-top: 40px;
      display: flex;
      justify-content: center;

      img {
        margin: 0 8px;
      }
    }

    .achievements {

      ul {
        margin: 0;
        padding: 0;

        li {
          list-style-type: none;
          font-size: 17px;
          line-height: 24px;
          /* or 141% */

          text-align: center;
          letter-spacing: 0.3px;

          /* Black-700 (#4D4D4D) */

          color: #4D4D4D;
        }
      }
    }

    .paid-buttons {

      .shop-btn, .donate-btn, .get-course-btn, .paid-btn {
        border-radius: 8px;
        padding: 14px 24px;
        border: 0.5px solid #CCCCCC;
        width: 100%;
        font-size: 16px;
        line-height: 20px;
      }

      .donate-btn {
        background: #615DFF;
        color: #FFFFFF;
      }

      .shop-btn, .get-course-btn, .paid-btn {
        background: #F2F2F2;
        color: #333333;
        font-weight: 500;

        margin-top: 16px;
      }
    }

    section.recommendation {
      margin-top: 50px;
    }

    section {
      margin-top: 32px;
    }
  }

}

.attend-btn {
  background: #615DFF;
  color: #FFFFFF;
  border-radius: 8px;
  padding: 14px 24px;
  width: 100%;
  font-size: 16px;
  line-height: 20px;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.streamingPage-slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.streamingPage-slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.streamingPage-slide-fade-enter-from,
.streamingPage-slide-fade-leave-to {
  transform: translateX(472px);
  opacity: 0;
}

@media (max-width: 600px) {
  header .header-content, main .main-content {
    max-width: 90%
  }
}

</style>
