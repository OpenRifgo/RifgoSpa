export interface IEvent {
  id: number
  accessType?: 'free' | 'paid'
  name: string
  description: string
  speakerName: string
  speakerTitle: string
  speakerAvatarUrl: string
  speakers?: { img: string; name: string; title: string; }[]
  date: string
  timeFrom: string
  timeTo: string
  amount: number
  isFinallyStoped: true
  streamingBroadcastLink: string
  eventLinks: [
    { uid: string }
  ]
}


export interface IEventWithPublicEventLink extends IEvent {
  publicEventLink: {
    uid: string
  }
}

export interface IEventRegistration {
  id: number
  paid: boolean
  secret: string
}

export interface IEventSettingsPaidQuestion {
  type: 'paidQuestion',
  name: string,
  smLabel?: string,
  price?: number,
  color?: string,
  lgImg?: string,
  actionText?: string,
  commentInputPlaceholder?: string,
  donationText?: string,
  private?: boolean,
  textarea?: boolean,
}

export interface IEventSettingsLink {
  type: 'link',
  name: string,
  url: string,
  color?: string,
}

export interface IEventSettingsImage {
  type: 'image',
  lgImg?: string,
}

export type IEventCustomButton = IEventSettingsPaidQuestion | IEventSettingsLink | IEventSettingsImage;

export interface IPublicEventSettings {
  shopUrl?: string
  showDonate?: string
  initOpenedChat?: boolean // default: true
  calendar?: {
    url?: string
  },
  myLinks?: {
    enabled?: boolean
    text?: string
  },
  leftTop: Array<IEventCustomButton>,
  leftBottom: Array<IEventCustomButton>,
  overlayLeftBottom: Array<IEventCustomButton>,
}

export interface IEventPublic extends IEvent {
  settings: IPublicEventSettings
}

