<template>

  <main class="consultant_wrapper">
    <div class="avatar_wrapper">
      <q-avatar size="48px">
        <q-img
          :src="consultant.avatarUrl ? `/static/uploads/${consultant.avatarUrl}` : '/preview/avatar_placeholder.svg'"
          :ratio="1"
          fit="cover"
        />
      </q-avatar>
    </div>
    <h1>{{ consultant.name }}</h1>
    <p class="consultant_title">{{ consultant.title }}</p>

    <div
      class="flex justify-center"
    >
      <div
        v-if="peersCount > 0"
        class="q-px-sm cursor-pointer"
        @click="onPeersClick"
      >
        <div class="text-bold" style="font-size: 1.25rem">☝️ {{ peersCount }}</div>
        <div style="font-size: 0.75rem">I recommend</div>
      </div>

      <div
        v-if="reviewsCount > 0"
        class="q-px-sm cursor-pointer"
        @click="onReviewsClick"
      >
        <div class="text-bold" style="font-size: 1.25rem">👍 {{ reviewsCount }}</div>
        <div style="font-size: 0.75rem">Reviews</div>
      </div>
    </div>

    <p class="consultant_description" v-html="consultant.description" />
    <q-card
      v-if="isRecommendMeEnabled && consultant.promoDescription"
      flat class="consultant_recommended_me"
    >
      <q-card-section>
        <h3>Recommend me!</h3>
        <p class="consultant_recommended--promo_text" v-html="consultant.promoDescription" />
        <q-btn
          outline no-caps style="color: #615DFF"
          @click="onReferralLinkClick"
        >
          Get your link to recommend {{consultant.name}}
        </q-btn>
      </q-card-section>
    </q-card>

    <div
      v-if="consultant.smm"
      class="flex justify-center q-mb-sm"
    >
      <template
        v-for="(soc, socIdx) in ['tg', 'insta', 'fb']"
        v-bind:key="socIdx"
      >
        <div
          v-if="consultant.smm[soc]"
        >
          <q-btn
            :icon="helpers.getSocialIcon(soc)"
            dense round flat
            type="a"
            :href="consultant.smm[soc]"
            target="_blank"
          />
        </div>
      </template>
    </div>

    <div
      v-if="offers.length > 0"
      class="q-pt-sm"
    >
      <h2 class="consultant_my_session_title">
        Meet with {{ consultant.name }}
      </h2>
      <q-card
        class="consultant_my_session q-mb-md"
        flat
        v-for="(offer, offerIdx) in offers"
        v-bind:key="offerIdx"
      >
        <q-card-section>
          <span>{{ offer.subtitle }}</span>
          <h3>{{ offer.title }}</h3>
          <p
            class="consultant_offer_description"
            v-html="offer.description"
          />

          <q-btn
            no-caps
            flat
            style="background-color: #615DFF; color: #FFFFFF"
            @click="onBookClick(offer.id)"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 12C10.1978 12 10.3911 11.9414 10.5556 11.8315C10.72 11.7216 10.8482 11.5654 10.9239 11.3827C10.9996 11.2 11.0194 10.9989 10.9808 10.8049C10.9422 10.6109 10.847 10.4327 10.7071 10.2929C10.5673 10.153 10.3891 10.0578 10.1951 10.0192C10.0011 9.98063 9.80004 10.0004 9.61732 10.0761C9.43459 10.1518 9.27841 10.28 9.16853 10.4444C9.05865 10.6089 9 10.8022 9 11C9 11.2652 9.10536 11.5196 9.29289 11.7071C9.48043 11.8946 9.73478 12 10 12ZM15 12C15.1978 12 15.3911 11.9414 15.5556 11.8315C15.72 11.7216 15.8482 11.5654 15.9239 11.3827C15.9996 11.2 16.0194 10.9989 15.9808 10.8049C15.9422 10.6109 15.847 10.4327 15.7071 10.2929C15.5673 10.153 15.3891 10.0578 15.1951 10.0192C15.0011 9.98063 14.8 10.0004 14.6173 10.0761C14.4346 10.1518 14.2784 10.28 14.1685 10.4444C14.0586 10.6089 14 10.8022 14 11C14 11.2652 14.1054 11.5196 14.2929 11.7071C14.4804 11.8946 14.7348 12 15 12ZM10 16C10.1978 16 10.3911 15.9414 10.5556 15.8315C10.72 15.7216 10.8482 15.5654 10.9239 15.3827C10.9996 15.2 11.0194 14.9989 10.9808 14.8049C10.9422 14.6109 10.847 14.4327 10.7071 14.2929C10.5673 14.153 10.3891 14.0578 10.1951 14.0192C10.0011 13.9806 9.80004 14.0004 9.61732 14.0761C9.43459 14.1518 9.27841 14.28 9.16853 14.4444C9.05865 14.6089 9 14.8022 9 15C9 15.2652 9.10536 15.5196 9.29289 15.7071C9.48043 15.8946 9.73478 16 10 16ZM15 16C15.1978 16 15.3911 15.9414 15.5556 15.8315C15.72 15.7216 15.8482 15.5654 15.9239 15.3827C15.9996 15.2 16.0194 14.9989 15.9808 14.8049C15.9422 14.6109 15.847 14.4327 15.7071 14.2929C15.5673 14.153 15.3891 14.0578 15.1951 14.0192C15.0011 13.9806 14.8 14.0004 14.6173 14.0761C14.4346 14.1518 14.2784 14.28 14.1685 14.4444C14.0586 14.6089 14 14.8022 14 15C14 15.2652 14.1054 15.5196 14.2929 15.7071C14.4804 15.8946 14.7348 16 15 16ZM5 12C5.19778 12 5.39112 11.9414 5.55557 11.8315C5.72002 11.7216 5.84819 11.5654 5.92388 11.3827C5.99957 11.2 6.01937 10.9989 5.98079 10.8049C5.9422 10.6109 5.84696 10.4327 5.70711 10.2929C5.56725 10.153 5.38907 10.0578 5.19509 10.0192C5.00111 9.98063 4.80004 10.0004 4.61732 10.0761C4.43459 10.1518 4.27841 10.28 4.16853 10.4444C4.05865 10.6089 4 10.8022 4 11C4 11.2652 4.10536 11.5196 4.29289 11.7071C4.48043 11.8946 4.73478 12 5 12ZM17 2H16V1C16 0.734784 15.8946 0.48043 15.7071 0.292893C15.5196 0.105357 15.2652 0 15 0C14.7348 0 14.4804 0.105357 14.2929 0.292893C14.1054 0.48043 14 0.734784 14 1V2H6V1C6 0.734784 5.89464 0.48043 5.70711 0.292893C5.51957 0.105357 5.26522 0 5 0C4.73478 0 4.48043 0.105357 4.29289 0.292893C4.10536 0.48043 4 0.734784 4 1V2H3C2.20435 2 1.44129 2.31607 0.87868 2.87868C0.316071 3.44129 0 4.20435 0 5V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17V5C20 4.20435 19.6839 3.44129 19.1213 2.87868C18.5587 2.31607 17.7956 2 17 2V2ZM18 17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18H3C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V8H18V17ZM18 6H2V5C2 4.73478 2.10536 4.48043 2.29289 4.29289C2.48043 4.10536 2.73478 4 3 4H17C17.2652 4 17.5196 4.10536 17.7071 4.29289C17.8946 4.48043 18 4.73478 18 5V6ZM5 16C5.19778 16 5.39112 15.9414 5.55557 15.8315C5.72002 15.7216 5.84819 15.5654 5.92388 15.3827C5.99957 15.2 6.01937 14.9989 5.98079 14.8049C5.9422 14.6109 5.84696 14.4327 5.70711 14.2929C5.56725 14.153 5.38907 14.0578 5.19509 14.0192C5.00111 13.9806 4.80004 14.0004 4.61732 14.0761C4.43459 14.1518 4.27841 14.28 4.16853 14.4444C4.05865 14.6089 4 14.8022 4 15C4 15.2652 4.10536 15.5196 4.29289 15.7071C4.48043 15.8946 4.73478 16 5 16Z"
                fill="white"/>
            </svg>
            {{ formatBookButton(offer) }}
          </q-btn>
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="paymentDialogOpened">
      <book-dialog
        :consultant-slug="slug"
        :offer="currentOffer"
      />
    </q-dialog>

    <q-dialog v-model="promoDialogOpened">

      <referral-dialog
        :consultant-slug="slug"
      />

    </q-dialog>

    <q-dialog v-model="linkSentDialogOpened">

      <q-card
        style="min-width: 272px"
      >
        <q-card-section
          class="text-center text-green q-pa-none"
        >
          <q-icon
            class="q-pt-lg q-pb-sm"
            name="fas fa-check-circle"
            size="xl"
          />
        </q-card-section>

        <q-card-section
          style="max-height: 50vh"
          class="text-bold text-center"
        >
          <p>
            We have sent<br/>
            a confirmation link<br/>
            to {{email}}
          </p>

          <rifgo-btn
            class="full-width"
            label="OK"
            @click="linkSentDialogOpened = false"
          />
        </q-card-section>
      </q-card>

    </q-dialog>

  </main>
</template>

<script lang="ts">

import {useRoute, useRouter} from 'vue-router';
import {computed, defineComponent, onMounted, ref, watch} from 'vue';
import {
  getConsultant,
  getConsultantOffers, getConsultantPeers, getConsultantReviews,
} from 'src/api/publicRequests';
import {IConsultant, IConsultantOffer, IConsultantPeer, IConsultantReview} from 'src/models/ConsultantInterfaces';
import {getSocialIcon, validateEmail} from 'src/lib/helpers'
import ReferralDialog from 'components/consultant/ReferralDialog.vue'
import BookDialog from 'components/consultant/BookDialog.vue'
import RifgoBtn from 'components/custom/RifgoBtn.vue'
import {app} from 'src/services/App'

export default defineComponent({
  components: {RifgoBtn, BookDialog, ReferralDialog},
  setup() {
    const $route = useRoute();
    const $router = useRouter();
    const slug = computed(() => String($route.params.slug));
    const offers = ref<Array<IConsultantOffer>>([]);
    const currentOffer = ref<IConsultantOffer | null>(null);
    const consultant = ref<Partial<IConsultant>>({});
    const reviews = ref<Array<IConsultantReview>>([]);
    const peers = ref<Array<IConsultantPeer>>([]);

    // const paymentForId=g79AVbCQs1m5WTG4tWujt3c4KZT9MJ7T&paymentFor=ConsultantOffer

    const init = () => {
      void getConsultantOffers(slug.value)
        .then(data => offers.value = data.filter(offer => offer.isEnabled));

      void getConsultant(slug.value)
        .then(data => consultant.value = data);

      void getConsultantReviews(slug.value)
        .then(data => reviews.value = data);

      void getConsultantPeers(slug.value)
        .then(data => peers.value = data);
    }

    onMounted(() => {
      init();

      // process route params on initialization
      void onRouteParamsChanged();
    });

    const onRouteParamsChanged = async () => {
      if ($route.query.email) {
        email.value = String($route.query.email)
      }
      if ($route.query.paymentFor === 'ConsultantOffer' && $route.query.paymentForId) {
        await $router.replace({params: {slug: slug.value}});
        linkSentDialogOpened.value = true;
      }
    }

    watch(
      () => $route.query,
      onRouteParamsChanged,
      {deep: true}
    )

    watch(slug, init);

    const paymentDialogOpened = ref(false);
    const linkSentDialogOpened = ref(false);
    const promoDialogOpened = ref(false);
    const promoDialogEmail = ref('');
    const promoDialogTab = ref('init');

    const onBookClick = (offerId: number) => {
      currentOffer.value = offers.value.filter(v => v.id == offerId)[0];
      paymentDialogOpened.value = true;

      app.eventNotifyService.notify('consultant:book:click', {
        slug: slug.value,
        offerId: currentOffer.value.id,
        offerTitle: currentOffer.value.title,
        offerPrice: currentOffer.value.price,
      });
    }

    const onReferralLinkClick = () => {
      promoDialogOpened.value = true;

      app.eventNotifyService.notify('consultant:referralLink:click', {
        slug: slug.value,
      });
    }

    const onReviewsClick = async () => {
      await $router.push({name: 'consultant-reviews-page', params: {slug: slug.value}})
    }

    const onPeersClick = async () => {
      await $router.push({name: 'consultant-peers-page', params: {slug: slug.value}})
    }

    const email = ref('');

    // const isRecommendMeEnabled = computed(() => !!$route.meta.showRecommendMe);
    //temporary: always enabled
    const isRecommendMeEnabled = true;

    return {
      slug,
      spend: ref(30),
      onBookClick,
      onReferralLinkClick,
      onReviewsClick,
      onPeersClick,

      paymentDialogOpened,
      promoDialogOpened,
      linkSentDialogOpened,

      promoDialogEmail,
      promoDialogTab,

      offers,
      consultant,
      currentOffer,
      peers,
      reviews,

      isRecommendMeEnabled,

      reviewsCount: computed(() => (reviews.value || []).length),
      peersCount: computed(() => (peers.value || []).length),

      formatBookButton: (offer: IConsultantOffer) =>
        offer.price > 0 ? `Book for $${offer.price}` : 'Book for free',

      helpers: {
        validateEmail,
        getSocialIcon,
      },
      email
    }
  },
});
</script>

<style lang="scss" scoped>
main.consultant_wrapper {
  padding: 0 17px;
  width: 375px;
  margin: 0 auto;
  text-align: center;
  color: #333333;
  line-height: 20px;
  letter-spacing: 0.3px;
  font-weight: 400;

  div.avatar_wrapper {
    display: flex;

    > div {
      margin: 48px auto 0;
    }
  }

  h1 {
    font-size: 18px;
    font-weight: 800;
    margin: 13px 0 0;
    line-height: 20px;
    letter-spacing: 0.3px;
  }

  p.consultant_title {
    margin: 5px 0 12px;
    font-size: 16px;
  }

  p.consultant_description {
    line-height: 24px;
    font-size: 16px;
    margin: 12px 0 12px;
  }

  div.consultant_recommended_me {
    border: 1px solid #EBEBEB;
    border-radius: 12px;
    padding: 24px 24px 38px;
    margin-bottom: 32px;

    div.q-card__section {
      padding: 0;

      h3 {
        margin: 0 0 15px;
        line-height: 24px;
        font-size: 24px;
        letter-spacing: 0.3px;
        font-weight: 700
      }

      p.consultant_recommended--promo_text {
        color: #666666;
        letter-spacing: -0.4px;
        font-size: 14px;
        margin-bottom: 24px;
      }

      button {
        width: 100%;
        border-radius: 6px;

        span {
          color: #615DFF;
        }
      }
    }
  }

  h2.consultant_my_session_title {
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.3px;
    line-height: 20px;

    margin: 0 0 13px;
    text-align: left;
  }

  div.consultant_my_session {

    text-align: left;
    padding: 24px;
    border: 1px solid #EBEBEB;
    border-radius: 12px;

    div.q-card__section {
      padding: 0;

      span {
        color: #9C9C9C;
        line-height: 24px;
        font-weight: 700;
        font-size: 12px;
        text-transform: uppercase;
      }

      h3 {
        margin: 3px 0 11px;
        font-size: 24px;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: 0.3px;
      }

      p.consultant_offer_description {
        color: #666666;
        letter-spacing: -0.4px;
        font-size: 14px;
        margin-bottom: 26px;
      }

      button {
        width: 100%;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        border-radius: 6px;

        svg {
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
