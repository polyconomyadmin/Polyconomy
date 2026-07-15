
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
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 7808, hash: '3f8d499f65981a9e4465721fa4abfe0a6e341a0c03d735ca3f3559febc29784d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7393, hash: 'fdde1d350b20587192bcf2788391432b02d7b408a1e7dab7677c4f5231a28b9b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 17537, hash: 'c1505c56678e8ea3f20c8da2c79be33003467bc6ce3928d7f86eb66775e7d0d6', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'index.html': {size: 22991, hash: 'e31abd03827538eb8de7560d29cf2af2f7e20128a3f4338299a6afb2cc019751', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 17537, hash: 'c1505c56678e8ea3f20c8da2c79be33003467bc6ce3928d7f86eb66775e7d0d6', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 17537, hash: 'c1505c56678e8ea3f20c8da2c79be33003467bc6ce3928d7f86eb66775e7d0d6', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'select-plan/index.html': {size: 17537, hash: 'c1505c56678e8ea3f20c8da2c79be33003467bc6ce3928d7f86eb66775e7d0d6', text: () => import('./assets-chunks/select-plan_index_html.mjs').then(m => m.default)},
    'styles-M3S3TEZ4.css': {size: 1298, hash: 'p7lU365+TkY', text: () => import('./assets-chunks/styles-M3S3TEZ4_css.mjs').then(m => m.default)}
  },
};
