import {ComputedRef} from '@vue/reactivity'
import {computed} from 'vue'
import {useRoute} from 'vue-router'

export const useConsultantRoute = () => {
  const $route = useRoute();

  const slug = computed(() => String($route.params.slug));

  return {
    ...useConsultant(slug),
    $route,
  };
}

export const useConsultant = (slug: ComputedRef<string>) => {
  return {
    consultantPageRoute: computed(() => getConsultantPageRoute(slug.value)),
    slug
  }
}

// helpers

export const getConsultantPageRoute = (slug: string) => {
  return {name: 'consultant-page', params: {slug}};
}
