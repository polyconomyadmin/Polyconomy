
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
    'index.csr.html': {size: 9041, hash: 'f44ffe3a917d931451cef17c080cb5fa318dbe704b6b6e7057d8b61fa4badd71', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7393, hash: '0eab8b58396cefb10afa4d25153ba88e959718acbca89ff93a49983d40cdc447', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 28124, hash: '33cf65cc6e549e81d4a12a2772cffcba4257e80b28a7a91f7dc499db4fdd1202', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 15532, hash: 'ba6f9edb6b0c80e6d464c916af5de116ba2efadfbf00c7aa8516ca06ab1f2287', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 19592, hash: 'd92a5fa4fdba4793d2a097b75ce9cfd8d7efc8149bc46e63bc25d4d4f490c783', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 19592, hash: 'd92a5fa4fdba4793d2a097b75ce9cfd8d7efc8149bc46e63bc25d4d4f490c783', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'select-plan/index.html': {size: 19592, hash: 'd92a5fa4fdba4793d2a097b75ce9cfd8d7efc8149bc46e63bc25d4d4f490c783', text: () => import('./assets-chunks/select-plan_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 19592, hash: 'd92a5fa4fdba4793d2a097b75ce9cfd8d7efc8149bc46e63bc25d4d4f490c783', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 16086, hash: '7722c425710204d00833f346abd6f62829a68201269daf0835a3e38adaef723d', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'styles-LBTIECGU.css': {size: 3516, hash: '+/ZWUxZ1V14', text: () => import('./assets-chunks/styles-LBTIECGU_css.mjs').then(m => m.default)}
  },
};
