<template>
  <div class="row full-width q-pa-md items-center justify-evenly">
    <div class="col-md-6 col-sm-8 col-12 montserrat-700 text-center">

      <div class="text-h5 q-pb-lg text-uppercase text-ff">Forgot password</div>

      <q-form @submit="submitChangePassword">

        <email-input
          v-model="email"
        />

        <q-btn label="Send password recovery link" type="submit" color="primary"/>

      </q-form>

    </div>
  </div>
</template>

<script lang="ts">

import {
  defineComponent, ref,
} from 'vue';
import {httpApi} from 'src/services/httpApi'
import EmailInput from 'components/auth/EmailInput.vue'
import {Notify} from 'quasar'

export default defineComponent({
  name: 'ForgotPassword',

  components: {EmailInput},

  setup() {
    const email = ref('');

    const submitChangePassword = async () => {
      await httpApi.post('auth/forgotPassword', {
        email: email.value,
      });

      Notify.create({
        message: 'Password recovery link has been sent. Please check your email.',
        type: 'positive',
      });
    }

    return {
      email,
      submitChangePassword,
    }
  },

});

</script>
