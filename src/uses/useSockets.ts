import mitt from 'mitt';
import {nanoid} from 'nanoid'
import {IChatMessage} from 'src/modules/chat/chatModels';
export const websocketsEmitter = mitt();

function useWebsocketsFactory() {
  const socketSessionId = nanoid(32);
  const result: {
    socketInstance: WebSocket | null,
  } = {
    socketInstance: null,
  };

  const connect = () => {
    if ('WebSocket' in window) {
      console.log('WebSocket is supported by your Browser!')

      // const wsBackendUrl = env.backendUrl.replace(/^http/, 'ws')
      const loc = window.location;
      let wsBackendUrl = (loc.protocol === 'https:') ? 'wss:' : 'ws:';
      wsBackendUrl += '//' + loc.host;
      let ws: WebSocket | null = new WebSocket(`${wsBackendUrl}/socket?socketSessionId=${socketSessionId}`)

      try {
        ws.onopen = () => {
          console.log('socket is opened');

          websocketsEmitter.emit('ws:connected')

          // ws?.send(JSON.stringify({
          //   module: 'ws',
          //   event: 'opened',
          //   data: {
          //     socketSessionId,
          //   }
          // }));
        }

        ws.onmessage = (evt) => {
          const data = JSON.parse(evt.data) as {
            module: string // 'chat'
            event: string // 'message | donate'
            data: IChatMessage
          }

          console.log('ws message received', `${data.module}:${data.event}`, data)

          websocketsEmitter.emit(data.module, data)
          websocketsEmitter.emit(`${data.module}:${data.event}`, data)
        }

        ws.onclose = () => {
          // websocket is closed.
          console.log('Connection is closed');
          result.socketInstance = connect();

          // setTimeout(() => ws = connect(), 1000)
        }

        // sockets.state.ws = ws

        // gws = ws
        // Vue.prototype.$socket = ws

        return ws
      } catch (e) {
        setTimeout(() => ws = connect(), 1000);
        return ws
      }
    } else {

      // The browser doesn't support WebSocket
      console.log('WebSocket NOT supported by your Browser!');

      return null
    }
  }
  result.socketInstance = connect();

  return result;
}

export const websocketsInstance = useWebsocketsFactory();
// useWebsocketsInstance.connect();

// if (useWebsocketsInstance.socketInstance) {
//   setTimeout(() => {
//     useWebsocketsInstance.socketInstance?.send(JSON.stringify({message: 'hello!'}));
//   }, 100)
//
// } else {
//   console.log('socketInstance is null')
// }
