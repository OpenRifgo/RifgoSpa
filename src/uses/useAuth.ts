import {httpApi} from 'src/services/httpApi'
import {computed, ref} from 'vue'
import mixpanel from 'mixpanel-browser'
import {env} from 'src/services/Env'

export interface IUser {
  id: number,
  name: string,
  email: string,
  status: 'New' | 'Active' | 'Streamer' | 'PlatformAdmin',
  hasTermsAgree: boolean
}

export function useAuth() {
  const me = ref<IUser | null>(null);
  const loading = ref(false);
  const loaded = ref(false);

  const callAuthMe = async () => {
    const result = await httpApi.post<{
      loggedIn: boolean,
      user: IUser | null
    }>('auth/me', {}, {withCredentials: true});

    if (result.data?.loggedIn && result.data?.user?.id) {
      const userId = result.data?.user?.id;
      const uniqueId = env.environment === 'production' ? `${userId}` : `${env.environment}:${userId}`;
      mixpanel.identify(uniqueId);
    }

    return result;
  }

  const logOut = async () => {
    return await httpApi.post('auth/logout', {}, {withCredentials: true});
  }

  const loadAuthMe = async () => {
    loading.value = true;
    const result = await callAuthMe();
    loading.value = false;
    loaded.value = true;

    if (result.data.loggedIn) {
      me.value = result.data.user
    } else {
      me.value = null
    }
  }

  const isPlatformAdmin = () => !loading.value && me.value?.status === 'PlatformAdmin';
  const isStreamer = computed(() => !loading.value && me.value?.status === 'Streamer');

  return {
    callAuthMe,
    loadAuthMe,
    logOut,
    me,
    loading,
    loaded,
    isPlatformAdmin,
    isStreamer,
  }
}

export function useAuthFactory() {
  const auth = useAuth();

  void auth.loadAuthMe();

  return auth;
}

export const useAuthInstance = useAuthFactory()
