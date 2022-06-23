<template>
  <div
    v-if="provider === 'calendly'"
    class="calendly-inline-widget"
    :data-url="calendarUrl"
  ></div>

  <div
    v-else-if="provider === 'roionline'"
    class="roionline-inline-widget meetings-iframe-container"
    :data-src="`${calendarUrl}?embed=true`"
  ></div>
</template>

<style>
.calendly-inline-widget {
  width: 100%;
  height: 100vh;
}

.roionline-inline-widget {
  width: 100%;
  height: 100vh;
  overflow-x: scroll;
  overflow-y: scroll;
}

</style>

<script>
export default {
  props: {
    calendarUrl: {
      type: String,
    }
  },
  computed: {
    provider() {
      return String(this.calendarUrl)
        .split('/')[2]
        .replace(/^www\./, '')
        .replace(/\.com$/, '');
    }
  },
  mounted() {
    console.log('provider', this.provider);

    if (this.provider === 'calendly') {
      const scriptElement = document.createElement('script');
      scriptElement.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js')
      document.head.appendChild(scriptElement);
    } else if (this.provider === 'roionline') {
      const scriptElement = document.createElement('script');
      scriptElement.setAttribute('src', 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js')
      document.head.appendChild(scriptElement);
    }
  }
}
</script>
