import {httpApi} from 'src/services/httpApi';
import {IEvent} from 'src/models/EventModels';
import {IStreamer} from 'src/models/StreamerModels';

export async function getRecommendedEvents(regSecret: string) {
  return httpApi.get<{ myEvents: Array<IEvent>, recommendedEvents: Array<IEvent> }>(`registered/${regSecret}/recommended`);
}

export const getStreamerBySecret = async (secret: string) => {
  const response = await httpApi.get<{ streamer: IStreamer }>(`registered/${secret}/streamer`)
  return response.data.streamer
}
