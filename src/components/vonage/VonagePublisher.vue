<template>
  <div ref="refRoot"></div>
</template>

<script>
/* eslint-disable */

import OT from '@opentok/client';
import {computed, defineComponent, onMounted, ref} from 'vue';
import {globalPublisher, useVideoSession, useVideoSessionFactory} from "src/uses/useVideoSession";

let session = null;

export default defineComponent({
  name: 'VonagePublisher',
  // props: {
  //   session: {
  //     type: OT.Session,
  //     required: false
  //   },
  //   opts: {
  //     type: Object,
  //     required: false
  //   }
  // },

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
    },
    opts: {
      type: Object,
      required: false,
      default: () => ({
        // resolution: '1280x720',
      })
    }
  },

  setup(props) {
    const refRoot = ref(null)
    const screenSharePublisher = ref();
    const videoPublisher = ref();

    onMounted(() => {
      const videoSession = useVideoSessionFactory({
        apiKey: String(props.apiKey),
        sessionId: props.sessionId,
        token: props.token,
      });
      session = videoSession.session;

      // const publisher = OT.initPublisher(refRoot.value, props.opts, err => {
      if (globalPublisher.publisher) {
        // avoid doubling screens in broadcast
        globalPublisher.publisher.destroy();
      }
      globalPublisher.publisher = OT.initPublisher(refRoot.value, props.opts, err => {
        if (err) {
          console.error(err)
          // this.$emit('error', err);
        } else {
          console.log('publisherCompleted');
          // this.$emit('publisherCompleted');
        }
      });

      console.log('publisherCreated', globalPublisher.publisher);
      // this.$emit('publisherCreated', publisher);
      const publish = () => {
        session.publish(globalPublisher.publisher, err => { // eslint-disable-line
          if (err) {
            console.error(err)
            // this.$emit('error', err);
          } else {
            videoPublisher.value = globalPublisher.publisher;
            console.log('publisherConnected', globalPublisher.publisher);
            // this.$emit('publisherConnected', publisher);
          }
        });
      };

      if (session && session.isConnected()) { // eslint-disable-line
        publish();
      }
      if (session) {
        session.on('sessionConnected', publish);
      }

    });

    const screenShare = () => {
      OT.checkScreenSharingCapability(function(response) {
        if(!response.supported || response.extensionRegistered === false) {
          // This browser does not support screen sharing.
        } else if (response.extensionInstalled === false) {
          // Prompt to install the extension.
        } else {
          // Screen sharing is available. Publish the screen.
          const publisher = OT.initPublisher('screen-preview',
            {videoSource: 'screen', resolution: '1280x720'},
            function(error) {
              if (error) {
                // Look at error.message to see what went wrong.
              } else {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                session.publish(publisher, function(error) {
                  screenSharePublisher.value = publisher;

                  if (error) {
                    // Look error.message to see what went wrong.
                  }
                });
              }
            }
          );
        }
      });
    }

    const stopScreenSharing = () => {
      if (screenSharePublisher.value) {
        screenSharePublisher.value.destroy();
        screenSharePublisher.value = null;
      }
    }

    const isScreenShared = computed(() => Boolean(screenSharePublisher.value));

    const unmount = () => {
      videoPublisher.value.destroy();
      videoPublisher.value = null;
    }

    return {
      refRoot,

      isScreenShared,

      screenShare,
      stopScreenSharing,
      unmount,
    }
  }
});

/*

    OT.checkScreenSharingCapability(response => {
      if (!response.supported || response.extensionRegistered === false) {
        alert("Screen sharing not supported");
      } else if (response.extensionInstalled === false) {
        alert("Browser requires extension");
      } else {
        // Share screen code

        const screenSharePublisher = OT.initPublisher(
          "screen",
          {
            insertMode: "append",
            width: "100%",
            height: "100%",
            videoSource: "screen",
            publishAudio: true
          },
          () => ({})
        );
        this.session.publish(screenSharePublisher, handleCallback);

      }
    });

 */

/* eslint-enable */
</script>
