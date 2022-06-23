<template>
  <q-layout view="lHh Lpr lFf" container style="height: 100vh">
<!--    <q-header reveal elevated>-->
<!--      <q-toolbar>-->
<!--        <q-btn flat round dense icon="menu" @click="drawerLeft = !drawerLeft" />-->

<!--        <q-toolbar-title>-->
<!--          <strong>Quasar</strong> Framework-->
<!--        </q-toolbar-title>-->

<!--        <q-btn flat round dense icon="menu" @click="drawerRight = !drawerRight" />-->
<!--      </q-toolbar>-->
<!--    </q-header>-->

<!--    <q-footer reveal elevated>-->
<!--      <q-toolbar>-->
<!--        <q-btn flat round dense icon="menu" @click="drawerLeft = !drawerLeft" />-->

<!--        <q-toolbar-title>-->
<!--          <strong>Quasar</strong> Framework-->
<!--        </q-toolbar-title>-->

<!--        <q-btn flat round dense icon="menu" @click="drawerRight = !drawerRight" />-->
<!--      </q-toolbar>-->
<!--    </q-footer>-->

<!--    <q-drawer-->
<!--      v-model="drawerLeft"-->
<!--      :width="150"-->
<!--      :breakpoint="700"-->
<!--      behavior="desktop"-->
<!--      bordered-->
<!--      class="bg-grey-3"-->
<!--    >-->
<!--      <q-scroll-area class="fit">-->
<!--        <div class="q-pa-sm">-->
<!--          <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>-->
<!--        </div>-->
<!--      </q-scroll-area>-->
<!--    </q-drawer>-->

<!--    <q-drawer-->
<!--      side="right"-->
<!--      v-model="drawerRight"-->
<!--      bordered-->
<!--      :width="150"-->
<!--      :breakpoint="500"-->
<!--      behavior="desktop"-->
<!--      class="bg-grey-3"-->
<!--    >-->
<!--      <q-scroll-area class="fit">-->
<!--        <div class="q-pa-sm">-->
<!--          <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>-->
<!--        </div>-->
<!--      </q-scroll-area>-->
<!--    </q-drawer>-->

    <q-page-container>

      <router-view />

<!--        &lt;!&ndash; place QPageSticky at end of page &ndash;&gt;-->
<!--        <q-page-sticky position="top-left" :offset="[18, 18]">-->
<!--          <q-btn color="accent" icon="arrow_back" class="rotate-45" />-->
<!--        </q-page-sticky>-->
<!--        <q-page-sticky position="top" :offset="[0, 18]">-->
<!--          <q-btn color="accent" icon="arrow_back" class="rotate-90" />-->
<!--        </q-page-sticky>-->
<!--        <q-page-sticky position="top-right" :offset="[18, 18]">-->
<!--          <q-btn color="accent" icon="arrow_upward" class="rotate-45" />-->
<!--        </q-page-sticky>-->
<!--        <q-page-sticky position="right" :offset="[18, 0]">-->
<!--          <q-btn color="accent" icon="arrow_upward" class="rotate-90" />-->
<!--        </q-page-sticky>-->
<!--        <q-page-sticky position="left" :offset="[18, 0]">-->
<!--          <q-btn color="accent" icon="arrow_back" />-->
<!--        </q-page-sticky>-->
<!--        <q-page-sticky position="bottom-left" :offset="[18, 18]">-->
<!--          <q-btn color="accent" icon="arrow_forward" class="rotate-135" />-->
<!--        </q-page-sticky>-->
<!--        <q-page-sticky position="bottom" :offset="[0, 18]">-->
<!--          <q-btn color="accent" icon="arrow_forward" class="rotate-90" />-->
<!--        </q-page-sticky>-->
<!--        <q-page-sticky position="bottom-right" :offset="[18, 18]">-->
<!--          <q-btn color="accent" icon="arrow_forward" class="rotate-45" />-->
<!--        </q-page-sticky>-->


    </q-page-container>
  </q-layout>
</template>
