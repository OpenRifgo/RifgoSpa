<template>
  <div
    v-if="!loading && notFound"
  >
    Target page is not found
  </div>

  <q-inner-loading :showing="loading" />
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref} from 'vue';
import {getShortLink, IShortLinkData, ShortLinkTypes} from 'src/api/publicRequests'
import {useRoute, useRouter} from 'vue-router'
import {useReferralTracking} from 'src/uses/useReferralTracking'
import {app} from 'src/services/App'

export default defineComponent({
  name: 'ShortLinkPage',
  components: {},
  setup() {
    const $route = useRoute();
    const $router = useRouter();
    const $referralTracking = useReferralTracking();

    const loading = ref(true);
    const shortLink = reactive<Partial<IShortLinkData>>({});
    const notFound = ref(true);

    onMounted(async () => {
      Object.assign(shortLink, await getShortLink(String($route.params.uid)));
      if (!shortLink.uid) return console.error('No short link UID');

      const uid = String(shortLink.uid);

      if (shortLink.shortLinkType === ShortLinkTypes.ConsultantReferralLink) {
        const slug = shortLink.consultantReferralLink?.consultant?.slug;
        if (!slug) return console.error('Consultant slug is not found');

        // store short link in session
        $referralTracking.addReferral(slug, uid);

        notFound.value = false;
        await $router.push({name: 'consultant-page', params: {slug}});
      } else if (shortLink.shortLinkType === ShortLinkTypes.StreamerSlug) {
        notFound.value = false;
        await $router.push({name: 'streamer-page', params: {slug: shortLink.uid}});
      } else if (shortLink.shortLinkType === ShortLinkTypes.ConsultantSlug) {
        notFound.value = false;
        await $router.push({name: 'consultant-page', params: {slug: shortLink.uid}});
      }

      app.eventNotifyService.notify('shortLink', {
        uid,
      });

      loading.value = false;
    });

    return {
      loading,
      shortLink,
      notFound,
    }
  }
});
</script>
