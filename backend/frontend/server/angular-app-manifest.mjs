
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
    'index.csr.html': {size: 9041, hash: '8f7c33d34e89336c7151a2f856be284379a934484e8ca8c43ec7a139448bed6a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7393, hash: 'aa87ff6c59b31e2c56cf653c9db14183196af7e32d895b378a32e818bc337390', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 19592, hash: 'e49c7d88c8ddf06112a9459bc9cc9ed9458842f1406a129de8f56e95a970180a', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'index.html': {size: 27372, hash: '7a097d31827d02b14fb0806cb312a88ab842f2db485a447742563105ae7444d6', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 19592, hash: 'e49c7d88c8ddf06112a9459bc9cc9ed9458842f1406a129de8f56e95a970180a', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 15532, hash: '3f8b36c3a8b6f7588b28fcc8884895fb665404386febd55384de1c17735014fa', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'select-plan/index.html': {size: 19592, hash: 'e49c7d88c8ddf06112a9459bc9cc9ed9458842f1406a129de8f56e95a970180a', text: () => import('./assets-chunks/select-plan_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 19592, hash: 'e49c7d88c8ddf06112a9459bc9cc9ed9458842f1406a129de8f56e95a970180a', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 16086, hash: 'ef253414214532b1133344a3b15ba982f9d4cc4bfc722560029b8a39c14477da', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'styles-LBTIECGU.css': {size: 3516, hash: '+/ZWUxZ1V14', text: () => import('./assets-chunks/styles-LBTIECGU_css.mjs').then(m => m.default)}
  },
};
