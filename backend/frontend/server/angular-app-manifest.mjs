
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
    'index.csr.html': {size: 9041, hash: '451e3b5a08f934f000b58a1299732ca709e65a69c9b14c3508be7e693fa25ae2', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7393, hash: 'b4b9d5259e7c35dd4e7ac7380bbb9acd3fe17e6b0727beb4889ab7c0634a6cca', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 30045, hash: 'f69c3dbfdcf150520f1361e41478ad139454bdab536d02cf65a09f3d559d2a54', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 21905, hash: 'cfa5bca7c99b8060955ffde8fdbd364e5c52f75a47f76099d012e824e0e0a16d', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 21905, hash: 'cfa5bca7c99b8060955ffde8fdbd364e5c52f75a47f76099d012e824e0e0a16d', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 19157, hash: '089a7d958d5e92f95fc8864ca1e060d26be9edff5e39a13079c3e2cf821ab6b4', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 18661, hash: '2c20a72444f6e419c41bcc568b299a11c57693f5556f49a48b37fef7cfb08689', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'select-plan/index.html': {size: 21905, hash: 'cfa5bca7c99b8060955ffde8fdbd364e5c52f75a47f76099d012e824e0e0a16d', text: () => import('./assets-chunks/select-plan_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 21905, hash: 'cfa5bca7c99b8060955ffde8fdbd364e5c52f75a47f76099d012e824e0e0a16d', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'chat/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/chat_index_html.mjs').then(m => m.default)},
    'settings/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/settings_index_html.mjs').then(m => m.default)},
    'styles-YYO66VQC.css': {size: 3546, hash: 'smDEpCj+Aok', text: () => import('./assets-chunks/styles-YYO66VQC_css.mjs').then(m => m.default)}
  },
};
