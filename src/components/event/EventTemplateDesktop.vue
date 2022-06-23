<template>

  <q-page-container
    class="streamingPage eventTemplateDesktop rifgo-screen bg-black event-horizontal-mobile"
    :class="{isRightWidgetShown: isChatShown || isCalendarEnabled, isRightWidgetHidden: !(isChatShown || isCalendarEnabled)}"
  >
    <q-page>

      <div
        v-if="isChatShown"
        class="eventTemplateDesktop__chatMessages"
      >

        <slot name="chat-messages"></slot>

        <div
          style="height: 128px;"
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

      <q-page-sticky position="top-left">
        <div class="eventTemplateDesktop__video bg-black text-white">

          <q-responsive :ratio="16/9" style="margin-top: 60px;">
            <slot name="video"
                  :is-vertical-mobile="false"
                  :is-horizontal-mobile="true"
            ></slot>
          </q-responsive>

        </div>
      </q-page-sticky>

<!--      <q-page-sticky position="top-left">-->
<!--        <div class="eventTemplateDesktop__video bg-red text-white">-->

<!--          <q-responsive :ratio="16/9" style="margin-top: 60px;">-->
<!--            <slot name="overlay"-->
<!--                  :is-vertical-mobile="false"-->
<!--                  :is-horizontal-mobile="true"-->
<!--            ></slot>-->
<!--          </q-responsive>-->

<!--        </div>-->
<!--      </q-page-sticky>-->

      <q-page-sticky position="bottom">
        <div class="bg-black text-white" style="width: 100vw">

          <div style="height: 80px; line-height: 80px">

            <div class="row">
              <div class="col streamingPage_menuLeft text-left">
                <slot name="menu-left"
                      :is-vertical-mobile="false"
                      :is-horizontal-mobile="true"
                ></slot>
              </div>

              <div class="col-auto text-white text-center streamingPage_bottomButtons">
                <slot name="menu-center"
                      :is-vertical-mobile="false"
                      :is-horizontal-mobile="true"
                ></slot>
              </div>

              <div class="col text-white">
                <slot name="menu-right"
                      :is-vertical-mobile="false"
                      :is-horizontal-mobile="true"
                >&nbsp;</slot>
              </div>
            </div>

          </div>

        </div>
      </q-page-sticky>

      <q-page-sticky position="bottom-right" :offset="[0, 80]">
        <div
          v-if="isChatShown"
          class="eventTemplateDesktop__chatSend bg-black"
        >
          <div>
            <slot name="chat-send"></slot>
          </div>
        </div>
      </q-page-sticky>

      <div
        v-if="!isChatShown"
        class="streamingPage_calendarWidget"
      >
        <slot name="calendar"></slot>
      </div>

      <q-page-sticky position="right" style="z-index: 8999">
        <div v-if="isLeftMenuShown"
             style="height: 100vh; width: 100vw; background-color: rgba(0,0,0,0.5); z-index: 9000"
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

.streamingPage.eventTemplateDesktop {
  .eventTemplateDesktop__video {
    max-height: calc(100vh - 80px - 80px);
    height: calc(100vh - 80px - 80px);
  }

  &.isRightWidgetShown {
    .eventTemplateDesktop__chatMessages {
      width: 30vw;
      margin-left: 70vw;
    }

    .eventTemplateDesktop__chatSend {
      width: 30vw;
      height: 48px;
      line-height: 48px;
      padding: 0 1rem;
    }

    .eventTemplateDesktop__video {
      width: 70vw;
    }
  }

  &.isRightWidgetHidden {
    .eventTemplateDesktop__chatMessages {
      display: none;
    }

    .eventTemplateDesktop__chatSend {
      display: none;
    }

    .eventTemplateDesktop__video {
      width: 100vw;
    }
  }

  .streamingPage_title {
    margin: 0 1.5rem;
    height: 3rem;
    line-height: 3rem;
  }

  .streamingPage_bottomButtons {
    .q-icon {
      font-size: 1.25rem;
    }
  }

  .streamingPage_menuLeft {
    text-align: left;
    margin: 0 1.5rem;
    padding: 0.75rem 0;
    color: #ffffff;
    line-height: 3.5rem;
  }

  .streamingPage_calendarWidget {
    position: fixed;
    top: 0;
    right: 0;
    width: 30vw;
    z-index: 5500;
  }
}
</style>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useQuasar} from 'quasar'

export default defineComponent({
  components: {},
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
  }
});
</script>
