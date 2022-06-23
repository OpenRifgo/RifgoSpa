<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-white text-black"
      style="height: 94px"
      elevated
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title
          style="line-height: 94px; font-size: 34px; font-weight: bold"
        >
          {{ ($route.meta || {}).title }}
          <!--          {{ $route.path.trim('/').split('/')[$route.path.trim('/').split('/').length-1].toUpperCase() }}-->
        </q-toolbar-title>

        <div>
          <q-btn-dropdown
            split
            color="white"
            dense
            outline
            text-color="grey-4"
            no-caps
          >
            <template v-slot:label>
<!--              <q-card-->
<!--                flat-->
<!--              >-->
<!--                <q-item>-->
<!--                  <q-item-section avatar>-->
<!--                    &lt;!&ndash;                <q-avatar>&ndash;&gt;-->
<!--                    <q-img-->
<!--                      :src="user.img"-->
<!--                      placeholder-src="~assets/profile_avatar_placeholder_large.png"-->
<!--                      :ratio="1"-->
<!--                      fit="fill"-->
<!--                    />-->
<!--                    &lt;!&ndash;                </q-avatar>&ndash;&gt;-->
<!--                  </q-item-section>-->
<!--                  <q-item-section>-->
<!--                    <q-item-label class="text-bold text-grey-9">{{ user.name }}</q-item-label>-->
<!--                    <q-item-label caption>{{ user.email }}</q-item-label>-->
<!--                  </q-item-section>-->
<!--                </q-item>-->
<!--              </q-card>-->
            </template>

            <q-list>
              <q-item clickable v-close-popup @click="onLogOutClick">
                <q-item-section>
                  <q-item-label>Log Out</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-deep-purple-black"
    >
      <q-list
        class="q-pa-sm"
      >
        <q-item-label
          header
          class="montserrat-800 text-white"
          style="font-size: 32px"
        >
          <!--          Rifgo-->
          <div
            style="width: 160px"
          >
            <q-img
              src="~assets/logo/Rifgo-Logo-White.svg"
            />
          </div>
        </q-item-label>

        <template
          v-for="item in linksList"
          :key="item.label"
        >
          <q-expansion-item
            v-if="'children' in item"
            expand-separator
            :icon="item.icon"
            :label="item.label"
            :caption="item.caption"
            :default-opened="false"
            class="montserrat-700 text-white"
          >
            <template
              v-for="childItem in item.children"
              :key="childItem.label"
            >

              <q-list
                class="q-pa-sm"
              >
                <q-item
                  class="montserrat-700 text-white"
                  clickable
                  :to="childItem.to"
                >
                  <q-item-section
                    v-if="childItem.icon"
                    avatar
                  >
                    <q-icon :name="childItem.icon"/>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ childItem.label }}</q-item-label>
                    <q-item-label caption v-if="childItem.caption">
                      {{ childItem.caption }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

            </template>
          </q-expansion-item>

          <q-item
            v-else
            class="montserrat-700 text-white"
            clickable
            :to="item.to"
          >
            <q-item-section
              v-if="item.icon"
              avatar
            >
              <q-icon :name="item.icon"/>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
              <q-item-label caption v-if="item.caption">
                {{ item.caption }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>

        <!--        <EssentialLink-->
        <!--          v-for="link in essentialLinks"-->
        <!--          :key="link.title"-->
        <!--          v-bind="link"-->
        <!--        />-->
      </q-list>
    </q-drawer>
    <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale"
      ref="dialogRef" @hide="onDialogHide" :maximized="showOptionModal!=='Short'">
      <q-card class="q-dialog-plugin"
              :class="showOptionModal==='Short' ? 'short-agreement-modal' : 'terms-modal'">
<!--        short-agreement-modal-->
        <short-agreement-dialog
          @click="onOKClick"
          v-if="showOptionModal==='Short'"
          v-on:openTerms="showOptionModal='Terms'"
          v-on:openPolicy="showOptionModal='Policy'"
        />
        <terms v-if="showOptionModal==='Terms'" @openShort="showOptionModal='Short'"/>
        <policy v-if="showOptionModal==='Policy'" @openShort="showOptionModal='Short'"/>
      </q-card>
    </q-dialog>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
 .terms-modal {
   //width: 95vw !important;
   //max-width: 95vw !important;
   //height: 100vh;
   padding: 0 20px 0;
 }
</style>

<script lang="ts">

import {IUser, useAuthInstance} from 'src/uses/useAuth'

const creatorLinksList = [
  {
    label: 'Profile',
    icon: 'far fas fa-id-badge',
    to: {name: 'consultant-profile'},
  },
  {
    label: 'Offers',
    icon: 'fas fa-calendar-plus',
    to: {name: 'consultant-offers'},
  },
  {
    label: 'Calendly',
    icon: 'far fa-calendar-alt',
    to: {name: 'consultant-calendly'},
  },
  {
    label: 'Stripe',
    icon: 'fab fa-cc-stripe',
    to: {name: 'creator-stripe'},
  },
];

const platformAdminLinks = [
  {
    label: 'Super Admin',
    icon: 'settings',
    children: [
      {
        label: 'Registrations',
        icon: 'img:/icons/events.svg',
        to: {name: 'super-admin-registrations'},
      },
      {
        label: 'Send email',
        icon: 'email',
        to: {name: 'super-admin-send-email'},
      },
    ],
  },
]

import {computed, defineComponent, onMounted, ref} from 'vue'
import {Notify, useDialogPluginComponent} from 'quasar';
import ShortAgreementDialog from 'components/ShortAgreementDialog.vue';
import Terms from 'components/Terms.vue';
import Policy from 'components/Policy.vue';
import {userHasAgreeRequest} from 'src/api/creatorRequests';
import {useRouter} from 'vue-router'
import {useUserRouting} from 'src/uses/useUserRouting'

export default defineComponent({
  name: 'CreatorLayout',

  components: {Terms, Policy, ShortAgreementDialog},
  emits: [
    // REQUIRED
    'ok', 'hide',
  ],
  setup(props, {emit}) {
    const $router = useRouter();

    onMounted(() => {
      void auth.loadAuthMe().then(() => {
        if (auth.me.value && !auth.me.value.hasTermsAgree) {
          show()
        }
      });
    })

    const auth = useAuthInstance;
    const leftDrawerOpen = ref(false);
    const persistent = ref(false);

    const {dialogRef, onDialogHide, onDialogOK, onDialogCancel} = useDialogPluginComponent()
    const isAgreementModalShown = ref(false);

    // following method is REQUIRED
    // (don't change its name --> "show")
    const show = () => {
      if (dialogRef.value) dialogRef.value.show()

      persistent.value = true

    };

    // following method is REQUIRED
    // (don't change its name --> "hide")
    const hide = () => {
      if (dialogRef.value) {
        dialogRef.value.hide()
        isAgreementModalShown.value = false

        persistent.value = false
      }
    };

    const onOKClick = async () => {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      const user: IUser = await userHasAgreeRequest(true)
      console.log({user})
      emit('ok')
      // or with payload: this.$emit('ok', { ... })
      // then hiding dialog
      hide()
    };

    const onCancelClick = () => {
      // we just need to hide the dialog
      hide()
    }

    const onLogOutClick = async () => {
      await auth?.logOut();
      await $router.push(useUserRouting().afterLogoutRoute.value);

      Notify.create({
        message: 'You\'ve successfully logged out',
        type: 'info',
        color: 'primary'
      });
    }

    const linksList = computed(
      () => [
        ...(auth.me.value?.status === 'Streamer' ? [{
          label: 'Events',
          icon: 'img:/icons/events.svg',
          to: {name: 'creator-events'},
        }] : []),
        ...creatorLinksList,
        ...(auth.isPlatformAdmin() ? platformAdminLinks : []),
      ],
    )

    const showOptionModal = ref<'Short' | 'Terms' | 'Policy'>('Short')

    return {
      auth,
      linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      user: ref({
        img: '/demo/avatar.svg',
        name: 'Adam Sandler',
        email: 'demo@demo.com',
      }),

      dialogRef,
      show,
      hide,
      onDialogHide,
      onDialogOK, onDialogCancel,
      onOKClick,
      onCancelClick,
      onLogOutClick,
      isUnmuteModalShown: isAgreementModalShown,
      showOptionModal,
      persistent
    }
  },
})
</script>
