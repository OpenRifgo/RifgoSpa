import OT, {Session} from '@opentok/client'

export interface IUseVideoSession {
  session: Session,
}

export interface IUseVideoSessionProps {
  apiKey: string,
  sessionId: string,
  token: string
}

export let useVideoSessionInstance: Partial<IUseVideoSession> = {};

export const useVideoSessionFactory = (props: IUseVideoSessionProps) => {
  const session = OT.initSession(String(props.apiKey), props.sessionId);
  session.connect(props.token, err => {
    if (err) {
      console.error(err)
      // errorHandler(err);
    } else {
      console.log('Connected to the session.');
    }
  });
  session.on('streamCreated', () => {
    console.log('streamCreated')
    // this.streams.push(event.stream);
  });
  session.on('streamDestroyed', () => {
    console.log('streamDestroyed')
    // const idx = this.streams.indexOf(event.stream);
    // if (idx > -1) {
    //   this.streams.splice(idx, 1);
    // }
  });

  return {
    session,
  }
}

export const useVideoSession = (props: IUseVideoSessionProps) => {
  if (!useVideoSessionInstance) {
    useVideoSessionInstance = useVideoSessionFactory(props);
  }

  return useVideoSessionInstance;
}

export const globalPublisher = { publisher: null };
