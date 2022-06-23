import {websocketsInstance} from 'src/uses/useSockets'

export function useRealtimeChat() {
  const ws = websocketsInstance;

  const sendMessage = (messageText: string, data: {eventId: number, screenName: string, secret?: string}) => {
    ws.socketInstance?.send(JSON.stringify({
      module: 'chat',
      event: 'message',
      data: {
        screenName: data.screenName,
        messageText,
        eventId: data.eventId,
        secret: data.secret,
      }
    }));
  }

  return {
    sendMessage
  }
}
