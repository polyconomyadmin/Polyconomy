
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
    'index.csr.html': {size: 8373, hash: '7db57b312c697048ae78b24972645ae491bc32c73694b88df5cef2cb0685f65a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7097, hash: '7f3cc434bc00d74c1fccc5a004fd67672084e155dbd96c45b66eb474ebfda3c5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 29197, hash: '32493c229b3da097b3f37111c302865cfc7bd8e57922127ff0a5b60872751e53', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 21243, hash: '11b5ed48f6cc08840720bada85ed01a575df6095f9c0719c56c1e13f90182e0c', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 18435, hash: '482db1cb56cfbdbcfc3afe093ea3ba108ebee2a2a16ba2ce448d78ca750f5ba7', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'chat/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/chat_index_html.mjs').then(m => m.default)},
    'settings/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/settings_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 21243, hash: '11b5ed48f6cc08840720bada85ed01a575df6095f9c0719c56c1e13f90182e0c', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 21243, hash: '11b5ed48f6cc08840720bada85ed01a575df6095f9c0719c56c1e13f90182e0c', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'select-plan/index.html': {size: 21243, hash: '11b5ed48f6cc08840720bada85ed01a575df6095f9c0719c56c1e13f90182e0c', text: () => import('./assets-chunks/select-plan_index_html.mjs').then(m => m.default)},
    'plans/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/plans_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 18025, hash: '89bf62baabdc0a09b44211d4351e0b8c04244e7ca0ce33167f1204e96b7a0747', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'styles-3OONOWKJ.css': {size: 3133, hash: '/uVFWEeD6Tw', text: () => import('./assets-chunks/styles-3OONOWKJ_css.mjs').then(m => m.default)}
  },
};
