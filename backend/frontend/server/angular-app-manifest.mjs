
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/signup"
  },
  {
    "renderMode": 2,
    "route": "/select-plan"
  },
  {
    "renderMode": 2,
    "route": "/chat"
  },
  {
    "renderMode": 2,
    "route": "/reset-password"
  },
  {
    "renderMode": 2,
    "route": "/about"
  },
  {
    "renderMode": 2,
    "route": "/contact"
  },
  {
    "renderMode": 2,
    "route": "/settings"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 8373, hash: '5181a3ed4b2c2cddfbc88edc6ddafcdf5e879c508f665a1ee49d1989b1dcfa8b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7097, hash: '1e2e6de396104ea2ea33edc088f2292ff098aac12538e0f9d8c6542255342fcb', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 29197, hash: '44089d1bcf85fcf5926d728edca5b14c65aae60668481f5339ccaf9dc301de9e', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 21243, hash: '85f39fad637752a34dea5d5288ec82217989680abb6c03725cc033db66f56a4c', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 21243, hash: '85f39fad637752a34dea5d5288ec82217989680abb6c03725cc033db66f56a4c', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'select-plan/index.html': {size: 21243, hash: '85f39fad637752a34dea5d5288ec82217989680abb6c03725cc033db66f56a4c', text: () => import('./assets-chunks/select-plan_index_html.mjs').then(m => m.default)},
    'settings/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/settings_index_html.mjs').then(m => m.default)},
    'chat/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/chat_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 18435, hash: 'a879bb067d373b83220337b3a90d920cfe56f1ea95430855f4bc54594e77ff87', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 21243, hash: '85f39fad637752a34dea5d5288ec82217989680abb6c03725cc033db66f56a4c', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 18025, hash: '5d760a0747cd016d34523d684a63ce090379a5a84d39bc5476eafa18846bc55a', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'styles-3OONOWKJ.css': {size: 3133, hash: '/uVFWEeD6Tw', text: () => import('./assets-chunks/styles-3OONOWKJ_css.mjs').then(m => m.default)}
  },
};
