<template>

  <q-page-container
    class="streamingPage rifgo-screen bg-black event-horizontal-mobile"
  >
    <q-page>

      <q-page-sticky position="left">
        <div style="width: 100vw" class="bg-black text-white">

          <q-responsive :ratio="16/9">
            <slot name="video"
                  :is-vertical-mobile="false"
                  :is-horizontal-mobile="true"
            ></slot>
          </q-responsive>

        </div>
      </q-page-sticky>

      <q-page-sticky position="bottom-left" style="z-index: 7000">
        <div style="width: 100vw">

          <div style="height: 32px; line-height: 32px">

            <div class="row absolute-bottom">
              <div class="col streamingPage_menuLeft text-left">
                <slot name="menu-left"
                      :is-vertical-mobile="false"
                      :is-horizontal-mobile="true"
                      :is-maximized="true"
                ></slot>
              </div>

              <div class="col-auto text-white text-center streamingPage_bottomButtons">
                <slot name="menu-center"
                      :is-vertical-mobile="false"
                      :is-horizontal-mobile="true"
                      :is-maximized="true"
                ></slot>
              </div>

              <div class="col text-white">
                <slot name="menu-right"
                      :is-vertical-mobile="false"
                      :is-horizontal-mobile="true"
                      :is-maximized="true"
                >&nbsp;</slot>
              </div>
            </div>

          </div>

        </div>
      </q-page-sticky>

    </q-page>
  </q-page-container>

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

export default defineComponent({
  props: {
    name: {
      type: String,
      default: '',
    },
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
