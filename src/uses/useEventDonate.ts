import {Ref} from 'vue'
import {QVueGlobals} from 'quasar/dist/types/globals'

export const useEventDonate = (opts: {
  isDonateShown?: Ref<boolean>,
  screenName: Ref<string>,
  $q: QVueGlobals,
}) => {
  const onDonateClick = () => {
    if (!opts.screenName.value) {
      opts.$q.dialog({
        title: 'What is your name?',
        message: 'Enter your name to add a comment',
        prompt: {
          model: '',
          type: 'text', // optional
          outlined: true,
          rounded: true,
        },
        cancel: true,
        persistent: true,
      }).onOk((data: string) => {
        opts.screenName.value = data;
        if (opts.isDonateShown) { opts.isDonateShown.value = true; }
      });
    }
    if (opts.isDonateShown) { opts.isDonateShown.value = true; }
  }

  return {
    onDonateClick,
  }
}
