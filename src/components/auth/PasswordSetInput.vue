<template>

  <password-input
    :label="$t('signupForm_setPasswordInput')"
    :modelValue="modelValue"
    @update:modelValue="value => $emit('update:modelValue', value)"
    :rules="[value => value.length >= 8 || 'Password must contain at least 8 characters']"
  />

</template>


<script lang="ts">
import {
  defineComponent,
} from 'vue';
import PasswordInput from 'components/auth/PasswordInput.vue'

export default defineComponent({
  name: 'PasswordSetInput',

  components: {PasswordInput},

  props: {
    modelValue: String,
  },
  emits: ['update:modelValue'],

});
</script>
