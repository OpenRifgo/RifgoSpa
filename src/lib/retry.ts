export const retryUntilSuccess = (
  handler: () => void,
  timeout: number,
  opts: {
    nextRetryMultiplier?: number,
    preCheck?: () => boolean,
  } = {}
) => {
  const nextRetryMultiplier = opts.nextRetryMultiplier || 1.4;
  const preCheck = opts.preCheck || (() => true);

  try {
    if (!preCheck()) {
      setTimeout(() => retryUntilSuccess(handler,timeout * nextRetryMultiplier, {
        nextRetryMultiplier,
        preCheck,
      }), timeout);
    } else {
      handler();
    }
  } catch (e) {
    console.error(e);

    setTimeout(() => retryUntilSuccess(handler,timeout * nextRetryMultiplier, {
      nextRetryMultiplier,
      preCheck,
    }), timeout);
  }
}

export const retryUntilWs = (
  handler: () => void,
  timeout: number,
  ws: WebSocket,
  opts: {
    nextRetryMultiplier?: number,
  } = {}
) => {
  retryUntilSuccess(
    handler,
    timeout,
    {
      nextRetryMultiplier: opts.nextRetryMultiplier,
      preCheck: () => !ws || ws?.readyState !== ws?.OPEN
    }
  );
}
