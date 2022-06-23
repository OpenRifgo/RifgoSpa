<template>
  <q-form @submit="logIn">
    <div>
      <q-input
        v-model="email"
        outlined
        class="q-pb-md"
        :label="$t('email')"
        type="email"
        :rules="value => value.length > 0 || 'email can\'t be empty'"
      />

      <password-input
        v-model="password"
      />

    </div>

    <div class="text-center q-pb-md text-blue-grey" style="font-weight: 500">
      <router-link :to="{name: 'auth-forgot-password'}" class="no-decoration">{{ $t('loginForm_forgotPassword') }}</router-link>
    </div>

    <div>
      <q-btn
        color="primary"
        :label="$t('loginForm_submitBtn')"
        class="full-width q-pa-md"
        no-caps
        type="submit"
      />
    </div>
  </q-form>
</template>

<style scoped>
a.no-decoration {
  text-decoration: none;
  color: inherit;
}
</style>

<script lang="ts">
import {
  defineComponent,
} from 'vue';
import PasswordInput from 'components/auth/PasswordInput.vue'
import {httpApi} from 'src/services/httpApi'
import {useAuthInstance} from 'src/uses/useAuth'
import {onMounted} from 'vue'
import {useUserRouting} from 'src/uses/useUserRouting'

export default defineComponent({
  name: 'LoginFormTab',

  components: {PasswordInput},

  setup() {
    const authMe = useAuthInstance

    onMounted(() => authMe.loadAuthMe())

    return {
      authMe,
    }
  },

  data() {
    return {
      email: '',
      password: '',
    }
  },

  methods: {
    async logIn() {
      try {
        const loginResult = await httpApi.post<{ ok: boolean }>('auth/login', {
          email: this.email,
          password: this.password,
        }, {withCredentials: true})

        if (loginResult.data.ok) {
          await this.authMe.loadAuthMe()
          this.notifyLoginSuccess()
          await this.$router.push(useUserRouting().afterLoginRoute.value)
        } else {
          this.notifyLoginFailed()
        }
      } catch (e) {
        this.notifyLoginFailed()
      }
    },

    notifyLoginFailed() {
      // this.$q.notify({
      //   message: 'login failed',
      //   type: 'negative'
      // })
    },

    notifyLoginSuccess() {
      this.$q.notify({
        message: 'successfully logged in',
        color: 'positive',
      })
    }
  },
});
</script>
