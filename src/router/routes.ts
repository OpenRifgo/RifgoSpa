import { RouteRecordRaw } from 'vue-router';
import superAdminRoutes from 'src/router/superAdminRoutes'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/RootLayout.vue'),
    children: [
      {
        path: '',
        name: 'root',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: 'profile',
        component: () => import('pages/ProfilePage.vue')
      }
    ],
  },

  {
    path: '/link',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      {
        path: ':uid',
        name: 'short-link',
        component: () => import('pages/ShortLinkPage.vue')
      },
    ],
  },

  {
    path: '/sign-up',
    component: () => import('layouts/RootLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/SignUpPage.vue')
      },
    ],
  },

  {
    path: '/dashboard/onboarding',
    component: () => import('layouts/OnboardingLayout.vue'),
    children: [
      {
        path: '',
        name: 'onboarding',
        meta: {title: 'RIFGO'},
        component: () => import('pages/onboarding/OnboardingPage.vue')
      },
      {
        path: 'calendly',
        name: 'onboarding-calendly',
        meta: {title: 'Calendly'},
        component: () => import('pages/onboarding/OnboardingCalendlyPage.vue')
      },
      {
        path: 'stripe',
        name: 'onboarding-stripe',
        meta: {title: 'Calendly'},
        component: () => import('pages/onboarding/OnboardingStripePage.vue')
      },
      {
        path: 'referral',
        name: 'onboarding-referral',
        meta: {title: 'Referral'},
        component: () => import('pages/onboarding/OnboardingReferralPage.vue')
      },
    ]
  },

  {
    path: '/creator',
    component: () => import('layouts/CreatorLayout.vue'),
    children: [
      {
        path: 'events',
        name: 'creator-events',
        meta: {title: 'Events'},
        component: () => import('pages/creator/EventsPage.vue')
      },
      {
        path: 'events/create',
        name: 'creator-event-create',
        meta: {title: 'Create Event'},
        component: () => import('pages/creator/EventCreatePage.vue')
      },
      {
        path: 'events/:eventId/edit',
        name: 'creator-event-edit',
        meta: {title: 'Edit Event'},
        component: () => import('pages/creator/EventEditPage.vue')
      },
      {
        path: 'stripe',
        name: 'creator-stripe',
        meta: {title: 'Stripe'},
        component: () => import('pages/creator/StripePage.vue')
      },
    ]
  },

  {
    path: '/dashboard/consultant',
    component: () => import('layouts/CreatorLayout.vue'),
    children: [
      {
        path: 'profile',
        name: 'consultant-profile',
        meta: {title: 'Profile'},
        component: () => import('pages/consultant/ConsultantProfilePage.vue')
      },
      {
        path: 'offers',
        name: 'consultant-offers',
        meta: {title: 'Offers'},
        component: () => import('pages/consultant/ConsultantOffersPage.vue')
      },
      {
        path: 'offers/create',
        name: 'consultant-create-offer',
        meta: {title: 'Create Offer'},
        component: () => import('pages/consultant/ConsultantOfferCreatePage.vue')
      },
      {
        path: 'offers/:offerId/edit',
        name: 'consultant-edit-offer',
        meta: {title: 'Edit Offer'},
        component: () => import('pages/consultant/ConsultantOfferEditPage.vue')
      },
      {

        path: 'calendly',
        name: 'consultant-calendly',
        meta: {title: 'Calendly'},
        component: () => import('pages/consultant/CalendlyPage.vue')
      },
    ]
  },

  {
    path: '/streamer/:slug',
    name: 'streamer-page',
    component: () => import('pages/creator/StreamerPage.vue'),
  },

  {
    path: '/consultant/:slug',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      {
        path: '',
        name: 'consultant-page',
        component: () => import('pages/public/ConsultantPage.vue'),
      },
      {
        path: 'referral',
        name: 'consultant-referral-page',
        meta: {showRecommendMe: true},
        component: () => import('pages/public/ConsultantPage.vue'),
      },
      {
        path: 'reviews',
        name: 'consultant-reviews-page',
        component: () => import('pages/public/ConsultantReviewsPage.vue'),
      },
      {
        path: 'peers',
        name: 'consultant-peers-page',
        component: () => import('pages/public/ConsultantPeersPage.vue'),
      },
    ]
  },

  // {
  //   path: '/creator/events/:eventId',
  //   component: () => import('layouts/CreatorMiniLayout.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'creator-event-show',
  //       component: () => import('pages/creator/EventShowPage.vue')
  //     },
  //   ]
  // },

  {
    path: '/creator/events/:eventId',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      {
        path: '',
        name: 'creator-event-show',
        component: () => import('pages/creator/EventShowPageNew.vue')
      },
    ]
  },

  {
    path: '/event',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      {
        path: ':eventUid',
        name: 'event-show-by-uid',
        component: () => import('pages/public/PublicEventPage.vue')
      },
    ]
  },

  {
    path: '/public',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      // {
      //   path: 'events/:eventUid',
      //   name: 'event-show',
      //   component: () => import('pages/public/PublicEventPage.vue')
      // },
      {
        path: 'events/registered/:regSecret',
        name: 'event-show',
        component: () => import('pages/public/PublicActiveEventPage.vue')
      },
      {
        path: 'events/registered/:regSecret/chat',
        name: 'event-show-chat',
        component: () => import('pages/public/EventChatPage.vue')
      },
      // {
      //   path: 'events/:eventUid/active',
      //   name: 'event-show-active',
      //   component: () => import('pages/public/PublicActiveEventPage.vue')
      // },

    ]
  },

  {
    path: '/debug',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      {
        path: 'chat/:eventUid',
        component: () => import('pages/debug/DebugChat.vue')
      }
    ]
  },

  {
    path: '/auth',
    component: () => import('layouts/PublicLayoutWithHeader.vue'),
    children: [
      {
        path: 'forgotPassword',
        name: 'auth-forgot-password',
        component: () => import('pages/auth/ForgotPassword.vue')
      },
      {
        path: 'changePassword/:changePasswordSecret',
        name: 'auth-change-password',
        component: () => import('pages/auth/ChangePassword.vue')
      },
    ]
  },

  {
    path: '/demo/screen',
    component: () => import('layouts/ScreenLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/demo/DemoScreen.vue')
      }
    ]
  },

  {
    path: '/demo/kitchensink',
    component: () => import('layouts/ScreenLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/demo/KitchenSink.vue')
      }
    ]
  },

  superAdminRoutes(),

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
