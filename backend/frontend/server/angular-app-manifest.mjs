
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
    'index.csr.html': {size: 9041, hash: 'fd692f2a647397fa07aeadf38957b43eb408a3a7adb543035f60062362410bf4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7393, hash: '369862f5e08a0c6f4f5ea1e0e24afc0b284cdec66564ac74ac19d3ebd43f0fea', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 30045, hash: '756cbde8119809c98b67cd8da18bd7b689d07c1dba1636759132886ff6a66d14', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 21875, hash: '5518c8f9fbb46ca2c5bb95a14408f1965c941e848e1b7f35e8253c22b0c79240', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 19127, hash: '55fd884a304ab04ba924dc484e7684f7587faa86239de54537c92a854283f200', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'select-plan/index.html': {size: 21875, hash: '5518c8f9fbb46ca2c5bb95a14408f1965c941e848e1b7f35e8253c22b0c79240', text: () => import('./assets-chunks/select-plan_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 21875, hash: '5518c8f9fbb46ca2c5bb95a14408f1965c941e848e1b7f35e8253c22b0c79240', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 18631, hash: '19d6497a338de1bff0f92daaf6a8c589a9882aa8d0d294d747d764e8cd58919b', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'settings/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/settings_index_html.mjs').then(m => m.default)},
    'chat/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/chat_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 21875, hash: '5518c8f9fbb46ca2c5bb95a14408f1965c941e848e1b7f35e8253c22b0c79240', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'styles-LBTIECGU.css': {size: 3516, hash: '+/ZWUxZ1V14', text: () => import('./assets-chunks/styles-LBTIECGU_css.mjs').then(m => m.default)}
  },
};
