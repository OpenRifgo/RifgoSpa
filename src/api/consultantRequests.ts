import {httpApi} from 'src/services/httpApi'
import {
  ICalandlyEventType,
  IConsultantEdit,
  IConsultantOffer,
  IConsultantOfferEdit,
} from 'src/models/ConsultantInterfaces'

export const getConsultantProfile = async () => {
  const response = await httpApi.get<{consultant: IConsultantEdit}>('/consultant/profile');
  return response.data.consultant;
};

export const getSlugIsAvailable = async (slug: string) => {
  const response = await httpApi.get<{isAvailable: boolean, validSlug: string}>(`/consultant/slug/${slug}/isAvailable`)
  return response.data
}

export const updateConsultantProfile = async (data: IConsultantEdit) => {
  const response = await httpApi.put<{consultant: IConsultantEdit}>('/consultant/profile', data);
  return response.data.consultant;
};

export const getConsultantOffers = async () => {
  const response = await httpApi.get<{offers: Array<IConsultantOffer>}>('/consultant/offers');
  return response.data.offers;
};

export const createOfferRequest = async (data: IConsultantOfferEdit) => {
  const response = await httpApi.post<{offer: IConsultantOfferEdit}>('/consultant/offers', data);
  return response.data.offer;
}

export const editOfferRequest = async (data: IConsultantOfferEdit) => {
  const response = await httpApi.put<{offer: IConsultantOfferEdit}>('/consultant/offers', data);
  return response.data.offer;
}

export const getCalendlyEventTypes = async (): Promise<Array<ICalandlyEventType>> => {
  const response = await httpApi.post<Array<ICalandlyEventType>>('/consultant/calendlyEventTypes', {});
  return response.data;
}
