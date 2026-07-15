
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
    "redirectTo": "/",
    "route": "/**"
  },
  {
    "renderMode": 2,
    "route": "/reset-password"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 7808, hash: '93be343bda12e45a29ef622d1a02499b0e1fd02ba30c0c26f74dab0a6571a401', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7393, hash: '478f4079db94092476fecad1817675d631e4ec04855d5ad61687e41059f6412c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 16332, hash: '87389fe8826c36c8f49bbd69593bda7a1238e42f05dc506da428ecbab162c5a1', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'index.html': {size: 22991, hash: 'a1ae99e4b458c9b0d7c4ec4a88add580633647ec19c5b3c076aa0bba69a81124', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 16332, hash: '87389fe8826c36c8f49bbd69593bda7a1238e42f05dc506da428ecbab162c5a1', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'select-plan/index.html': {size: 16332, hash: '87389fe8826c36c8f49bbd69593bda7a1238e42f05dc506da428ecbab162c5a1', text: () => import('./assets-chunks/select-plan_index_html.mjs').then(m => m.default)},
    'styles-M3S3TEZ4.css': {size: 1298, hash: 'p7lU365+TkY', text: () => import('./assets-chunks/styles-M3S3TEZ4_css.mjs').then(m => m.default)}
  },
};
