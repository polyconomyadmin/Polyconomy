
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
    'index.csr.html': {size: 9041, hash: '2bec247ff0eea3f725588413cf49f9bdfbdba099743a6a2a3cbbe25559a5164a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7393, hash: '8ce6142721c4fa3de0f365e0bea353190548151391fc45b7cab9842ced71f55e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 30045, hash: 'c4b0cdea9bda45b9af6b5d170072e0be32cba2071190e90d101b6ad68137bce2', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 21875, hash: 'b2462a3746e82d323da0aa8cc66048d62d61ae6dff78708bb9418cdaae7e7a23', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 21875, hash: 'b2462a3746e82d323da0aa8cc66048d62d61ae6dff78708bb9418cdaae7e7a23', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 19127, hash: '87c8c55565c16de01fff56786337be9ae42c75341b98977a9bba2b8e377b5aca', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'select-plan/index.html': {size: 21875, hash: 'b2462a3746e82d323da0aa8cc66048d62d61ae6dff78708bb9418cdaae7e7a23', text: () => import('./assets-chunks/select-plan_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 18631, hash: '95b8a3086b10f6c61f6f75b9424e22adeee5de5800cb63df698cedebd5bd3fa0', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 21875, hash: 'b2462a3746e82d323da0aa8cc66048d62d61ae6dff78708bb9418cdaae7e7a23', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'chat/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/chat_index_html.mjs').then(m => m.default)},
    'settings/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/settings_index_html.mjs').then(m => m.default)},
    'styles-LBTIECGU.css': {size: 3516, hash: '+/ZWUxZ1V14', text: () => import('./assets-chunks/styles-LBTIECGU_css.mjs').then(m => m.default)}
  },
};
