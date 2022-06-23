import { createGlobalState, useStorage } from '@vueuse/core'

export const stateScreenName = createGlobalState(
  () => useStorage('screen-name', '')
)

