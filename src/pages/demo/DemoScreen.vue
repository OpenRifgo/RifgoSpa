<template>
  <q-page-container class="rifgo-screen">
    <demo-screen-vertical-mobile v-if="isVerticalMobile"/>

    <demo-screen-horizontal-mobile v-else-if="isHorizontalMobile"/>

    <demo-screen-desktop v-else />
  </q-page-container>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useQuasar} from 'quasar'
import DemoScreenVerticalMobile from 'pages/demo/DemoScreenVerticalMobile.vue'
import DemoScreenDesktop from 'pages/demo/DemoScreenDesktop.vue'
import DemoScreenHorizontalMobile from 'pages/demo/DemoScreenHorizontalMobile.vue'

export default defineComponent({
  components: {DemoScreenHorizontalMobile, DemoScreenDesktop, DemoScreenVerticalMobile},
  // name: 'IndexPage',
  // components: { LoginFormTab, SignupFormTab },
  setup() {
    const $q = useQuasar();

    return {
      isVerticalMobile: computed(() => $q.screen.xs),
      isHorizontalMobile: computed(() => $q.screen.sm),
    }
  }
});
</script>
