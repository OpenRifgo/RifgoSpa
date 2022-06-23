<template>
  <q-page class="row items-center justify-evenly">
    <div class="montserrat-700 col-4">
      <div class="text-h4 q-pb-md">Profile</div>
      <q-form>
        <q-input
          label="Name"
          v-model="user.name"
          outlined
          class="q-pb-md"
        />
        <q-input
          label="Surname"
          v-model="user.surname"
          outlined
          class="q-pb-md"
        />
        <q-btn
          color="primary"
          type="submit"
          label="Next"
          class="full-width q-pa-md"
          no-caps
        />
      </q-form>
    </div>
  </q-page>
</template>

<style>
.auth_tabs .q-tab__label {
  color: #1D1D1D;
}
</style>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'ProfilePage',
  components: {},
  setup() {
    return {
      user: reactive({
        name: '',
        surname: ''
      })
    //   tab: ref('login'),
    //   ...useGlobalLocale()
    };
  }
});
</script>
