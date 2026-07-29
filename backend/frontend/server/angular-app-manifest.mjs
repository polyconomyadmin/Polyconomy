
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
    'index.csr.html': {size: 9041, hash: 'bef7200af1d2b178ecd3437c525489a76854f3085c89a060bceafd6fd5d800d7', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7393, hash: '180bf90975456c20216a5dcf7f7ce96cd05d02a21f87b446491a93f3bff47926', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 27372, hash: '7829d249bf96970e24b6fdaad3ac08be8eaf1972ae4291102aab4636330aa1a0', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 15532, hash: '42300dcf52ba6ad5b54b584cab613e5ebc2b4143d993a43e4ae519b91342d1c9', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 19592, hash: '297a058d82bec3a3f153bcadc89efafbbbd853dd2aa4560a998cc5ae9a7887f5', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 19592, hash: '297a058d82bec3a3f153bcadc89efafbbbd853dd2aa4560a998cc5ae9a7887f5', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 19592, hash: '297a058d82bec3a3f153bcadc89efafbbbd853dd2aa4560a998cc5ae9a7887f5', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'select-plan/index.html': {size: 19592, hash: '297a058d82bec3a3f153bcadc89efafbbbd853dd2aa4560a998cc5ae9a7887f5', text: () => import('./assets-chunks/select-plan_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 16086, hash: '317b3b6f8d83eb117728d863e28f3d014b03aea92909b8d0342b5b289d0f9a6f', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'styles-LBTIECGU.css': {size: 3516, hash: '+/ZWUxZ1V14', text: () => import('./assets-chunks/styles-LBTIECGU_css.mjs').then(m => m.default)}
  },
};
