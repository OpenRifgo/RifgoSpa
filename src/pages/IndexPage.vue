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
<!--    <div class="absolute-top-right">-->
<!--      <div class="q-pa-sm">-->
<!--        <q-btn-->
<!--          flat-->
<!--          @click="toggleLang"-->
<!--        >{{ $t('lang') }}</q-btn>-->
<!--      </div>-->
<!--    </div>-->

    <!-- desktop -->
    <div class="gt-sm col-12 col-md-8 text-h3 q-pa-sm q-pa-md-xl q-pt-xl montserrat-700">
      {{ $t('indexPage_intro') }}
    </div>

    <div class="col q-px-lg">

      <q-card class="montserrat-700 q-my-lg" style="border-radius: 1rem">

        <q-card-actions
          class="auth_tabs"
        >
          <q-tabs
            v-model="tab"
            class="text-blue full-width"
            stretch
          >
            <q-tab name="login" :label="$t('loginForm_logInTab')" />
            <q-tab name="signup" :label="$t('loginForm_signUpTab')" />
          </q-tabs>
        </q-card-actions>

        <q-separator dark />

        <q-card-section
          class="q-pa-lg"
        >
          <q-tab-panels
            v-model="tab"
            animated
            swipeable
          >

            <q-tab-panel name="login">
              <login-form-tab />
            </q-tab-panel>

            <q-tab-panel name="signup">
              <signup-form-tab />
            </q-tab-panel>

          </q-tab-panels>

        </q-card-section>

      </q-card>

    </div>

  </q-page>

<!--  <q-page class="row items-center justify-evenly bg-black q-col-gutter-lg q-pa-xl montserrat-700">-->

<!--    <div class="absolute-top-left">-->
<!--      <div style="width: 160px" class="q-ml-lg">-->
<!--        <q-img-->
<!--          src="~assets/logo/Rifgo-Logo-Colorfull-Dark-BG.svg"-->
<!--        />-->
<!--      </div>-->
<!--    </div>-->

<!--    <div-->
<!--      v-for="(card, i) in cards"-->
<!--      v-bind:key="i"-->
<!--      class="col-12 col-md-4"-->
<!--    >-->

<!--      <q-card>-->
<!--        <q-card-section>-->
<!--          <div class="text-h4 text-center q-pb-lg q-pt-sm">{{ card.title }}</div>-->

<!--          <q-list>-->
<!--            <q-item-->
<!--              v-for="(item, j) in card.items"-->
<!--              v-bind:key="j"-->
<!--            >-->
<!--              <q-item-section>-->
<!--                <q-item-label>{{ item.label }}</q-item-label>-->
<!--                <q-item-label caption>{{ item.caption }}</q-item-label>-->
<!--              </q-item-section>-->

<!--              <q-item-section-->
<!--                v-if="item.icon"-->
<!--                side-->
<!--              >-->
<!--                <q-icon :name="item.icon" :color="item.iconColor" />-->
<!--              </q-item-section>-->
<!--            </q-item>-->
<!--          </q-list>-->

<!--        </q-card-section>-->
<!--      </q-card>-->

<!--    </div>-->

<!--  </q-page>-->


</template>

<style>
.auth_tabs .q-tab__label {
  color: #1D1D1D;
}
</style>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import LoginFormTab from 'components/auth/LoginFormTab.vue'
import SignupFormTab from 'components/auth/SignupFormTab.vue'
import {useGlobalLocale} from 'src/uses/useGlobalLocale'

export default defineComponent({
  name: 'IndexPage',
  components: { LoginFormTab, SignupFormTab },
  setup() {
    const tab = ref('signup');

    return {
      tab,
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
