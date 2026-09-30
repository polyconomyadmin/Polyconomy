
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
    'index.csr.html': {size: 8373, hash: 'b8a87e551cb0c697ed075983fadfc60f629fe9d2886296df755fe8c48a57c4b1', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7097, hash: 'f86c7ecca50905da3779a1f23c9f37230cd9fad5d25caf95f45b26d0cf8e617c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 21243, hash: '63e44a04f3dc9ba073d9de3c448cf4fd843135caed9cc685301f67ae589af825', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'index.html': {size: 29197, hash: 'a42e878b82db17f71f8fb191261a6c057ad9919167655c0e40cbda98cd73a348', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 21243, hash: '63e44a04f3dc9ba073d9de3c448cf4fd843135caed9cc685301f67ae589af825', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 18480, hash: 'c4a2c5e77fedfa4eb1179d7461ba72d616bdc9c901ccf7a9c66b9bf773a5b854', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'select-plan/index.html': {size: 21243, hash: '63e44a04f3dc9ba073d9de3c448cf4fd843135caed9cc685301f67ae589af825', text: () => import('./assets-chunks/select-plan_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 21243, hash: '63e44a04f3dc9ba073d9de3c448cf4fd843135caed9cc685301f67ae589af825', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 18025, hash: '48bc618d49546782e6426f3799e9286363f541f97bb7eb9dca4411da27b266e1', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'settings/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/settings_index_html.mjs').then(m => m.default)},
    'chat/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/chat_index_html.mjs').then(m => m.default)},
    'styles-3OONOWKJ.css': {size: 3133, hash: '/uVFWEeD6Tw', text: () => import('./assets-chunks/styles-3OONOWKJ_css.mjs').then(m => m.default)}
  },
};
