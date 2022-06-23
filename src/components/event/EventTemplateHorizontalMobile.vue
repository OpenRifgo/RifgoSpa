<template>

  <q-page-container
    class="streamingPage rifgo-screen bg-black event-horizontal-mobile"
  >
    <q-page>

      <!--      v-if="!isChatShown"-->
      <div
        v-if="isCalendarEnabled && !isChatShown"
        class="streamingPage_calendarWidget"
      >
        <slot name="calendar"></slot>
      </div>

      <div
        v-if="isChatShown || !isCalendarEnabled"
        style="width: 50vw; margin-left: 50vw;"
      >

        <slot name="chat-messages"></slot>

        <div
          style="height: 48px;"
        >
          <!-- spacer for "message" -->
        </div>

      </div>

      <q-page-sticky position="top-left">
        <div style="width: 50vw" class="bg-black text-white">
          <div style="height: 32px; line-height: 32px; padding-left: 16px">
            <slot name="name"></slot>
          </div>
        </div>
      </q-page-sticky>

      <q-page-sticky position="top-left" :offset="[16, 42]" style="z-index: 6000">
        <div style="width: 50vw">
          <slot name="next-event-btn"></slot>
        </div>
      </q-page-sticky>

      <q-page-sticky position="left">
        <div style="width: 50vw" class="bg-black text-white">

          <q-responsive :ratio="16/9">
            <slot name="video"
                  :is-vertical-mobile="false"
                  :is-horizontal-mobile="true"
            ></slot>
          </q-responsive>

        </div>
      </q-page-sticky>

      <q-page-sticky position="bottom-left">
        <div style="width: 50vw" class="bg-black text-white">

          <div style="height: 32px; line-height: 32px">

            <div class="row absolute-bottom">
              <div class="col streamingPage_menuLeft text-left">
                <slot name="menu-left"
                      :is-vertical-mobile="false"
                      :is-horizontal-mobile="true"
                ></slot>

                <slot name="menu-center"
                      :is-vertical-mobile="false"
                      :is-horizontal-mobile="true"
                ></slot>
              </div>

              <!--              <div class="col-auto text-white text-center streamingPage_bottomButtons">-->
              <!--                <slot name="menu-center"-->
              <!--                      :is-vertical-mobile="false"-->
              <!--                      :is-horizontal-mobile="true"-->
              <!--                ></slot>-->
              <!--              </div>-->

              <!--              <div class="col text-white">-->
              <!--                <slot name="menu-right"-->
              <!--                      :is-vertical-mobile="false"-->
              <!--                      :is-horizontal-mobile="true"-->
              <!--                >&nbsp;</slot>-->
              <!--              </div>-->
            </div>

          </div>

        </div>
      </q-page-sticky>

      <q-page-sticky
        v-if="isChatShown || !isCalendarEnabled"
        position="bottom-right"
        style="width: 50vw;"
      >
        <div class="bg-black" style="width: 50vw; height: 48px; line-height: 48px">
          <slot name="chat-send"></slot>
        </div>
      </q-page-sticky>

      <q-page-sticky position="right" style="z-index: 8999">
        <div v-if="isLeftMenuShown"
             style="position: absolute; right: 0; top:0; height: 100vh; width: 100vw; background-color: rgba(0,0,0,0.5); z-index: 9000"
             @click="$emit('update:isLeftMenuShown', false)"
        ></div>
      </q-page-sticky>

      <q-page-sticky position="right" style="z-index: 9000">
        <transition name="streamingPage-slide-fade">
          <div v-if="isLeftMenuShown"
               style="height: 100vh; width: 472px; max-width: 100vw; background-color: #fefefe"
          >

            <div class="text-right" style="height: 3rem">
              <q-btn dense round flat
                     icon="close"
                     color="grey"
                     class="q-ma-sm"
                     @click="$emit('update:isLeftMenuShown', false)"
              />
            </div>

            <q-scroll-area style="height: calc(100vh - 3rem);">
              <slot name="left-menu"></slot>
            </q-scroll-area>
          </div>
        </transition>
      </q-page-sticky>

    </q-page>
  </q-page-container>

</template>

<style lang="scss">

.streamingPage.event-horizontal-mobile {
  &.mobileStreamingPage {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  //&.iOSStreamingPage {
  //  // temp hack
  //  .streamingPage_chatWrap {
  //    height: calc(100vh - 3rem - 2rem - 3rem - 4rem);
  //  }
  //}

  .streamingPage_title {
    margin: 0 1.5rem;
    height: 3rem;
    line-height: 3rem;
  }

  //// desktop
  //@media (min-width: $breakpoint-md-max) {
  //  .streamingPage_videoCell {
  //    padding: 0 1.5rem;
  //  }
  //}
  //
  //// tablet & horizontal mobile
  //@media (min-width: $breakpoint-xs-max) and (max-width: $breakpoint-md-max) {
  //  .streamingPage_videoCell {
  //    padding: 0 1rem;
  //  }
  //}
  //
  //// mobile
  //@media (max-width: $breakpoint-xs-max) {
  //  .streamingPage_videoCell {
  //    padding: 0;
  //    max-height: 40vh;
  //  }
  //}

  .streamingPage_videoWrap {
    //background-color: #0000FF;
    border-radius: 0.5rem;
    width: 100%;
  }

  .streamingPage_bottomButtons {
    .q-icon {
      font-size: 1.25rem;
    }
  }

  .streamingPage_menuLeft {
    text-align: left;
    margin: 0 1.5rem;
    padding: 0;
    color: #ffffff;
    line-height: 3.5rem;
  }

  .streamingPage_calendarWidget {
    position: fixed;
    top: 0;
    right: 0;
    width: 50vw;
    z-index: 5500;
  }

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
</style>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useQuasar} from 'quasar'

export default defineComponent({
  props: {
    isChatShown: {
      type: Boolean,
      default: false,
    },
    isCalendarEnabled: {
      type: Boolean,
      default: false,
    },
    isMaximized: {
      type: Boolean,
      default: false,
    },
    isLeftMenuShown: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:isLeftMenuShown'],
  setup() {
    const $q = useQuasar();

    const isMobile = Boolean($q.platform.is.mobile);
    const isVerticalMobile = computed(() => $q.screen.xs);
    const isHorizontalMobile = computed(() => $q.screen.sm);

    return {
      isMobile,
      isVerticalMobile,
      isHorizontalMobile,
    }
  },
});
</script>
