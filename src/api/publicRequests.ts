import {IEvent} from 'src/models/EventModels';
import {httpApi} from 'src/services/httpApi';
import {IStreamer} from 'src/models/StreamerModels';
import {IConsultant, IConsultantOffer, IConsultantPeer, IConsultantReview} from 'src/models/ConsultantInterfaces';
import {AxiosResponse} from 'axios'

export const sendRegistrationEmail = async (eventUid: string, email: string) => {
  await httpApi.post<{ event: IEvent }>(`public/events/${eventUid}/register`, {
    email
  })
}

export const getEventRequest = async (eventUid: string) => {
  const response = await httpApi.get<{ event: IEvent }>(`public/events/${eventUid}`)
  return response.data.event
}

export const getStreamerBySlug = async (slug: string) => {
  const response = await httpApi.get<{ streamer: IStreamer }>(`public/streamers/${slug}`)
  return response.data.streamer
}

export const getStreamerRecommendation = async (slug: string) =>
  await httpApi.get<{ myEvents: Array<IEvent>, recommendedEvents: Array<IEvent> }>(
    `public/streamers/${slug}/recommended`,
  );

export interface PaymentData {
  clientSecret: string
  stripeAccountId: string
  stripePublicKey: string
}

export const getPaymentDataBySecret = async (secret: string): Promise<AxiosResponse<PaymentData>> =>
  await httpApi.get<PaymentData>(`public/paywall/${secret}/data`)

export const getConsultantOffers = async (consultantSlug: string) => {
  const response = await httpApi.get<{offers: Array<IConsultantOffer>}>(`/public/consultant/${consultantSlug}/offers`);
  return response.data.offers;
};

export const getConsultantReviews = async (consultantSlug: string) => {
  const response = await httpApi.get<{reviews: Array<IConsultantReview>}>(`/public/consultant/${consultantSlug}/reviews`);
  return response.data.reviews;
};

export const getConsultantPeers = async (consultantSlug: string) => {
  const response = await httpApi.get<{peers: Array<IConsultantPeer>}>(`/public/consultant/${consultantSlug}/peers`);
  return response.data.peers;
};

export interface IConsultantReferralLink {
  uid: string,
  url: string,
}

export interface IConsultantBooking {
  uid: string
  email: string
  offer: {id: number}
  consultant: {slug: string}
  price: number
  paid: boolean
}

export const createConsultantReferralLink = async (consultantSlug: string, data: {email: string}) => {
  const response = await httpApi.post<{referralLink: IConsultantReferralLink}>(`/public/consultant/${consultantSlug}/referralLink`, data);
  return response.data.referralLink;
};

export const createConsultantBooking = async (consultantSlug: string, offerId: number, data: {email: string, referralUid?: string}): Promise<IConsultantBooking> => {
  const response = await httpApi.post<{booking: IConsultantBooking}>(`/public/consultant/${consultantSlug}/offers/${offerId}/booking`, data);
  return response.data.booking;
};

export const getConsultant = async (consultantSlug: string) => {
  const response = await httpApi.get<{consultant: IConsultant}>(`/public/consultant/${consultantSlug}`);
  return response.data.consultant;
};

export const createPaymentFor = async (
  paymentFor: string, paymentForId: string | number, amount: number, title: string
): Promise<PaymentData> => {
  const result = await httpApi.post<PaymentData>('/public/payment', {
    paymentFor,
    paymentForId,
    amount,
    title,
  });
  return result.data;
}

export enum ShortLinkTypes {
  ConsultantReferralLink = 'ConsultantReferralLink',
  ConsultantSlug = 'ConsultantSlug',
  StreamerSlug = 'StreamerSlug',
}

export type IShortLinkData = {
  shortLinkType: ShortLinkTypes.ConsultantSlug | ShortLinkTypes.StreamerSlug
  uid: string
} | {
  shortLinkType: ShortLinkTypes.ConsultantReferralLink,
  uid: string,
  consultantReferralLink: {
    uid: string,
    consultant: {
      slug: string,
    }
  }
}

export const getShortLink = async (uid: string): Promise<IShortLinkData> => {
  const response = await httpApi.get<{shortLink: IShortLinkData}>(`/public/shortLink/${uid}`);
  return response.data.shortLink;
}
