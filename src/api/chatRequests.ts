import {httpApi} from 'src/services/httpApi';
import {IChatMessage} from 'src/modules/chat/chatModels';


export const getChatMessages = async (eventId: number) => {
  const result = await httpApi.get<{chatMessages: Array<IChatMessage>}>(
    '/chat/messages',
    {params: {eventId: eventId}}
  )

  return result.data.chatMessages
}

/**
 * Get current user chat
 *
 * @param registrationSecret
 */
export const getChatMe = async (registrationSecret: string): Promise<{isModerator: boolean}> => {
  const result = await httpApi.get<{me: {
      isModerator: boolean
    }}>(
    `/chat/${registrationSecret}/me`
  )

  return result.data.me;
}
