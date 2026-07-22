
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
    'index.csr.html': {size: 9041, hash: '355bd3c074619275e173f5dd1948fdcd8958fcdc904ea1ff474fcb3fddee7927', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7393, hash: '3b2ab0cbc295f9db5c619b52f7053e6adb7c56dafb23fb8644681cfd29cfe5af', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 28250, hash: 'b2f061f9b54a213705a3c05afc1bfc9487a772c6de496c2391272910d53b844e', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 15532, hash: '7d8a40cd82b6dc5254ebef85eb89f15638b5ca77d47cdcbedceca95d60c7ee51', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 19592, hash: 'a29488d0a93c4b4217c2d4f352fa0a1d7381ef7c035c18b448f1997fcb61d8db', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'select-plan/index.html': {size: 19592, hash: 'a29488d0a93c4b4217c2d4f352fa0a1d7381ef7c035c18b448f1997fcb61d8db', text: () => import('./assets-chunks/select-plan_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 19592, hash: 'a29488d0a93c4b4217c2d4f352fa0a1d7381ef7c035c18b448f1997fcb61d8db', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 16086, hash: 'f5582e3bb63c826139a9d5e558e2307cc2e4b08db66eb7187b53e114b63e9ef9', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 19592, hash: 'a29488d0a93c4b4217c2d4f352fa0a1d7381ef7c035c18b448f1997fcb61d8db', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'styles-LBTIECGU.css': {size: 3516, hash: '+/ZWUxZ1V14', text: () => import('./assets-chunks/styles-LBTIECGU_css.mjs').then(m => m.default)}
  },
};
