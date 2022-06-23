import {computed, Ref, ref} from 'vue'

export default function (defRef: Ref<boolean | undefined>, def: boolean) {
  // hidden state
  const state = ref<boolean | null>(null);

  return computed<boolean>({
    get: () => {
      if (state.value === null) {
        return defRef.value === undefined ? def : Boolean(defRef.value);
      }
      return state.value;
    },
    set: (val: boolean) => state.value = Boolean(val)
  });
}
