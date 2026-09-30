
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
    "route": "/plans"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 8373, hash: '852f9b8439f11ea4c02b84ec2ea7850bdc14d23996204d1fdd15791104079301', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7097, hash: 'a339bda34914b0694c97cc5645bc466ce19aea17b4cd6588b5073d3938064fb2', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 29197, hash: 'c7a4d581a068bafef2f277a1602c8ed30e0f52f59050ac6f7f1185b4fa3ee01b', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 21243, hash: '20af3fec261b7ecdeb5ee064563591668c23ee5a0c6b52fcddc2a35a7e2e4ea2', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 18435, hash: '4d761b7c85ce32d0391d1fa4e5b3d28e189a1e406aec042bdafc2160f18cb462', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 21243, hash: '20af3fec261b7ecdeb5ee064563591668c23ee5a0c6b52fcddc2a35a7e2e4ea2', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 21243, hash: '20af3fec261b7ecdeb5ee064563591668c23ee5a0c6b52fcddc2a35a7e2e4ea2', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'chat/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/chat_index_html.mjs').then(m => m.default)},
    'settings/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/settings_index_html.mjs').then(m => m.default)},
    'select-plan/index.html': {size: 21243, hash: '20af3fec261b7ecdeb5ee064563591668c23ee5a0c6b52fcddc2a35a7e2e4ea2', text: () => import('./assets-chunks/select-plan_index_html.mjs').then(m => m.default)},
    'plans/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/plans_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 18025, hash: 'a2c85be2ff71043093fe1c2502feba216d180910db2265799c914b26ab22abba', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'styles-3OONOWKJ.css': {size: 3133, hash: '/uVFWEeD6Tw', text: () => import('./assets-chunks/styles-3OONOWKJ_css.mjs').then(m => m.default)}
  },
};
