<template>
  <q-layout view="lHh Lpr lFf">

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-deep-purple-black"
      mini
    >
      <q-list
        class="q-pa-sm"
      >
        <q-item-label
          header
          class="montserrat-800 text-white"
          style="font-size: 32px"
        >
          R
        </q-item-label>

        <q-item
          v-for="item in essentialLinks"
          :key="item.label"
          class="montserrat-700 text-white"
          clickable
          :to="item.to"
        >
          <q-item-section
            v-if="item.icon"
            avatar
          >
            <q-icon :name="item.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
<!--            <q-item-label caption>-->
<!--              {{ caption }}-->
<!--            </q-item-label>-->
          </q-item-section>
        </q-item>

<!--        <EssentialLink-->
<!--          v-for="link in essentialLinks"-->
<!--          :key="link.title"-->
<!--          v-bind="link"-->
<!--        />-->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

const linksList = [
  {
    label: 'Events',
    icon: 'img:/icons/events.svg',
    to: {name: 'creator-events'}
  }
];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CreatorMiniLayout',

  components: {},

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      linksList: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      user: ref({
        img: '/demo/avatar.svg',
        name: 'Adam Sandler',
        email: 'demo@demo.com'
      }),
    }
  }
})
</script>
