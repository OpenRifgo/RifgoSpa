<template>
  <main class="referral-page">
    <q-form
      @submit="submit"
      class="step-referral"
    >
      <div class="title-wrapper">
        <h2> Reward for referrals </h2>
        <div class="title-icon" @click="showActiveInfoDialog">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 0.75C3.10078 0.75 0.75 3.10078 0.75 6C0.75 8.89922 3.10078 11.25 6 11.25C8.89922 11.25 11.25 8.89922 11.25 6C11.25 3.10078 8.89922 0.75 6 0.75ZM6.375 8.53125C6.375 8.58281 6.33281 8.625 6.28125 8.625H5.71875C5.66719 8.625 5.625 8.58281 5.625 8.53125V5.34375C5.625 5.29219 5.66719 5.25 5.71875 5.25H6.28125C6.33281 5.25 6.375 5.29219 6.375 5.34375V8.53125ZM6 4.5C5.8528 4.497 5.71265 4.43641 5.60961 4.33125C5.50658 4.22609 5.44887 4.08473 5.44887 3.9375C5.44887 3.79027 5.50658 3.64891 5.60961 3.54375C5.71265 3.43859 5.8528 3.378 6 3.375C6.1472 3.378 6.28735 3.43859 6.39039 3.54375C6.49342 3.64891 6.55113 3.79027 6.55113 3.9375C6.55113 4.08473 6.49342 4.22609 6.39039 4.33125C6.28735 4.43641 6.1472 4.497 6 4.5Z"
              fill="#333333"/>
          </svg>
        </div>
      </div>

      <section class="public-warning">
        <span>What will people get for bringing you new clients?</span>
      </section>


      <q-editor
        v-model="consultant.promoDescription"
        outlined
        :placeholder="placeholderDescription"
        :toolbar="[
              ['bold', 'italic']
            ]"
        @focus="hidePlaceholder"
      />
      <p class="editor-description-label">
        Example: For anyone who comes to me through your recommendation and becomes a client,
        I'll be happy to give you a 50% discount on our next session.
      </p>

      <div class="title-wrapper subtitle-wrapper">
        <h2> First call with a new client </h2>
      </div>

      <section class="public-warning multiline-public-warning">
        <span>Create the appointment new clients will book with you</span>
      </section>


      <q-input
        class="consultant-field"
        v-model="offer.title"
        placeholder="Title"
        outlined
        hint="Example: Welcome call"
      >
        <template v-if="offer.title" v-slot:append>
          <q-icon name="cancel" @click.stop="consultant.title = null" class="cursor-pointer"/>
        </template>
      </q-input>

      <q-editor
        v-model="offer.description"
        outlined
        :placeholder="placeholderDescription"
        :toolbar="[
              ['bold', 'italic']
            ]"
        @focus="hidePlaceholder"
      />
      <p class="editor-description-label call-editor-description-label">
        Example: On this call, we'll get to know each other, discuss your needs, and determine a growth strategy
      </p>

      <q-select
        placeholder="Calendar Event Type"
        :options="calendlyEventTypes"
        outlined
        emit-value
        map-options
        v-model="offer.calendlyEventType"
        :loading="calendlyEventTypesLoading"
        hint="Create Secret Event in your Calendly and choice it"
        class="offer-calendly-field"
      />

      <q-toggle v-model="isPriceMoreZero"
                class="offer-field"
                label="Paid session"
      />

      <section class="public-warning multiline-public-warning" v-if="isPriceMoreZero">
        <span>You must have a Stripe account to create a paid session.
          The next step is to link your existing account</span>
      </section>

      <q-input v-if="isPriceMoreZero"
               placeholder="Amount (USD)"
               outlined
               v-model="offer.price"/>

      <rifgo-btn
        type="submit"
        label="Create your referral page"
        class="full-width"
        :class="isPriceMoreZero ? 'referral-submit' : 'referral-submit-zero-price'"

      />

    </q-form>

    <q-dialog ref="dialogRef" @hide="onDialogHide">

      <q-card class="q-dialog-plugin page-info-modal" v-if="actualModalDialog==='info'">
        <q-card-section>
          <p class="page-info-modal__text">Now you can create a referral page and start attracting more clients</p>
        </q-card-section>
        <q-card-actions>
          <rifgo-btn @click="onOKClick" label="GO!" class="full-width"/>
        </q-card-actions>
      </q-card>

      <q-card v-if="actualModalDialog==='active-info'" class="page-active-info-modal">
        <q-card-section>
          <h2>
            How it work
          </h2>
          <p>
            Ask your client if they would recommend you and suggest using a special referral link for it. Tell them
            you’ll know if someone came to you from them and what they would get as your token of gratitude.
          </p>
          <p>
            Send out an email or a message to your past clients and let them know they can now get perks for
            recommending you to others. Remember to provide your referral link.
          </p>
          <p>
            You can even share your short RIFGO link on social media to reach people who worked with you if you don’t
            have their contact information.
          </p>
        </q-card-section>
      </q-card>

    </q-dialog>
  </main>
</template>

<style lang="scss">
main.referral-page {
  width: 320px;
  margin: 0 auto;
  color: #333333;

  form.step-referral {

    .title-wrapper {
      display: flex;
      margin-top: 64px;
      justify-content: flex-start;

      &.subtitle-wrapper {
        margin-top: 25px;
      }

      h2 {
        margin: 0;
        font-weight: 600;
        font-size: 24px;
        line-height: 22px;
      }

      .title-icon {
        margin-left: 8px;
        margin-top: 3px;
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
      margin: 16px 0 35px;
      background: #FFFDD0;
      border-radius: 8px;
      text-align: center;
      padding: 16px;

      &.multiline-public-warning {
        text-align: left;
        margin-bottom: 16px;
      }

      span {
        font-size: 13px;
        line-height: 16px;

      }
    }

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

    .referral-submit-zero-price {
      margin-top: 31px;
    }

    .referral-submit {
      margin-top: 16px;
    }

    .referral-cancel {
      margin: 12px 0;
    }

    .q-editor__content {
      padding: 18px 16px;
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

    .editor-description-label {
      padding-top: 6px;
    }

    .call-editor-description-label {
      padding-top: 5px;
    }

    .q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input {
      padding: 0;
      font-size: 14px;
      line-height: 20px;
      color: #333333;
    }

    .offer-calendly-field {
      margin: 16px 0 20px;

      .q-field__bottom,
      .editor-description-label {
        padding: 6px 16px 0;
        font-style: italic;
        color: #C3C3C3;
        font-size: 12px;
        line-height: 20px;

      }
    }

    .q-field--auto-height .q-field__control,
    .q-field--auto-height .q-field__native {
      min-height: 48px;
    }

    .q-field__marginal {
      height: 48px;
      color: #333333;
    }

    .q-field--outlined .q-field__control {
      border-radius: 8px;
      padding: 0 12px 0 16px;
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

.q-dialog__inner > div {
  border-radius: 12px;
}

.page-info-modal {
  width: 320px;

  .q-card__section--vert {
    padding: 24px;

    .page-info-modal__text {
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
    }
  }

  .q-card__actions {
    padding: 0 24px 24px;
    align-items: center;
  }
}

.page-active-info-modal {
  width: 320px;

  .q-card__section--vert {
    padding: 24px;

    h2 {
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;

      color: #333333;

      margin: 0 0 8px;
    }

    p {
      margin-bottom: 24px; // intuition, don't designed
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;

      color: #4D4D4D;
    }
  }
}

</style>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref} from 'vue';
import {IConsultantEdit, IConsultantOfferEdit} from 'src/models/ConsultantInterfaces'
import {
  createOfferRequest, getCalendlyEventTypes, getConsultantProfile,
  updateConsultantProfile,
} from 'src/api/consultantRequests'
import RifgoBtn from 'components/custom/RifgoBtn.vue'
import {useRouter} from 'vue-router'
import {Notify, useDialogPluginComponent} from 'quasar';

export default defineComponent({
  components: {RifgoBtn},

  emits: [
    // REQUIRED
    'ok', 'hide',
  ],

  setup(props, {emit}) {
    onMounted(async () => {
      showInfoDialog()

      Object.assign(consultant, await getConsultantProfile())
      calendlyEventTypesLoading.value = true;

      const calendlyEventTypesData = await getCalendlyEventTypes();
      calendlyEventTypes.value = calendlyEventTypesData
        .map(val => ({
          value: val.uri,
          label: [val.name, val.description_plain].filter(v => v).join(' ')
        }));

      calendlyEventTypesLoading.value = false;

      if (offer && !offer.description) offer.description = placeholderDescription.value
    });

    const {dialogRef, onDialogHide, onDialogOK, onDialogCancel} = useDialogPluginComponent()
    const isPageInfoModalShown = ref(true);

    const actualModalDialog = ref<'info' | 'active-info'>('info')

    const showActiveInfoDialog = () => {
      actualModalDialog.value = 'active-info'
      show()
    }

    const showInfoDialog = () => {
      actualModalDialog.value = 'info'
      show()
    }

    const show = () => {
      if (dialogRef.value) dialogRef.value.show()
    };

    // following method is REQUIRED
    // (don't change its name --> "hide")
    const hide = () => {
      if (dialogRef.value) {
        dialogRef.value.hide()
        isPageInfoModalShown.value = false
      }
    };

    const onOKClick = () => {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      hide()
    };

    const onCancelClick = () => {
      // we just need to hide the dialog
      hide()
    }

    const calendlyEventTypes = ref<{ value: string, label: string }[]>([]);
    const calendlyEventTypesLoading = ref(true);

    const $router = useRouter();
    const consultant = reactive<Partial<IConsultantEdit>>({promoDescription: ''});
    const isSlugEditable = ref<boolean>(false);

    const offer = reactive<Partial<IConsultantOfferEdit>>({description: ''});

    const submit = async () => {
      if (!isPriceMoreZero.value) offer.price = 0
      offer.isEnabled = true
      const consultantUpdateResponse = await updateConsultantProfile(<IConsultantEdit>consultant);
      const offerCreateResponse = await createOfferRequest(<IConsultantOfferEdit>offer)

      if (consultantUpdateResponse && offerCreateResponse.id) {
        Notify.create({
          message: 'Consultant Data Update and Offer created',
          type: 'positive',
        })
        const nextStep = isPriceMoreZero.value ? 'onboarding-stripe' : 'consultant-offers'
        await $router.push({
          name: nextStep
        })
      }
    }

    const stepName = ref(['About you', 'Calendly'])
    const actualStep = ref(0)
    const stepLength = computed(() => stepName.value.length)

    const isPriceMoreZero = ref(false)

    const placeholderDescription = ref('Please, describe what you do and your experience')
    const hidePlaceholder = () => {
      if (consultant && consultant.description === placeholderDescription.value) {
        console.log(consultant.description)
        console.log(placeholderDescription.value)
        consultant.description = ''
      }
    }

    return {

      isSlugEditable,

      offer,
      consultant,
      submit,
      calendlyEventTypes,
      calendlyEventTypesLoading,

      stepName,
      actualStep,
      stepLength,


      hidePlaceholder,
      placeholderDescription,
      isPriceMoreZero,

      dialogRef,
      show,
      hide,
      onDialogHide,
      onDialogOK, onDialogCancel,
      onOKClick,
      onCancelClick,
      isPageInfoModalShown,
      actualModalDialog,

      showActiveInfoDialog
    }
  },
});
</script>
