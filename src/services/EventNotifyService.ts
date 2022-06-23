import mixpanel from 'mixpanel-browser'
import {RouteLocation} from 'vue-router'

export interface Dict {
  [key: string]: unknown;
}

export class EventNotifyService {
  // custom event notification
  notify(eventName: string, properties?: Dict) {
    //todo: extract to MixpanelService
    mixpanel.track(eventName, properties);
  }

  // route changed notification
  vueRouteChanged(to: RouteLocation, from: RouteLocation) {
    const eventName = to.name ? `route:${to.name.toString()}` : `path:${to.path.toString()}`;

    //todo: extract to MixpanelService
    mixpanel.track(eventName, {
      name: to.name,
      query: to.query,
      params: to.params,
      path: to.path,
      hash: to.hash,
      meta: to.meta,
      from: from ? {
        name: from.name,
        query: from.query,
        params: from.params,
        path: from.path,
        hash: from.hash,
        meta: from.meta,
      } : undefined,
    });
  }
}
