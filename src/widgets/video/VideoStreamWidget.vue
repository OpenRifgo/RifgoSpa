<template>

<!--  <div class="videoStream_muteBtn">-->
<!--    <q-btn-->
<!--      @click="isMuted = !isMuted"-->
<!--      color="transparent"-->
<!--      :text-color="isMuted ? 'grey-4' : 'transparent'"-->
<!--      :icon="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"-->
<!--      flat dense round-->
<!--      size="xl"-->
<!--    />-->
<!--  </div>-->

<!--  -->
  <video
    :style="videoStyle"
    id="video"
    class="videoStream_video"
    autoplay
    playsinline
    :muted="isMuted"
    ref="videoRef"
  ></video>

  <!--  <div-->
  <!--    style="position: relative; margin: -100px; bottom: calc(50vh - 50px); width: calc(100% - 90px); padding: 10px"-->
  <!--    class="text-center"-->
  <!--  >-->
  <!--    <q-btn-->
  <!--      @click="isMuted = !isMuted"-->
  <!--      color="transparent"-->
  <!--      text-color="black"-->
  <!--      icon="far fa-play-circle"-->
  <!--      flat dense round-->
  <!--      size="xl"-->
  <!--    />-->
  <!--  </div>-->

</template>

<style>
.auth_tabs .q-tab__label {
  color: #1D1D1D;
}

.videoStream_muteBtn {
  position: absolute;
  z-index: 100;
  bottom: 20px;
  left: 10px
}

.videoStream_video {
  max-height: calc(100vh - 3rem - 2rem - 3rem - 0.5rem);
  width: 100%;
  min-height: 100%;
  border-radius: 0.5rem;
  /* mobile viewport bug fix */
  /*height: -webkit-fill-available;*/
}


.OT_fit-mode-cover video.OT_video-element {
  object-fit: contain !important;
}

</style>

<script lang="ts">
import {computed, defineComponent, onMounted, ref} from 'vue';
import Hls from 'hls.js'

export default defineComponent({
  name: 'VideoStreamWidget',
  components: {},
  props: {
    event: {
      type: Object,
    },
    isMuted: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    // const route = useRoute();
    // const regSecret = computed(() => String(route.params.regSecret));
    const videoRef = ref<HTMLMediaElement | null>(null);

    onMounted(() => {
      // const response = await api.get<{ event: IEvent }>(`/api/public/event?regSecret=${regSecret.value}`);
      // const event = response.data.event

      // const broadcastData = await httpApi.get<{
      //   broadcast: {
      //     sourceUrl: string
      //   }
      // }>('/video/broadcast-client-data', {
      //   params: {
      //     eventId: event.id,
      //   },
      // });

      const streamingBroadcastLink = String(props.event?.streamingBroadcastLink);

      const video = videoRef.value
      if (!video) {
        console.error('#video ref not found!')
        return
      }

      if (Hls.isSupported()) {
        const hls = new Hls();
          hls.loadSource(streamingBroadcastLink);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, function () {
            void video.play();
          });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = streamingBroadcastLink;
        video.addEventListener('loadedmetadata', function() {
          void video.play();
        });
      }
    });

    const videoStyle = computed(() => {
      return {
        'background-color': (props.event?.streamingBroadcastLink === 'blue') ? '#0000FF' : undefined,
      }
    });

    return {
      videoRef,
      videoStyle,
    }
  },
});
</script>
