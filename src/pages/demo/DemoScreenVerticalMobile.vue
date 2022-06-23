<template>
  <q-page>
    <q-responsive
      :ratio="16/9"
      class="bg-grey"
      style="padding-top: 32px;"
    >
      <!-- spacer for video -->
    </q-responsive>

    <p v-for="n in 15" :key="n">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
    </p>

    <div
      style="height: 48px;"
    >
      <!-- spacer for "message" -->
    </div>

    <q-page-sticky position="top" :offset="[0, 0]">
      <div style="width: 100vw" class="bg-black text-white">

        <div style="height: 32px; line-height: 32px">
          Vertical Mobile
        </div>

        <q-responsive :ratio="16/9" class="bg-grey">

        </q-responsive>

      </div>
    </q-page-sticky>

    <q-page-sticky position="bottom" :offset="[0, 0]">
      <div class="bg-black" style="width: 100vw; height: 48px; line-height: 48px">
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
import {defineComponent, ref} from 'vue';

export default defineComponent({
  // components: { LoginFormTab, SignupFormTab },
  setup() {
    return {
      message: ref('')
    }
  }
});
</script>
