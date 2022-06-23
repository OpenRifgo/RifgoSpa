<template>
  <q-page class="q-pa-lg bg-grey-1">
    <q-form
      v-if="consultant"
      @submit="onSubmit"
    >

      <div class="q-pb-md">
        <q-input label="Name" outlined v-model="consultant.name"/>
      </div>

      <div class="q-pb-md">
        <q-input
          label="Link name"
          outlined
          v-model="consultant.slug"
          :disable="!isSlugEditable"
        />
      </div>

      <div class="q-pb-md"
        v-if="consultant.slug"
      >
        https://rifgo.com/{{consultant.slug}}
      </div>

      <div class="q-pb-md">
        <q-input label="Title" outlined v-model="consultant.title"/>
      </div>

      <div class="q-pb-md row">
        <div class="col">
          <!--        <q-input label="Your Photo Url" outlined v-model="consultant.avatarUrl"/>-->
          <q-uploader
            flat
            url='/api/creator/uploads/image'
            class='q-mb-lg full-width'
            label='Profile image'
            @uploaded='onImageUploaded'
          />
        </div>

        <div style="width: calc(48px + 24px)">
          <q-avatar size="48px" style="margin-left: 24px">
            <q-img
              v-if="consultant.avatarUrl"
              :src="`/static/uploads/${consultant.avatarUrl}`"
              placeholder-src="~assets/profile_avatar_placeholder_large.png"
              :ratio="1"
              fit="cover"
            />
          </q-avatar>
        </div>

      </div>

      <p class="editor-description-label">Description</p>
      <div class="q-pb-md">
        <q-editor label="Description" outlined v-model="consultant.description"/>
      </div>

      <p class="editor-description-label">Promo Description</p>
      <div class="q-pb-md">
        <q-editor label="Promo Description" outlined v-model="consultant.promoDescription"/>
      </div>

      <div class="row q-pb-md q-pt-md">
        <div class="col">
          <rifgo-btn
            type="submit"
            label="Save"
          />
        </div>
        <div class="col text-right">
          <rifgo-btn
            flat
            no-caps
            @click="$router.push({name: 'creator-events'})"
            label="Cancel"
          />
        </div>
      </div>

    </q-form>
  </q-page>
</template>

<style lang="scss">
.copy-link-btn {
  margin-bottom: 16px;
  background-color: #F9F9F9;

  svg {
    margin-right: 5px;
  }
}

.editor-description-label {
  color: grey;
  margin: 10px 5px 3px 2px;
  font-size: 16px;
}

</style>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {Notify} from 'quasar'
import {IConsultantEdit} from 'src/models/ConsultantInterfaces'
import RifgoBtn from 'components/custom/RifgoBtn.vue'
import {getConsultantProfile, updateConsultantProfile} from 'src/api/consultantRequests'
import {IUploadImageResponse} from 'src/models/UploadsInterfaces'

export default defineComponent({
  components: {RifgoBtn},
  setup() {
    const consultant = ref<IConsultantEdit | null>(null);
    const isSlugEditable = ref<boolean>(false);

    onMounted(async () => {
      consultant.value = await getConsultantProfile();
      if (!consultant.value.slug) isSlugEditable.value = true;
    });

    const onSubmit = async () => {
      if (!consultant.value) return console.error('Consultant is not set');

      const eventCreateResponse = await updateConsultantProfile(consultant.value);

      if (eventCreateResponse.id) {
        Notify.create({
          message: 'Profile updated',
          type: 'positive',
        });

        if (consultant.value.slug) isSlugEditable.value = false;
      }
    }

    // const images = ref<IImage[]>([]);
    const onImageUploaded = (info: {xhr: {response: string}}) => {
      const data = JSON.parse(info.xhr.response) as IUploadImageResponse;
      if (consultant.value) consultant.value.avatarUrl = data.file.name;
    }

    return {
      consultant,
      isSlugEditable,
      onSubmit,
      onImageUploaded,
    }
  },
});
</script>
