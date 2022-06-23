

export interface IConsultant {
  id: number
  slug: string
  name: string
  title: string
  description: string
  promoDescription: string
  avatarUrl: string
  smm: {
    insta?: string,
    fb?: string,
    tg?: string,
  },
  // buttons: Array<>
}

export interface IConsultantEdit extends IConsultant {
  avatarFile: string | null
}

export interface IConsultantOffer {
  id: number
  price: number
  title: string
  subtitle: string
  description: string
  isEnabled: boolean
}

export interface IConsultantOfferEdit extends IConsultantOffer {
  calendlyEventType: string
}

export interface ICalandlyEventType {
  uri: string
  description_plain: string
  name: string
}

export interface IConsultantReview {
  id: number
  name: string
  text: string
  sessions: number
}

export interface IConsultantPeer {
  id: number
  name: string
  text: string
  peerConsultant: {
    name: string
    title: string
    slug: string
    avatarUrl: string
  }
}
