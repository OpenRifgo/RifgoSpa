<template>
  <div class="fullscreen text-center q-pa-md flex flex-center justify-between"
       style="flex-direction: column;">
    <div class="text-left full-width">
      <img
        style="width: 150px; height: auto"
        src="~assets/logo/Rifgo-Logo-Colorfull-Light-BG.svg"
      />
    </div>

    <div>
      <div style="font-size: 10vh; font-weight: 600; font-family: 'Source Sans Pro', sans-serif; color: #222222;">
        404
      </div>

      <div class="text-h2" style="font-size: 3vh; line-height: 3vh; color: #222222;">
        Sorry, the content you’re looking for doesn’t exist.<br />
        Either it was removed, or you mistyped the link.
      </div>

      <q-btn
        class="q-mt-xl"
        color="primary"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>

    <div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Error404'
})
</script>
