import {api} from 'boot/axios';
import {IEvent} from 'src/models/EventModels';
import {IUser} from 'src/uses/useAuth';

export const getEventById = async (id: string) => {
  const response = await api.get<{event: IEvent}>(`/api/creator/events/${id}`)

  return response.data.event
}

export const eventCreateRequest = async (event: IEvent) => {
  const response = await api.post<{event: IEvent}>('/api/creator/events', event);
  return response.data;
}

export const eventUpdateRequest = async (event: IEvent) => {
  const response = await api.put<{event: IEvent}>('/api/creator/events', event);
  return response.data;
}

export const userHasAgreeRequest = async (hasAgreeTerms: boolean) => {
  const response = await api.put<{user: IUser}>('/api/creator/user', {hasTermsAgree: hasAgreeTerms});
  return response.data.user;
}

export const eventUpdateFinalStateRequest = async (eventId: number) => {
  const response = await api.patch<{event: IEvent}>(`/api/creator/events/${eventId}`);
  return response.data;
}
