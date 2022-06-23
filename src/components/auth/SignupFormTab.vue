<template>
  <q-form @submit="signUp">
    <div>
      <email-input
        v-model="email"
      />

      <password-set-input
        v-model="password"
      />

      <password-repeat-input
        v-model="repeatPassword"
        :firstPassword="password"
      />
    </div>

    <div>
      <q-btn
        color="primary"
        :label="$t('signupForm_submitBtn')"
        class="full-width q-pa-md"
        no-caps
        type="submit"
      />
    </div>
  </q-form>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, ref,
} from 'vue';
import {httpApi} from 'src/services/httpApi'
import PasswordRepeatInput from 'components/auth/PasswordRepeatInput.vue'
import PasswordSetInput from 'components/auth/PasswordSetInput.vue'
import EmailInput from 'components/auth/EmailInput.vue'
import {useQuasar} from 'quasar';
import {useAuthInstance} from 'src/uses/useAuth'
import {useRouter} from 'vue-router'
import {useUserRouting} from 'src/uses/useUserRouting'
import {app} from 'src/services/App'

export default defineComponent({
  name: 'SignupFormTab',
  components: {EmailInput, PasswordRepeatInput, PasswordSetInput},
  props: {
    openAccess: {
      type: Boolean,
      required: false
    }
  },

  setup(props) {
    onMounted(() => {
      if (props.openAccess) {
        access.value = props.openAccess
      }
    })

    const $q = useQuasar();
    const $router = useRouter();
    const $userRouting = useUserRouting();

    const email = ref<string>('')
    const password = ref<string>('')
    const repeatPassword = ref<string>('')
    let access = ref<boolean>(false)

    const signUp = async () => {
      await httpApi.post('auth/signup', {
        email: email.value,
        password: password.value,
        access: access.value,
        login: true,
      });

      app.eventNotifyService.notify('signup', {
        email: email.value,
      });

      $q.notify({
        // message: 'Successfully signed up. You can now login.',
        message: `Successfully signed up with ${email.value}`,
        color: 'positive',
      });

      await useAuthInstance.loadAuthMe();

      await $router.push($userRouting.afterSignupRoute.value);
    }

    return {
      email,
      password,
      repeatPassword,
      access,
      signUp
    }
  }
});
</script>
