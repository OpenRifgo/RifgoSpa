<template>
  <div
    id="session"
    @error="errorHandler"
    style="max-width: 100%; height: 100%"
  >
    <vonage-publisher
      @error="errorHandler"
      :api-key="apiKey"
      :session-id="sessionId"
      :token="token"
      :opts="{
        resolution: '1280x720',
      }"
      ref="vonagePublisherRef"
    ></vonage-publisher>
<!--    <publisher :session="session" @error="errorHandler"></publisher>-->
<!--    <div id="subscribers" v-for="stream in streams" :key="stream.streamId">-->
<!--      <subscriber @error="errorHandler" :stream="stream" :session="session"></subscriber>-->
<!--    </div>-->
  </div>
</template>

<style>
.OT_publisher {
  width: 100% !important;
  height: 100% !important;
}
</style>

<script lang="ts">
import VonagePublisher from 'components/vonage/VonagePublisher.vue';
import {computed, defineComponent, ref} from 'vue';
import {ComputedRef} from '@vue/reactivity'
import {onUnmounted} from '@vue/runtime-core'

const errorHandler = (err: {message: string}) => {
  alert(err.message); // eslint-disable-line
};
export default defineComponent({
  name: 'VonageSession',
  components: { VonagePublisher },
  props: {
    apiKey: {
      type: Number,
      // default: process.env.VUE_APP_API_KEY
    },
    sessionId: {
      type: String,
      // default: process.env.VUE_APP_SESSION_ID
    },
    token: {
      type: String,
      // default: process.env.VUE_APP_TOKEN
    }
  },
  // created() {
  //   this.session = OT.initSession(this.apiKey, this.sessionId);
  //   this.session.connect(this.token, err => {
  //     if (err) {
  //       errorHandler(err);
  //     }
  //   });
  //   this.session.on('streamCreated', event => {
  //     this.streams.push(event.stream);
  //   });
  //   this.session.on('streamDestroyed', event => {
  //     const idx = this.streams.indexOf(event.stream);
  //     if (idx > -1) {
  //       this.streams.splice(idx, 1);
  //     }
  //   });
  // },
  data: () => ({
    streams: [],
    session: null
  }),
  methods: {
    errorHandler
  },
  setup() {
    const vonagePublisherRef = ref<InstanceType<typeof VonagePublisher>>();

    const screenShare = () => {
      // eslint-disable-next-line
      vonagePublisherRef.value?.screenShare();
    }

    const stopScreenSharing = () => {
      // eslint-disable-next-line
      vonagePublisherRef.value?.stopScreenSharing();
    }

    onUnmounted(() => {
      // eslint-disable-next-line
      vonagePublisherRef.value?.unmount();
    })

    // eslint-disable-next-line
    const isScreenShared: ComputedRef<Boolean> = computed(() => Boolean(vonagePublisherRef.value?.isScreenShared));

    return {
      vonagePublisherRef,
      screenShare,
      stopScreenSharing,
      isScreenShared,
    }
  }
});
</script>

<style>
.OT_subscriber {
  float: left;
}
.OT_publisher {
  float: left;
}
</style>
