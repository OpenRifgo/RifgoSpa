<template>

  <q-layout>
    <q-page-container>
      <q-page class="row items-center justify-between" style="flex-direction: column;">
        <div class="full-width">
          <router-link
            to="/"
          >
            <q-img
              src="~assets/logo/Rifgo-Logo-Black.svg"
              style="width: 100px"
              class="q-mt-md q-mx-lg"
            />
          </router-link>
          <q-separator class="q-mx-lg q-my-md"/>
        </div>

        <div class="full-width">
          <router-view/>
        </div>


        <div class="full-width" style="color: #8B8B8B">
          <q-separator class="q-mx-md"/>

          <div class="row q-ma-md">
            <div class="col-9">
              <span class="q-pr-md">Terms & Conditions</span>
              <span class="q-pr-md">Privacy Policy</span>
            </div>

            <div class="col-3 text-right">
              &copy; RIFGO 2022
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>

</template>

<script lang="ts">

import {defineComponent} from 'vue'

export default defineComponent({
  name: 'PublicLayoutWithHeader',
})
</script>
