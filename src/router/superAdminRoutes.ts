import {RouteRecordRaw} from 'vue-router'

const superAdminRoutes = (): RouteRecordRaw => {
  return {
    path: '/super-admin',
    component: () => import('layouts/CreatorLayout.vue'),
    children: [
      {
        path: 'registrations',
        name: 'super-admin-registrations',
        meta: {title: 'Registrations'},
        component: () => import('pages/superAdmin/RegistrationPage.vue'),
      },
      {
        path: 'send-email',
        name: 'super-admin-send-email',
        meta: {title: 'Send email'},
        component: () => import('pages/superAdmin/SendEmail.vue'),
      },
    ],
  }
}

export default superAdminRoutes;
