<template>
  <q-page class="q-pa-lg bg-grey-1 row items-center justify-between">
    <div class="q-mb-md col-12 text-center">
      <div>
        <rifgo-btn
          label="Default button"
        />
      </div>

      <div>
        <rifgo-btn
          flat
          label="Flat button"
        />
      </div>

      <div>
        <rifgo-btn
          outline
          label="Outline button"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import RifgoBtn from 'components/custom/RifgoBtn.vue'

export default defineComponent({
  components: {RifgoBtn},
});
</script>
