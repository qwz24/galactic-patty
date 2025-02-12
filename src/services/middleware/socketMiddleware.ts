import {
  Middleware,
  MiddlewareAPI,
  Dispatch,
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  UnknownAction,
} from '@reduxjs/toolkit';
import { updateAccessToken } from '../../api/auth';
import { RootState } from '../store';
import { TMessage } from '../../types';
import { WSS_URL } from '../../constans/api';

type WebSocketActions<TMessage> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onConnected: ActionCreatorWithoutPayload;
  onDisconnected: ActionCreatorWithoutPayload;
  onMessageReceived: ActionCreatorWithPayload<TMessage>;
  onError: ActionCreatorWithPayload<Event>;
};

type WebSocketMiddlewareOptions = {
  actions: WebSocketActions<TMessage>;
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onMessage?: (event: MessageEvent) => void;
  onError?: (event: Event) => void;
};

function createWebSocketMiddleware(
  options: WebSocketMiddlewareOptions
): Middleware {
  let socket: WebSocket | null = null;

  return ((store: MiddlewareAPI<Dispatch<UnknownAction>, RootState>) =>
    (next: Dispatch<UnknownAction>) =>
    (action: UnknownAction) => {
      const { actions } = options;

      if (actions.connect.match(action)) {
        if (socket !== null) {
          console.warn('WebSocket is already connected.');
          return;
        }
        const url = action.payload;

        socket = new WebSocket(url);

        socket.onopen = event => {
          options.onOpen?.(event);
          store.dispatch(actions.onConnected());
        };

        socket.onclose = event => {
          options.onClose?.(event);
          store.dispatch(actions.onDisconnected());
          socket = null;
        };

        socket.onmessage = event => {
          options.onMessage?.(event);

          const message = JSON.parse(event?.data);
          if (message.message === 'Invalid or missing token') {
            updateAccessToken().then(accessToken => {
              const newUrl = `${WSS_URL}?token=${accessToken.replace(
                /^Bearer\s*/,
                ''
              )}`;

              store.dispatch(actions.connect(newUrl));
            });
          }

          store.dispatch(
            actions.onMessageReceived({
              orders: message.orders,
              total: message.total,
              totalToday: message.totalToday,
            })
          );
        };

        socket.onerror = event => {
          options.onError?.(event);
          store.dispatch(actions.onError(event));
        };
      }

      if (actions.disconnect.match(action)) {
        if (socket !== null) {
          socket.close();
        }
        socket = null;
      }

      return next(action);
    }) as Middleware;
}

export default createWebSocketMiddleware;
