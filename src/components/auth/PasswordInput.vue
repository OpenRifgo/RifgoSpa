<template>

  <q-input
    v-model="value"
    outlined
    class="q-pb-md"
    :label="$t('password')"
    :type="isPwd ? 'password' : 'text'"
    :rules="rules"
    lazy-rules
  >
    <template v-slot:append>
      <q-icon
        :name="isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
      />
    </template>
  </q-input>

</template>


<script lang="ts">
import {
  defineComponent,
} from 'vue';

export default defineComponent({
  name: 'PasswordInput',

  props: {
    modelValue: String,
    rules: Array,
  },
  emits: ['update:modelValue'],

  data() {
    return {
      isPwd: true,
    }
  },

  computed: {
    value: {
      get(): string {
        return this.modelValue as string
      },
      set(value: string) {
        this.$emit('update:modelValue', value)
      }
    }
  }
});
</script>
