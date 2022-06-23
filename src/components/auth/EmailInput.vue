<template>

  <q-input
    v-model="value"
    outlined
    class="q-pb-md"
    :label="$t('email')"
    type="email"
    lazy-rules
    :rules="[value => helpers.validateEmail(value) || 'Please enter valid email']"
  />

</template>


<script lang="ts">
import {
  defineComponent,
} from 'vue';
import {validateEmail} from '../../lib/helpers'

export default defineComponent({
  name: 'EmailInput',

  props: {
    modelValue: String,
  },
  emits: ['update:modelValue'],

  computed: {
    value: {
      get(): string {
        return this.modelValue as string
      },
      set(value: string) {
        this.$emit('update:modelValue', value)
      }
    }
  },

  setup() {
    return {
      helpers: {
        validateEmail
      },
    }
  }

});
</script>
