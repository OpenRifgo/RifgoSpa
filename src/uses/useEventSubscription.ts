import {websocketsEmitter, websocketsInstance} from 'src/uses/useSockets'
import {TEmptyObject} from 'src/lib/commonTypes'
import {retryUntilWs} from 'src/lib/retry'

const eventSubscriptionsBySecret: Record<string, {counter: number}> = {};

export const useEventSubscriptionFactory = (opts: {secret: string}) => {
  const ws = websocketsInstance;

  const eventSubscribe = () => {
    ws.socketInstance?.send(JSON.stringify({
      module: 'sub',
      event: 'subscribe:event',
      data: {
        secret: opts.secret,
      }
    }));
  }

  // handle reconnect
  const onWsConnect = () => {
    eventSubscribe();
  }

  return {
    onMounted: () => {
      if (!eventSubscriptionsBySecret[opts.secret]) {
        eventSubscriptionsBySecret[opts.secret] = {
          counter: 1
        }
      }

      // subscribe to emitter only when first component is mounted
      if (eventSubscriptionsBySecret[opts.secret].counter == 1) {
        if (ws.socketInstance) retryUntilWs(eventSubscribe, 10, ws.socketInstance);
        websocketsEmitter.on<TEmptyObject>('ws:connected', onWsConnect);
      }
    },
    onUnmounted: () => {
      eventSubscriptionsBySecret[opts.secret].counter-= 1;

      // unsubscribe from emitter only if all components are unmounted
      if (eventSubscriptionsBySecret[opts.secret].counter <= 0) {
        websocketsEmitter.off<TEmptyObject>('ws:connected', onWsConnect);
      }
    }
  }
}
