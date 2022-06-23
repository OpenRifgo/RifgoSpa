<template>
  <div></div>
</template>

<script>
import OT from '@opentok/client';
export default {
  name: 'VonageSession',
  props: {
    stream: {
      type: OT.Stream,
      required: true
    },
    session: {
      type: OT.Session,
      required: true
    },
    opts: {
      type: Object,
      required: false
    }
  },
  mounted: function() {
    const subscriber = this.session.subscribe( // eslint-disable-line
      this.stream,
      this.$el,
      this.opts,
      err => {
        if (err) {
          this.$emit('error', err); // eslint-disable-line
        } else {
          this.$emit('subscriberConnected', subscriber); // eslint-disable-line
        }
      }
    );

    this.$emit('subscriberCreated', subscriber); // eslint-disable-line @typescript-eslint/no-unsafe-call
  }
};
</script>
