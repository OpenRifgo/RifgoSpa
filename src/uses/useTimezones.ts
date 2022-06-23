import {api} from 'boot/axios'
import {ref} from 'vue'

export interface ITimezoneInfo {name: string}

export function useTimezones() {
  const timezonesLoaded = ref(false);
  const timezones = ref<ITimezoneInfo[]>([]);

  const timezonesRequest = async () => {
    const response = await api.get<{timezones: ITimezoneInfo[]}>('/api/directories/timezones');
    return response.data;
  }

  const timezonesLoad = async () => {
    const timezoneResult = await timezonesRequest();
    timezones.value = timezoneResult.timezones;
    timezonesLoaded.value = true;
  }

  return {
    timezonesRequest,
    timezonesLoad,
    timezonesLoaded,
    timezones,
  }
}
