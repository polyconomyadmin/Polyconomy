
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
    'index.csr.html': {size: 9041, hash: '6cc5a07624fa5ade419b5909ee39c590881cbb297c196beea194fb269cb6547c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7393, hash: 'af6ca84c4c870d76254d2281a2cbae77cb0fc9661b0af6f747beba43f9eb8088', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 27614, hash: '1b66eaaba254ebf797e42bcdd2101b99d05560486d5b0402ea99da1e4f2c69bb', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 19592, hash: '4093d12571e240d0001739bc601d6ccbf11a3d180cbf708095b38c61e58c07cf', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 19592, hash: '4093d12571e240d0001739bc601d6ccbf11a3d180cbf708095b38c61e58c07cf', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 16348, hash: '13e90491d32b38a9236bed22cdd7d3f2094e092470e3ed2addb187f829ddda0f', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'select-plan/index.html': {size: 19592, hash: '4093d12571e240d0001739bc601d6ccbf11a3d180cbf708095b38c61e58c07cf', text: () => import('./assets-chunks/select-plan_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 15565, hash: 'f723861d95024cf61321fce878f744275a4aa385b347eb1437f371af7654067a', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'chat/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/chat_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 19592, hash: '4093d12571e240d0001739bc601d6ccbf11a3d180cbf708095b38c61e58c07cf', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'settings/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/settings_index_html.mjs').then(m => m.default)},
    'styles-LBTIECGU.css': {size: 3516, hash: '+/ZWUxZ1V14', text: () => import('./assets-chunks/styles-LBTIECGU_css.mjs').then(m => m.default)}
  },
};
