<template>
  <q-page padding>
    <p v-for="n in 15" :key="n">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
    </p>

    <!-- place QPageSticky at end of page -->
    <q-page-sticky position="top-left" :offset="[0, 0]">
      <q-btn color="accent" icon="arrow_back" class="rotate-45" />
    </q-page-sticky>
    <q-page-sticky position="top" :offset="[0, 0]">
      <div style="height: 55px; width: 100vw; background-color: rgba(100, 100, 100, 0.5)">
        &nbsp;Desktop
      </div>
    </q-page-sticky>
    <q-page-sticky position="top-right" :offset="[0, 0]">
      <q-btn color="accent" icon="arrow_upward" class="rotate-45" />
    </q-page-sticky>
    <q-page-sticky position="right" :offset="[0, 0]">
      <q-btn color="accent" icon="arrow_upward" class="rotate-90" />
    </q-page-sticky>
    <q-page-sticky position="left" :offset="[0, 0]">
      <q-btn color="accent" icon="arrow_back" />
    </q-page-sticky>
    <q-page-sticky position="bottom-left" :offset="[0, 0]">
      <q-btn color="accent" icon="arrow_forward" class="rotate-135" />
    </q-page-sticky>
    <q-page-sticky position="bottom" :offset="[0, 0]">
      <q-btn color="accent" icon="arrow_forward" class="rotate-90" />
    </q-page-sticky>
    <q-page-sticky position="bottom-right" :offset="[0, 0]">
      <q-btn color="accent" icon="arrow_forward" class="rotate-45" />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useQuasar} from 'quasar'

export default defineComponent({
  // name: 'IndexPage',
  // components: { LoginFormTab, SignupFormTab },
  setup() {
    const $q = useQuasar();

    return {
      isVerticalMobile: computed(() => $q.screen.lt.sm)
    }
  }
});
</script>
