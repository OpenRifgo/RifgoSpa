// returned by global event bus (emitter)
export interface IChatMessageWebSocket {
  module: 'chat',
  event: 'donation' | 'message',
  data: IChatMessage
}

export interface IChatMessage {
  id: number,
  eventId: number,
  screenName: string,
  messageText: string,
  donationAmount: string,
  userId: number,
  isCurrentUser: boolean,
  messageType: string,
  userType: 'streamer' | 'moderator' | '',
  meta: {
    donationAmount: string
  }
}

// returned by global event bus (emitter)
export interface IViewersCountChanged {
  module: 'sub',
  event: 'broadcast:viewers-count-changed',
  data: {
    eventId: number
    viewersCount: number
  }
}

export interface IChatErrorMessage {
  module: 'chat',
  event: 'error',
  data: {
    message: string
  }
}

export interface IChatMessageRemoved {
  module: 'chat',
  event: 'messageRemoved',
  data: {
    chatMessage: {
      id: number
    }
  }
}
