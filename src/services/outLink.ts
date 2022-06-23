import {encodeQueryData} from 'src/lib/helpers'
import {env} from 'src/services/Env'

export interface IOutLinkOpts {
  source: string
  sourceId: string
}

export function outLink(url: string, opts: IOutLinkOpts) {
  const query = encodeQueryData({
    url,
    source: opts.source,
    sourceId: opts.sourceId,
  });

  return `${env.backendUrl}/out?${query}`;
}
