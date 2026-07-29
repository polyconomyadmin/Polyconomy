
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
    'index.csr.html': {size: 9041, hash: '08f277df4c56a31986409ceb08596802b9db05940c63e24da77f7b31c2d7f749', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7393, hash: '590f59c77b89cac57b3070d6a243991e342cf11609b4a434873ebaffa440e062', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 27372, hash: 'c42375c61f4765da895d860251ea2cd1cfa04aea9bfa0d5c3f38e7210183a842', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 19592, hash: 'bd14a6263078dbf2dc8211d387230cd30a53f732265877b610229cb9738c79e2', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 15532, hash: 'c75718316dcd462deacea8656e91e69f4c95d5189aa6adeff383506afbe13a66', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 19592, hash: 'bd14a6263078dbf2dc8211d387230cd30a53f732265877b610229cb9738c79e2', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'select-plan/index.html': {size: 19592, hash: 'bd14a6263078dbf2dc8211d387230cd30a53f732265877b610229cb9738c79e2', text: () => import('./assets-chunks/select-plan_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 16086, hash: '51dd3a91ead7d1a9db682c88fb61d872b76fa7f5272950d73269a3c31edfecc7', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 19592, hash: 'bd14a6263078dbf2dc8211d387230cd30a53f732265877b610229cb9738c79e2', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'styles-LBTIECGU.css': {size: 3516, hash: '+/ZWUxZ1V14', text: () => import('./assets-chunks/styles-LBTIECGU_css.mjs').then(m => m.default)}
  },
};
