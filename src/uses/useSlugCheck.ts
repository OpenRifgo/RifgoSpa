import {computed, ref, watch} from 'vue'
import {getSlugIsAvailable} from 'src/api/consultantRequests'

export const useSlugCheck = () => {
  const slug = ref('');
  const slugIsAvailable = ref(false);
  const slugIsChecking = ref(false);
  let slugCheckingQueued = '';
  const slugErrorMessage = computed(() => {
    if (slugIsChecking.value) return 'Please wait...';
    if (slug.value.length <= 2) return 'Minimum length is 3 symbols';
    if (!slugIsAvailable.value) return 'Name is not available';
    return '';
  });

  const getAvailableSlug = async (slugFieldText: string) => {
    try {
      // queue request if slug is already in checking state
      if (slugIsChecking.value == true) return slugCheckingQueued = slugFieldText;

      slugIsChecking.value = true;
      const slugIsEmpty = await getSlugIsAvailable(slugFieldText);
      slugIsAvailable.value = slugIsEmpty.isAvailable;
      slugIsChecking.value = false;

      // send new request if new text was queued during current request
      if (slugCheckingQueued) {
        void getAvailableSlug(slugCheckingQueued);
        slugCheckingQueued = '';
      }
    } catch (e) {
      console.error(e);
      slugIsChecking.value = false;
      slugCheckingQueued = '';
    }
  }
  watch(
    slug,
    async (val) => val && await getAvailableSlug(val),
  );

  return {
    slug,
    slugIsAvailable,
    slugIsChecking,
    slugErrorMessage,
  }
}
