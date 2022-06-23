<template>
  <q-page>

    <div style="width: 50vw; margin-left: 50vw;">

      <p v-for="n in 15" :key="n">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
      </p>

      <div
        style="height: 48px;"
      >
        <!-- spacer for "message" -->
      </div>

    </div>

    <q-page-sticky position="top-left">
      <div style="width: 50vw" class="bg-black text-white">

        <div style="height: 32px; line-height: 32px">
          Horizontal Mobile
        </div>

      </div>
    </q-page-sticky>

    <q-page-sticky position="left">
      <div style="width: 50vw" class="bg-black text-white">

        <q-responsive :ratio="16/9" class="bg-grey">

        </q-responsive>

      </div>
    </q-page-sticky>

    <q-page-sticky position="bottom-left">
      <div style="width: 50vw" class="bg-black text-white">

        <div style="height: 32px; line-height: 32px">
          <q-btn label="Label" color="blue" size="sm" />
        </div>

      </div>
    </q-page-sticky>

    <q-page-sticky position="bottom-right">
      <div class="bg-black" style="width: 50vw; height: 48px; line-height: 48px">
        <q-input
          label="message"
          v-model="message"
          dark
        />
      </div>
    </q-page-sticky>

  </q-page>
</template>


<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {useQuasar} from 'quasar'

export default defineComponent({
  setup() {
    const $q = useQuasar();

    return {
      isVerticalMobile: computed(() => $q.screen.lt.sm),
      message: ref('')
    }
  }
});
</script>
