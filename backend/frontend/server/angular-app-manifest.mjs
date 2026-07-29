
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
    'index.csr.html': {size: 9041, hash: '1acdd97b842990c1ffb518c4aa2b830e2ba838efc3fd8363d74372301f72350e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7393, hash: '7957ecb367958f551e14b1fce104bdc7217f7e010a9144e6d8d0429172e40927', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 27372, hash: '921347ff359f0ff4fe01fd5ca15fc558a70db834947c77477f0f4b318bdc145f', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 19592, hash: 'a320786a7bc7022d5d632633ae03650017adfb384e41334c830f02bfc4547438', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 19592, hash: 'a320786a7bc7022d5d632633ae03650017adfb384e41334c830f02bfc4547438', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 15532, hash: '81f57ab7450108f6130ea4919a21482e92f4557bffc25d3ec88728e3ef106f21', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'select-plan/index.html': {size: 19592, hash: 'a320786a7bc7022d5d632633ae03650017adfb384e41334c830f02bfc4547438', text: () => import('./assets-chunks/select-plan_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 16086, hash: 'baf030add38075dfb5fb2fcd5209e003b4c9877360d088a8ad2a2bc7c9343114', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 19592, hash: 'a320786a7bc7022d5d632633ae03650017adfb384e41334c830f02bfc4547438', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'styles-LBTIECGU.css': {size: 3516, hash: '+/ZWUxZ1V14', text: () => import('./assets-chunks/styles-LBTIECGU_css.mjs').then(m => m.default)}
  },
};
