<template>

  <password-input
    :label="$t('signupForm_repeatPasswordInput')"
    :modelValue="modelValue"
    @update:modelValue="value => $emit('update:modelValue', value)"
    :rules="[value => firstPassword === value || 'Passwords don\'t match']"
  />

</template>


<script lang="ts">
import {
  defineComponent,
} from 'vue';
import PasswordInput from 'components/auth/PasswordInput.vue'

export default defineComponent({
  name: 'PasswordRepeatInput',

  components: {PasswordInput},

  props: {
    modelValue: String,
    firstPassword: String,
  },
  emits: ['update:modelValue'],

});
</script>
