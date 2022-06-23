import {useI18n} from 'vue-i18n'

export function useGlobalLocale() {
  const { locale } = useI18n({ useScope: 'global' })

  const toggleLang = () => {
    if (locale.value === 'en-US') {
      locale.value = 'ru-RU'
    } else {
      locale.value = 'en-US'
    }
  }

  return {
    locale,
    toggleLang,
  }
}
