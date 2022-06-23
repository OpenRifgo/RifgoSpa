<template>
  <main class="onboarding-page">

    <div class="title-wrapper">
      <h2>{{ stepName[actualStep] }}</h2>
      <span class="actual-step">{{ actualStep + 1 + '/ ' + stepLength }}</span>
    </div>

    <section class="public-warning">
      <span>This information will be seen by your customers</span>
    </section>

    <q-form
      v-if="consultant"
      @submit="onSubmit"
      class="step-1-form"
    >

      <q-input
        class="consultant-field"
        v-model="consultant.name"
        placeholder="Name *"
        ref="consultantNameField"
        :rules="[
          val => !!val || '* Required',
          val => val.length > 1 || 'Please use minimum 1 character',
        ]"
        lazy-rules
        outlined
        hint="Example: Toni Stark"
      >
        <template v-if="consultant.name" v-slot:append>
          <q-icon name="cancel" @click.stop="consultant.name = null" class="cursor-pointer"/>
        </template>
      </q-input>


      <q-input
        class="consultant-field"
        v-model="consultant.title"
        placeholder="Title"
        outlined
        hint="Example: Career coach"
      >
        <template v-if="consultant.title" v-slot:append>
          <q-icon name="cancel" @click.stop="consultant.title = null" class="cursor-pointer"/>
        </template>
      </q-input>

      <q-editor
        v-model="consultant.description"
        outlined
        :placeholder="placeholderDescription"
        :toolbar="[
              ['bold', 'italic']
            ]"
        @focus="hidePlaceholder"
        @change="togglePlaceholder"
      />
      <p class="editor-description-label">
        Example: Public Speaking Coaching sessions on a one to one basis
      </p>

      <q-input
        placeholder="username-link"
        outlined
        v-model="consultant.slug"
        :disable="!isSlugEditable"
        hint="Example: rifgo.com/tonistark"
        class="consultant-field-slug"
        ref="consultantUsernameField"
        :error="isSlugEditable && !!slugErrorMessage"
        :error-message="slugErrorMessage"
      >
        <template v-slot:prepend>
          <div class="domain-prepend">rifgo.com/</div>
        </template>
      </q-input>

      <!--      <div class="" v-if="consultant.slug">-->
      <!--        https://rifgo.com/{{ consultant.slug }}-->
      <!--      </div>-->

      <!--      :src="consultant.avatarUrl ? `/static/uploads/${consultant.avatarUrl}` : '/preview/avatar_placeholder.svg'"-->


      <div class="avatar-wrapper">
        <q-avatar size="48px" class="avatar-image">
          <q-img
            :src="consultant.avatarUrl ? `/static/uploads/${consultant.avatarUrl}` : '/preview/avatar_placeholder.svg'"
            placeholder-src="/preview/avatar_placeholder.svg"
            :ratio="1"
            fit="cover"
          />
        </q-avatar>
        <div
          class="file-uploader-div"
          @click="$refs.fileUploaderReal.click()"
        >Upload a profile picture
        </div>
        <input type="file" hidden ref="fileUploaderReal" @change="onFileChange">
      </div>
      <p class="editor-description-label max-avatar-size">
        Maximum 5 Mb.
      </p>
      <rifgo-btn
        type="submit"
        label="Next"
        class="full-width"
        :disabled="isSlugEditable && (!slugIsAvailable || slugIsChecking)"
      />

    </q-form>


  </main>
</template>

<style lang="scss">
main.onboarding-page {
  width: 327px;
  margin: 0 auto;
  color: #333333;

  .title-wrapper {
    display: flex;
    margin-top: 32px;
    justify-content: space-between;

    h2 {
      margin: 0;
      font-weight: 600;
      font-size: 24px;
      line-height: 22px;
    }

    span.actual-step {
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      text-align: right;

      color: #979797;
    }

  }

  .public-warning {
    margin: 24px 0;
    background: #FFFDD0;
    border-radius: 8px;
    text-align: center;
    padding: 13.5px 0;

    span {
      font-size: 14px;
      line-height: 18px;

    }
  }

  form.step-1-form {

    .consultant-field {
      margin-bottom: 16px;
    }

    .consultant-field-slug {
      margin-top: 16px;
    }

    .editor-description-label {
      margin-bottom: 0.0000001px;
    }

    .domain-prepend {
      font-size: 14px;
    }

    .max-avatar-size {
      margin-bottom: 32px;
    }

    .avatar-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 32px 0 0;

      .file-uploader-div {
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        letter-spacing: 0.3px;
        color: #524EFF;

        cursor: pointer;
        margin-left: 16px;
      }
    }



    .q-field--outlined .q-field__control {
      border-radius: 8px;
      padding: 0 12px 0 16px;
    }

    .q-field__before, .q-field__prepend {
      padding-right: 0;
    }

    .q-field__control {
      height: 48px;
    }

    .q-field__marginal {
      height: 48px;
      color: #333333;
    }

    .q-field__focusable-action {
      opacity: 1;
    }

    .q-field__bottom, .editor-description-label {
      padding: 8px 16px 0;
      font-style: italic;
      color: #C3C3C3;
      font-size: 12px;
      line-height: 20px;
    }

    .q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input {
      padding: 0;
      font-size: 14px;
      line-height: 20px;
      color: #333333;
    }

    //.q-uploader {
    //  flex-direction: row-reverse;
    //  align-items: center;
    //  width: 100%;
    //}
    //.q-uploader__list {
    //  padding: 0;
    //}
  }
}


</style>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, watch} from 'vue';
import {IConsultantEdit} from 'src/models/ConsultantInterfaces'
import {getConsultantProfile, updateConsultantProfile} from 'src/api/consultantRequests'
import RifgoBtn from 'components/custom/RifgoBtn.vue'
import {useRouter} from 'vue-router'
import {api} from 'boot/axios'
import {nameToSlug} from 'src/lib/helpers'
import {useSlugCheck} from 'src/uses/useSlugCheck'

export default defineComponent({
  components: {RifgoBtn},
  setup() {
    const $router = useRouter();
    const consultant = ref<IConsultantEdit | null>(null);
    const $slugCheck = useSlugCheck();
    const isSlugEditable = ref<boolean>(false);

    onMounted(async () => {
      consultant.value = await getConsultantProfile();
      const slug = consultant.value.slug;
      $slugCheck.slug.value = slug;
      if (!slug) isSlugEditable.value = true;
      if (!consultant.value.description) consultant.value.description = placeholderDescription.value
    });

    const onSubmit = async () => {
      if (!consultant.value) return console.error('Consultant is not set');

      consultant.value.slug = $slugCheck.slug.value;
      const eventCreateResponse = await updateConsultantProfile(consultant.value);

      if (eventCreateResponse.id) {
        // Notify.create({
        //   message: 'Profile updated',
        //   type: 'positive',
        // });

        await $router.push({name: 'onboarding-calendly'});

        if ($slugCheck.slug.value) isSlugEditable.value = false;
      }
    }

    const stepName = ref(['About you', 'Calendly'])
    const actualStep = ref(0)
    const stepLength = computed(() => stepName.value.length)

    const avatarImageInBuffer = ref(new ArrayBuffer(0))
    let avatarBufferFlag = ref(false)

    const onFileChange = (e: { target: HTMLInputElement, dataTransfer: HTMLInputElement }) => {
      const files: FileList | null = e.target.files || e.dataTransfer.files
      if (!files) return
      createImage(files[0])
    }

    const uploadImage = async (data: string | ArrayBuffer | null, fileName: string) => {
      if (!data) return;

      const formData = new FormData();
      formData.append('name', fileName);
      formData.append('file', new Blob([data], {type: 'image/jpeg'}), fileName);
      const result = await api.post<{ file: { name: string, uid: string, ext: string } }>('/api/creator/uploads/image', formData);

      return result.data.file;
    }

    const createImage = (file: File) => {
      const reader = new FileReader();

      reader.onload = async (event: ProgressEvent<FileReader>) => {
        if (event && event.target && event.target.result) {
          avatarImageInBuffer.value = event.target.result as ArrayBuffer;
          avatarBufferFlag.value = true;

          if (consultant.value) {
            const imageData = await uploadImage(event.target.result, file.name);
            if (imageData) consultant.value.avatarUrl = imageData.name;
          }
        }
      };
      reader.readAsArrayBuffer(file);
    }

    const placeholderDescription = ref('Please, describe what you do and your experience *')
    const hidePlaceholder = () => {
      if (consultant.value && consultant.value.description === placeholderDescription.value) {
        consultant.value.description = ''
      }
    }
    const togglePlaceholder = () => {
      if (consultant.value && !consultant.value.description) {
        consultant.value.description = placeholderDescription.value
      }
    }

    const consultantNameField = ref(null)

    watch(
      () => consultant.value?.name,
      () => {
        if (consultant.value && isSlugEditable.value) {
          $slugCheck.slug.value = nameToSlug(consultant.value.name);
        }
      }
    )

    return {
      consultant,
      onSubmit,

      stepName,
      actualStep,
      stepLength,

      onFileChange,

      hidePlaceholder,
      togglePlaceholder,
      placeholderDescription,
      consultantNameField,

      isSlugEditable,
      slug: $slugCheck.slug,
      slugIsAvailable: $slugCheck.slugIsAvailable,
      slugIsChecking: $slugCheck.slugIsChecking,
      slugErrorMessage: $slugCheck.slugErrorMessage,
    }
  },
});
</script>
