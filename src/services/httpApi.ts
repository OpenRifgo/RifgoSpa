import axios from 'axios'
import {Notify} from 'quasar'
import {env} from 'src/services/Env'

export const httpApi = axios.create({
  withCredentials: true,
  baseURL: `${env.backendUrl}/api/`
})

httpApi.interceptors.response.use(
  (response) => response,
  (error: {response: {data?: {error?: string}, code?: number}}) => {
    let errorMessage = '';
    try {
      const data = error.response.data;
      errorMessage = data?.error || `Error code ${error.response.code || 'unknown'}`;
    } catch (e) {
      errorMessage = 'Exception occurred';
    }

    Notify.create({
      message: errorMessage,
      type: 'negative',
    });

    throw error;
  }
);
