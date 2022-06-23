<template>
  <main>
    <div class="title-wrapper">
      <h2>Create Your Offer</h2>
    </div>
    <section class="public-warning">
      <span>This information will be seen by your customers</span>
    </section>
    <q-form
      @submit="submit"
    >
      <consultant-offer-form v-model="offer"/>

      <div class="row q-pb-md q-pt-md">
        <div class="col">
          <rifgo-btn
            label="Create offer"
            type="submit"
          />
        </div>
        <div class="col text-right">
          <rifgo-btn
            flat
            label="Cancel"
            :to="{name: 'consultant-offers'}"
          />
        </div>
      </div>

    </q-form>
  </main>
</template>

<script lang="ts">
import ConsultantOfferForm from 'components/consultant/ConsultantOfferForm.vue';
import {reactive} from 'vue';
import {Notify} from 'quasar';
import {useRouter} from 'vue-router';
import {IConsultantOfferEdit} from 'src/models/ConsultantInterfaces';
import {createOfferRequest} from 'src/api/consultantRequests'
import RifgoBtn from 'components/custom/RifgoBtn.vue'

export default {
  name: 'EventCreatePage',
  components: {RifgoBtn, ConsultantOfferForm},
  setup: function () {
    const offer = reactive<Partial<IConsultantOfferEdit>>({description: ''});
    const router = useRouter();

    const submit = async () => {
      const createResponse = await createOfferRequest(<IConsultantOfferEdit>offer)

      if (createResponse.id) {
        Notify.create({
          message: 'Offer created',
          type: 'positive',
        })

        await router.push({
          name: 'consultant-offers'
        })
      }
    }

    return {
      submit,
      offer
    }
  }
}
</script>

<style lang="scss">
main {
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
}

</style>
