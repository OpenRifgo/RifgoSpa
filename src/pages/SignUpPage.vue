<template>
  <q-page class="row items-center justify-between">
    <!-- mobile -->
    <div class="lt-md col-12 q-pt-md q-px-md">
      <div style="width: 160px">
        <img
          style="width: 100%; height: auto"
          src="~assets/logo/Rifgo-Logo-Colorfull-Light-BG.svg"
        />
      </div>

      <div class="lt-md text-h6">
        {{ $t('indexPage_intro') }}
      </div>
    </div>

    <!-- desktop -->
    <div class="gt-sm absolute-top-left q-pa-md">
      <div style="width: 160px">
        <img
          style="width: 100%; height: auto"
          src="~assets/logo/Rifgo-Logo-Colorfull-Light-BG.svg"
        />
      </div>
    </div>

    <!-- desktop -->
    <div class="gt-sm col-12 col-md-8 text-h3 q-pa-sm q-pa-md-xl q-pt-xl montserrat-700">
      {{ $t('indexPage_intro') }}
    </div>

    <div class="col q-px-lg">
      <q-card class="montserrat-700 q-my-lg" style="border-radius: 1rem">
        <q-card-section
          class="q-pa-lg"
        >
          <signup-form-tab open-access="true" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style>

</style>

<script lang="ts">
import {defineComponent} from 'vue';
import SignupFormTab from 'components/auth/SignupFormTab.vue'
import {useGlobalLocale} from 'src/uses/useGlobalLocale'

export default defineComponent({
  name: 'OpenSignUpPage',
  components: { SignupFormTab },
  setup() {
    return {
      ...useGlobalLocale(),
      cards: [
        {
          title: 'Broadcast'
        },
        {
          title: 'Monetize your streams',
          items: [
            {
              label: 'Paywall',
              caption: 'Set up price for attendance',
              icon: 'fas fa-dollar-sign',
              iconColor: 'yellow-8',
            },
            {
              label: 'Donations',
              caption: 'Coming soon',
              icon: 'fas fa-donate',
              iconColor: 'blue-7',
            },
          ]
        },
        {
          title: 'Chat with viewers'
        },
      ]
    };
  }
});
</script>
