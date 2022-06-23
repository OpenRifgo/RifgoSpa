<template>

  <div :style="videoPosition">
    <slot name="video"
          :is-vertical-mobile="isVerticalMobile"
          :is-horizontal-mobile="isHorizontalMobile"
          :is-maximized="isMaximized"
          :is-desktop="isDesktop"
    ></slot>
  </div>

  <div :style="videoPosition">
    <slot name="overlay"
          :is-vertical-mobile="isVerticalMobile"
          :is-horizontal-mobile="isHorizontalMobile"
          :is-maximized="isMaximized"
          :is-desktop="isDesktop"
    ></slot>
  </div>

  <component
    v-if="currentComponent"
    :is="currentComponent"
    class="streamingPage rifgo-screen event-vertical-mobile"
    :name="name"
    :is-left-menu-shown="isLeftMenuShown"
    :is-chat-shown="isChatShown"
    :is-calendar-enabled="isCalendarEnabled"
    @update:isLeftMenuShown="$emit('update:isLeftMenuShown', false)"
  >
    <template v-slot:name>
      <slot name="name"></slot>
    </template>

    <template v-slot:chat-messages>
      <slot name="chat-messages"
            :is-vertical-mobile="isVerticalMobile"
            :is-horizontal-mobile="isHorizontalMobile"
            :is-maximized="isMaximized"
            :is-desktop="isDesktop"
      ></slot>
    </template>

    <template v-slot:video>

    </template>

    <template v-slot:menu-left>
      <slot name="menu-left"
            :is-vertical-mobile="isVerticalMobile"
            :is-horizontal-mobile="isHorizontalMobile"
            :is-maximized="isMaximized"
            :is-desktop="isDesktop"
      ></slot>
    </template>

    <template v-slot:menu-center>
      <slot name="menu-center"
            :is-vertical-mobile="isVerticalMobile"
            :is-horizontal-mobile="isHorizontalMobile"
            :is-maximized="isMaximized"
            :is-desktop="isDesktop"
      ></slot>
    </template>

    <template v-slot:menu-right>
      <slot name="menu-right"
            :is-vertical-mobile="isVerticalMobile"
            :is-horizontal-mobile="isHorizontalMobile"
            :is-maximized="isMaximized"
            :is-desktop="isDesktop"
      >&nbsp;</slot>
    </template>

    <template v-slot:chat-send>
      <slot name="chat-send"
            :is-vertical-mobile="isVerticalMobile"
            :is-horizontal-mobile="isHorizontalMobile"
            :is-maximized="isMaximized"
            :is-desktop="isDesktop"
      ></slot>
    </template>

    <template v-slot:left-menu>
      <slot name="left-menu"
            :is-vertical-mobile="isVerticalMobile"
            :is-horizontal-mobile="isHorizontalMobile"
            :is-left-menu-shown="isLeftMenuShown"
            :is-maximized="isMaximized"
            :is-desktop="isDesktop"
      ></slot>
    </template>

    <!-- todo: figure out how to get rid of it -->
    <template v-slot:next-event-btn>
      <slot name="next-event-btn"
            :is-vertical-mobile="isVerticalMobile"
            :is-horizontal-mobile="isHorizontalMobile"
            :is-left-menu-shown="isLeftMenuShown"
            :is-maximized="isMaximized"
            :is-desktop="isDesktop"
      ></slot>
    </template>

    <!-- todo: replace with chat-messages && chat-send for desktop-->
    <template v-slot:chat>
      <slot name="chat"
            :is-vertical-mobile="isVerticalMobile"
            :is-horizontal-mobile="isHorizontalMobile"
            :is-maximized="isMaximized"
            :is-desktop="isDesktop"
      ></slot>
    </template>


    <template v-slot:calendar>
      <slot name="calendar"
            :is-vertical-mobile="isVerticalMobile"
            :is-horizontal-mobile="isHorizontalMobile"
            :is-maximized="isMaximized"
            :is-desktop="isDesktop"
      ></slot>
    </template>
  </component>

</template>

<style lang="scss">

.streamingPage {

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

  // desktop
  @media (min-width: $breakpoint-md-max) {
    .streamingPage_videoCell {
      padding: 0 1.5rem;
    }
  }

  // tablet & horizontal mobile
  @media (min-width: $breakpoint-xs-max) and (max-width: $breakpoint-md-max) {
    .streamingPage_videoCell {
      padding: 0 1rem;
    }
  }

  // mobile
  @media (max-width: $breakpoint-xs-max) {
    .streamingPage_videoCell {
      padding: 0;
      max-height: 40vh;
    }
  }

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
    padding: 0.75rem 0;
    color: #ffffff;
    line-height: 3.5rem;
  }

  .streamingPage_chatWrap {
    position: absolute;
    right: 1.5rem;
    top: 3rem;
    width: 30%;
    min-width: 20rem;
    height: calc(100vh - 3rem - 2rem - 3rem);
    background: rgba(0, 0, 0, 0.3);
  }

  .streamingPage_chatWrap2 {
    width: 30%;
    min-width: 20rem;
    height: calc(100vh - 3rem - 2rem);

    //height: -webkit-fill-available;
    background: rgba(0, 0, 0, 0.3);
  }

  //@supports (-webkit-text-size-adjust:none) and (not (-ms-ime-align:auto))
  //  and (not (-moz-appearance:none))
  //{
  //
  //  .safari_only {
  //    color:#0000FF;
  //    background-color:#CCCCCC;
  //  }
  //
  //}

  ///* mobile iOS viewport bug fix */
  //@media not all and (min-resolution:.001dpcm) {
  //  @media {
  //    .streamingPage_chatWrap {
  //      height: calc(100vh - 3rem - 2rem - 3rem - 3rem);
  //    }
  //  }
  //}

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
import EventTemplateVerticalMobile from 'components/event/EventTemplateVerticalMobile.vue'
import EventTemplateHorizontalMobile from 'components/event/EventTemplateHorizontalMobile.vue'
import EventTemplateHorizontalMaximized from 'components/event/EventTemplateHorizontalMaximized.vue'
import EventTemplateDesktop from 'components/event/EventTemplateDesktop.vue'
import {useVideoPosition} from 'src/uses/useVideoPosition'

export default defineComponent({
  name: 'EventTemplateComponent',
  components: {
    EventTemplateDesktop,
    EventTemplateHorizontalMaximized,
    EventTemplateHorizontalMobile,
    EventTemplateVerticalMobile
  },
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
  setup(props) {
    const $q = useQuasar();

    // const isMobile = Boolean($q.platform.is.mobile);
    const isVertical = computed(() => $q.screen.height > $q.screen.width);

    // layout selectors
    // const isVerticalMobile = computed(() => $q.screen.xs);
    // const isHorizontalMobile = computed(() => $q.screen.sm && !props.isMaximized);
    const isVerticalMobile = computed(() => isVertical.value);
    const isHorizontalMobile = computed(() => !isVerticalMobile.value && $q.screen.lt.md && !props.isMaximized);
    const isHorizontalMaximized = computed(() => !isVerticalMobile.value && props.isMaximized);
    const isDesktop = computed(() => !isHorizontalMaximized.value && !isVerticalMobile.value && !isHorizontalMobile.value);

    const currentComponent = computed(() => {
      if (isVerticalMobile.value) return 'event-template-vertical-mobile';
      if (isHorizontalMobile.value) return 'event-template-horizontal-mobile';
      if (isHorizontalMaximized.value) return 'event-template-horizontal-maximized';
      if (isDesktop.value) return 'event-template-desktop';
      return null;
    });

    const videoPosition = useVideoPosition({
      currentComponent,
      screen: $q.screen,
      isRightWidgetShown: computed(() => props.isChatShown || props.isCalendarEnabled),
    });

    return {
      isVertical,
      isVerticalMobile,
      isHorizontalMobile,
      isHorizontalMaximized,
      isDesktop,
      currentComponent,
      videoPosition,
    }
  }
});
</script>
