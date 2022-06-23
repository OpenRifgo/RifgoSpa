<template>

  <q-list
    v-for="(speaker, i) of [speaker]"
    v-bind:key="i"
  >
    <q-item :class="withPadding ? '' : 'without-padding'">
      <q-item-section
        v-if="speaker.avatarUrl"
        avatar
      >
        <q-avatar size="48px">
          <q-img
            :src="speaker.avatarUrl"
            placeholder-src="~assets/profile_avatar_placeholder_large.png"
            :ratio="1"
            fit="cover"
          />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-bold">{{ speaker.name }}</q-item-label>
        <q-item-label caption>{{ speaker.title }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>

</template>

<script lang="ts">

import {defineComponent, PropType} from 'vue'

export default defineComponent({
  name: 'SpeakerComponent',
  props: {
    speaker: {
      type: Object as PropType<{ name: string, title: string, avatarUrl: string }>,
    },
    withPadding: {
      type: Boolean,
      default: true
    },

  },
});

</script>

<style lang="scss">
.without-padding {
  padding: 0;
}

</style>
