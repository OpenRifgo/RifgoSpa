import {useAuthInstance} from 'src/uses/useAuth'
import {computed} from 'vue'

export function useUserRouting() {
  const afterLoginRoute = computed(() => {
    if (useAuthInstance.isStreamer.value) return {name: 'creator-events'};

    return {name: 'consultant-offers'};
  });

  const afterLogoutRoute = computed(() => {
    return {name: 'root'};
  });

  const afterSignupRoute = computed(() => {
    return {name: 'onboarding'};
  });

  return {
    afterLoginRoute,
    afterLogoutRoute,
    afterSignupRoute,
  }
}
