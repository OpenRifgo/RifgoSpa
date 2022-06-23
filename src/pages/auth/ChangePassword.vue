<template>
  <div class="row full-width q-pa-md items-center justify-evenly">
    <div class="col-md-6 col-sm-8 col-12 montserrat-700 text-center">

      <div class="text-h5 q-pb-lg text-uppercase text-ff">Set up password</div>

      <q-form @submit="submitChangePassword">

        <password-set-input
          v-model="password"
        />

        <password-repeat-input
          v-model="repeatPassword"
          :firstPassword="password"
        />

        <q-btn label="Set new password" type="submit" color="primary"/>

      </q-form>

    </div>
  </div>
</template>

<script lang="ts">

import {
  defineComponent, onMounted, ref,
} from 'vue';
import {httpApi} from 'src/services/httpApi'
import PasswordRepeatInput from 'components/auth/PasswordRepeatInput.vue'
import PasswordSetInput from 'components/auth/PasswordSetInput.vue'
import {useRoute, useRouter} from 'vue-router'
import {Notify} from 'quasar'

export default defineComponent({
  name: 'ChangePassword',

  components: {PasswordRepeatInput, PasswordSetInput},

  setup() {
    const route = useRoute();
    const router = useRouter();

    const secret = route.params.changePasswordSecret;
    if (!secret || secret == '!') {
      Notify.create({
        message: 'Password can\'t be changed. Please use link from email',
        color: 'negative',
      });
    }

    const password = ref('');
    const repeatPassword = ref('');

    onMounted(() => {
      void router.push({
        name: 'auth-change-password',
        params: {
          changePasswordSecret: '!'
        }
      })
    });

    const submitChangePassword = async () => {
      await httpApi.post('auth/changePassword', {
        secret: secret,
        password: password.value,
      });

      Notify.create({
        message: 'Your password has been updated. You can now login.',
        color: 'positive',
      });
    }

    return {
      password,
      repeatPassword,
      submitChangePassword,
    }
  }

});

</script>
