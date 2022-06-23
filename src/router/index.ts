import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import {app} from 'src/services/App'

declare const gtag: (key: string, trackingId: string, config: Record<string, string | boolean | null | number>) => string;

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  Router.afterEach((to, from) => {
    // eslint-disable-next-line
    const gaTrackingId = 'G-QN4SMN54P2';

    gtag('config', gaTrackingId, {
      page_path: to.fullPath,
      app_name: 'Rifgo App',
      send_page_view: true,
    });

    app.eventNotifyService.vueRouteChanged(to, from);
  });

  return Router;
});

