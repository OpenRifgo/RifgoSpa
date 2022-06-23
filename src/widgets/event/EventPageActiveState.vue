<template>
  <event-template-component
    v-if="event"
    :is-chat-shown="isChatShown"
    :is-calendar-enabled="calendarSettings.enabled"
    :is-maximized="fullscreen.isFullscreen.value"
    v-model:is-left-menu-shown="isLeftMenuShown"
  >
    <template v-slot:name>
      <slot name="name">
        {{ event.name }}
        <q-badge
          v-if="isCurrentUserModerator"
          label="Moderator"
          class="q-ml-sm"
        />
      </slot>
    </template>

    <template v-slot:next-event-btn="slotProps">
      <div
        :style="nextEventStyle(false, true)"
      >
        <q-btn
          v-if="eventSettings.myLinks.value.enabled"
          color="white-semi-transparent"
          text-color="black"
          size="1.15rem"
          rounded
          no-caps
          style="border-radius: 2rem"
          @click="onMyLinksClick"
        >
          <q-img
            v-if="event.speakers && event.speakers[0] && event.speakers[0].img"
            :src="event.speakers[0].img"
          />
          {{ eventSettings.myLinks.value.text }}
        </q-btn>

        <custom-buttons
          :buttons="eventSettings.leftTop"
          :is-desktop="slotProps.isDesktop"
          :is-maximized="slotProps.isMaximized"
          @paidQuestionClick="onCustomPaidQuestion"
        />
      </div>
    </template>

    <template v-slot:overlay="slotProps">
      <div
        v-if="eventSettings.overlayLeftBottom"
        style="position: absolute; bottom: 0"
        class="q-pa-md"
      >
        <custom-buttons
          :buttons="eventSettings.overlayLeftBottom"
          :is-desktop="slotProps.isDesktop"
          :is-maximized="slotProps.isMaximized"
          @paidQuestionClick="onCustomPaidQuestion"
        />
      </div>
    </template>

    <template v-slot:video>
      <video-stream-widget
        :event="event"
        :is-muted="!!isMuted"
      />
    </template>

    <template v-slot:menu-left="slotProps">
      <div class="inline-block">
        <event-counter-widget
          v-if="event && event.id"
          :event-id="event.id"
        />
      </div>

      <div class="q-pa-sm inline-block"></div>

      <custom-buttons
        :buttons="eventSettings.leftBottom"
        :is-desktop="slotProps.isDesktop"
        :is-maximized="slotProps.isMaximized"
        @paidQuestionClick="onCustomPaidQuestion"
      />

      <template v-if="eventSettings.raw.calendar?.url">
        <q-btn
          v-if="slotProps.isDesktop || slotProps.isMaximized"
          text-color="white"
          size="1.15rem"
          rounded
          no-caps
          class="q-ml-sm"
          :outline="!isChatShown"
          :style="{'border-radius': '2rem', 'background-color': isChatShown ?  '#615DFF' : '#000000'}"
          @click="showCalendar"
        >
          Book a Session
        </q-btn>

        <q-btn
          v-else
          flat dense round size="lg"
          class="q-mx-sm"
          :style="{'background-color': '#414141'}"
          @click="showCalendar"
        >
          📅
          <q-tooltip>Calendar</q-tooltip>
        </q-btn>
      </template>

      <configurable-bottom-left-menu
        :settings="event.settings"
        :is-desktop="slotProps.isDesktop"
        :is-maximized="slotProps.isMaximized"
        @donateClick="onDonateClick"
      />

      <!--      <q-btn v-if="slotProps.isHorizontalMobile"-->
      <!--             flat dense round size="lg"-->
      <!--             :icon="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"-->
      <!--             class="q-my-md q-mx-sm"-->
      <!--             :class="{'bg-grey-9': !isMuted, 'bg-red': isMuted}"-->
      <!--             @click="isMuted = !isMuted"-->
      <!--      >-->
      <!--        <q-tooltip>Mute</q-tooltip>-->
      <!--      </q-btn>-->

      <!--      <q-btn v-if="slotProps.isHorizontalMobile"-->
      <!--             flat dense round size="lg"-->
      <!--             class="q-my-md q-mx-sm bg-grey-9"-->
      <!--             :class="{streamingPage_btn_isActive: isChatShown}"-->
      <!--             icon="chat_bubble"-->
      <!--             @click="isChatShown = !isChatShown"-->
      <!--      >-->
      <!--        <q-tooltip>Chat</q-tooltip>-->
      <!--      </q-btn>-->

    </template>

    <template v-slot:menu-center="slotProps">

      <configurable-bottom-center-menu
        :settings="event.settings"
        :is-desktop="slotProps.isDesktop"
        :is-maximized="slotProps.isMaximized"
        @donateClick="onDonateClick"
      />

      <q-btn v-if="!slotProps.isMaximized"
             flat dense round size="lg"
             :icon="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"
             class="q-my-md q-mx-sm"
             :class="{'bg-grey-9': !isMuted, 'bg-red': isMuted}"
             @click="isMuted = !isMuted"
      >
        <q-tooltip>Mute</q-tooltip>
      </q-btn>

      <q-btn v-if="slotProps.isDesktop || slotProps.isHorizontalMobile"
             flat dense round size="lg"
             class="q-my-md q-mx-sm bg-grey-9"
             :class="{streamingPage_btn_isActive: isChatShown}"
             icon="chat_bubble"
             @click="isChatShown = !isChatShown"
      >
        <q-tooltip>Chat</q-tooltip>
      </q-btn>

      <q-btn v-if="false & !$q.platform.is.ios && !slotProps.isVerticalMobile"
             flat dense round size="lg"
             :icon="fullscreen.isFullscreen.value ? 'fullscreen_exit' : 'fullscreen'"
             class="q-my-md q-mx-sm bg-grey-9"
             :class="{streamingPage_btn_isActive: fullscreen.isFullscreen.value}"
             @click="fullscreen.toggle()"
      >
        <q-tooltip>Fullscreen</q-tooltip>
      </q-btn>
      <!-- reverse: fullscreen_exit -->

      <q-btn v-if="!slotProps.isMaximized && false && clipboard.isSupported"
             flat dense round size="lg"
             class="q-my-md q-mx-sm bg-grey-9"
             icon="share"
             @click="onShare"
      >
        <q-tooltip>Share</q-tooltip>
      </q-btn>
    </template>

    <template v-slot:menu-right>
      <div v-if="false"
           class="col streamingPage_eventTimer"
      >
        00 : 00 : 00
      </div>
    </template>

    <template v-slot:chat>
      <event-chat-widget
        v-if="event && event.id"
        :event-id="event.id"
        :streamer-id="event.userId"
      />
    </template>

    <template v-slot:chat-messages>
      <event-chat-messages-widget
        v-if="event && event.id"
        :event-id="event.id"
        :streamer-id="event.userId"
        @avatarClicked="onMessageAvatarClicked"
      />
    </template>

    <template v-slot:calendar>
      <calendly-widget
        v-if="calendarSettings.enabled"
        :calendar-url="calendarSettings.url"
      />
    </template>

    <template v-slot:chat-send>
      <event-chat-send-widget
        v-if="event && event.id"
        :event-id="event.id"
      />
    </template>

    <template v-slot:left-menu>

      <!--      <next-events-component-->
      <!--        v-if="isNextEventShown"-->
      <!--        :event="event"-->
      <!--        @finished="isNextEventShown = false"-->
      <!--      />-->
      <div v-if="isMyLinksShown" style="padding-left: 24px; padding-right: 24px">
        <curtain-component :secret="regSecret">
          <template v-slot:donate>
            <donate-menu-component
              :event="event"
              :event-registration="eventRegistration"
              :screen-name="screenName"
            />
          </template>
        </curtain-component>
      </div>

      <donate-menu-component
        v-else-if="isDonateShown"
        :event="event"
        :event-registration="eventRegistration"
        :screen-name="screenName"
        :price="donateConfig.price"
        :title="donateConfig.title"
        :action-text="donateConfig.actionText"
        :comment-input-placeholder="donateConfig.commentInputPlaceholder"
        :donation-text="donateConfig.donationText"
        :donate-config="donateConfig"
      />

    </template>

    <!--    <template v-slot:unmute-modal>-->

    <!--    </template>-->
  </event-template-component>

  <q-dialog ref="dialogRef" @hide="onDialogHide">

    <q-card class="q-dialog-plugin finish-modal">
      <q-card-section>
        <q-icon tag="div" size="20px" name="fas fa-volume-mute" class="unmute-icon"></q-icon>
        <h2>
          Streaming is muted by default
        </h2>
        <p>
          Please click the button to turn on <br>
          the sound of the stream
        </p>
      </q-card-section>
      <q-card-actions align="between">
        <q-btn no-caps label="Cancel" @click="onCancelClick"
               style="margin-left: 16px; color: #4D4D4D" flat
        />
        <q-btn color="primary" no-caps @click="onOKClick"
               style="margin-right: 16px; padding: 12px 24px; border-radius: 6px; margin-bottom: 16px"
        >
          <q-icon
            size="17px"
            name="fas fa-volume-up"
            color="white"
            style="margin-left: 3px"
          />
          <span style="margin-left: 7px;">Unmute</span>
        </q-btn>
      </q-card-actions>
    </q-card>
    <!--    <q-btn v-if="isUnmuteModalShown"-->
    <!--           dense round flat-->
    <!--           icon="close"-->
    <!--           color="grey"-->
    <!--           class="q-ma-sm"-->
    <!--           @click="isUnmuteModalShown = false"-->
    <!--           style="position: relative; z-index: 6001; left: -31px; top: -170px"-->
    <!--    />-->
  </q-dialog>

  <q-dialog
    v-model="isMessageDialogShown"
    full-height
    full-width
  >
    <chat-message-moderation-widget
      :chat-message="messageDialogData"
    />
  </q-dialog>
</template>

<style lang="scss">

.streamingPage {

  .streamingPage_btn_isActive {
    background-color: #007AFF !important;
  }

  .streamingPage_eventTimer {
    text-align: right;
    font-size: 1.25rem;
    margin: 0 1.5rem;
    padding: 0.75rem 0;
    line-height: 3rem;
  }

  .streamingPage_donateBtn {
    background-color: #FE4B67 !important;
    border-radius: 1.5rem !important;
  }
}

.finish-modal {
  width: 320px;
  border: 0.5px solid #E5E5E5;
  border-radius: 12px !important;

  .unmute-icon {
    background-color: #FF453A;
    color: white;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin: 40px auto 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  h2 {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    /* identical to box height, or 120% */
    text-align: center;
    color: #333333;
    margin-top: 24px;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #4D4D4D;
  }
}

</style>

<script lang="ts">
import {computed, defineComponent, onMounted, PropType, provide, reactive, ref} from 'vue';
import VideoStreamWidget from '../video/VideoStreamWidget.vue'
import EventChatWidget from '../chat/EventChatWidget.vue'
import EventCounterWidget from '../counter/EventCounterWidget.vue'
import {useFullscreen} from '@vueuse/core'
import {useClipboard} from '@vueuse/core'
import {Notify, useQuasar, useDialogPluginComponent} from 'quasar'
import EventTemplateComponent from 'components/event/EventTemplateComponent.vue'
import {env} from 'src/services/Env'
import DonateMenuComponent from 'components/event/DonateMenuComponent.vue'
import {IEventPublic, IEventRegistration} from 'src/models/EventModels'
import {stateScreenName} from 'src/uses/useScreenName'
import EventChatMessagesWidget from 'src/widgets/chat/EventChatMessagesWidget.vue'
import EventChatSendWidget from 'src/widgets/chat/EventChatSendWidget.vue'
import {IChatMessage} from 'src/modules/chat/chatModels'
import ChatMessageModerationWidget from 'src/widgets/moderation/ChatMessageModerationWidget.vue'
import {getChatMe} from 'src/api/chatRequests'
import CurtainComponent from 'components/event/CurtainComponent.vue';
import {useRoute} from 'vue-router';
import {useEventDonate} from 'src/uses/useEventDonate'
import ConfigurableBottomLeftMenu from 'components/event/ConfigurableBottomLeftMenu.vue'
import ConfigurableBottomCenterMenu from 'components/event/ConfigurableBottomCenterMenu.vue'
import CalendlyWidget from 'components/widgets/CalendlyWidget.vue'
import refWithDefaultRef from 'src/uses/refWithDefaultRef'
import useEventSettings from 'src/uses/useEventSettings'
import CustomButtons from 'components/event/CustomButtons.vue'
import {IDonateConfig} from 'components/models'

export default defineComponent({
  name: 'EventPageActiveState',
  components: {
    CustomButtons,
    CalendlyWidget,
    ConfigurableBottomCenterMenu,
    ConfigurableBottomLeftMenu,
    CurtainComponent,
    ChatMessageModerationWidget,
    EventChatSendWidget,
    EventChatMessagesWidget,
    DonateMenuComponent,
    EventTemplateComponent, EventCounterWidget, EventChatWidget,
    VideoStreamWidget,
  },
  props: {
    eventId: {
      type: Number,
    },
    event: {
      type: Object as PropType<IEventPublic>,
    },
    eventRegistration: {
      type: Object as PropType<Partial<IEventRegistration>>,
      required: true,
    },
  },
  emits: [
    // REQUIRED
    'ok', 'hide',
  ],
  setup(props, {emit}) {
    onMounted(async () => {
      if (isMuted.value) {
        show()
        isUnmuteModalShown.value = true
      }

      const registrationSecret = props.eventRegistration.secret
      if (registrationSecret) {
        await loadChatMe(registrationSecret);
      }
    });

    const eventSettings = useEventSettings(computed(() => props.event?.settings));

    const {dialogRef, onDialogHide, onDialogOK, onDialogCancel} = useDialogPluginComponent()
    const isUnmuteModalShown = ref(false);
    // following method is REQUIRED
    // (don't change its name --> "show")
    const show = () => {
      if (dialogRef.value) dialogRef.value.show()
    };

    // following method is REQUIRED
    // (don't change its name --> "hide")
    const hide = () => {
      if (dialogRef.value) {
        dialogRef.value.hide()
        isUnmuteModalShown.value = false
      }
    };

    const onOKClick = () => {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      emit('ok')
      // or with payload: this.$emit('ok', { ... })
      isMuted.value = false
      // then hiding dialog
      hide()
    };

    const onCancelClick = () => {
      // we just need to hide the dialog
      hide()
    }

    const $q = useQuasar();
    const regSecret = computed(() => String(useRoute().params.regSecret))
    const isMuted = ref(true);

    const isChatShown = refWithDefaultRef(
      computed(() => props.event?.settings?.initOpenedChat),
      false,
    );

    const isCalendarShown = refWithDefaultRef(
      computed(() => props.event?.settings?.initOpenedChat),
      false,
    );

    provide('isCalendarShown', isCalendarShown);

    const fullscreen = useFullscreen();
    const clipboard = useClipboard();
    const screenName = stateScreenName()
    const rootElRef = ref<HTMLElement | null>(null);

    const onShare = async () => {
      await clipboard.copy(env.appAddress);

      Notify.create({
        type: 'positive',
        message: 'Share link is copied to the clipboard',
        icon: 'share',
        badgePosition: 'bottom-left',
        position: 'top',
        // closeBtn: true,
      })
    }

    const isDonateShown = ref(false);
    const donateConfig = reactive<IDonateConfig>({
      price: null,
      title: null,
      actionText: null,
      commentInputPlaceholder: null,
      donationText: null,
      textarea: true,
      private: false,
    });

    const {onDonateClick} = useEventDonate({
      $q,
      isDonateShown,
      screenName: stateScreenName(),
    });

    const onCustomPaidQuestion = (data: IDonateConfig) => {
      onDonateClick();

      Object.assign(donateConfig, data)
    }

    const isNextEventShown = ref(false);
    const isMyLinksShown = ref(false);

    const onMyLinksClick = () => {
      isMyLinksShown.value = true;
    }

    const isLeftMenuShown = computed({
      get() {
        // left menu is shown either for donates or next events
        // return isDonateShown.value || isNextEventShown.value;
        return isDonateShown.value || isMyLinksShown.value;
      },
      set(val) {
        if (!val) {
          // set both hidden when closed from component via setter
          isDonateShown.value = false;
          // isNextEventShown.value = false;
          isMyLinksShown.value = false;
        } else {
          // component only close, doesn't initiate show
          console.error('unexpected left menu show via setter');
        }
      },
    })
    const isHorizontalComp = ref(false)
    const nextEventStyle = (isVertical: boolean, isHorizontal: boolean) => {
      isHorizontalComp.value = isHorizontal
      if (isVertical) return 'position: absolute; z-index: 2000; top: 8px; left: 16px;'
      if (isHorizontal) return ''
      return '"position: absolute; z-index: 2000; top: 3.5rem; left: 2rem;"'
    }

    const isMessageDialogShown = ref(false);
    const messageDialogData = ref<IChatMessage | null>(null);

    const isCurrentUserModerator = ref<boolean | null>(null);

    const loadChatMe = async (registrationSecret: string) => {
      const response = await getChatMe(registrationSecret);
      isCurrentUserModerator.value = response.isModerator;
    }

    const onMessageAvatarClicked = (message: IChatMessage) => {
      // open dialog if user is moderator check moderator
      if (isCurrentUserModerator.value) {
        isMessageDialogShown.value = true;
        messageDialogData.value = message;
      }
    };

    const calendarSettings = computed(() => {
      const calendar = props.event?.settings?.calendar || {};
      return {
        enabled: Boolean(calendar.url),
        ...calendar,
      }
    });

    const showCalendar = () => {
      isChatShown.value = false;
      isCalendarShown.value = true;
    };

    return {
      $q,

      rootElRef,
      regSecret,
      fullscreen,
      clipboard,
      isMuted,
      isChatShown,
      isDonateShown,
      donateConfig,
      isMyLinksShown,
      isNextEventShown,
      isLeftMenuShown,
      isMessageDialogShown,
      isCurrentUserModerator,
      messageDialogData,
      calendarSettings,

      elements: {
        showDonate: false, // always enabled at the moment; todo: configuration from backend
      },
      onDonateClick,
      onMyLinksClick,
      onShare,
      screenName,
      eventSettings,
      onCustomPaidQuestion,

      dialogRef,
      show,
      hide,
      onDialogHide,
      onDialogOK, onDialogCancel,
      onOKClick,
      onCancelClick,
      isUnmuteModalShown,
      isHorizontalComp,
      nextEventStyle,
      onMessageAvatarClicked,
      showCalendar,
    }
  },
});
</script>
