
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
    'index.csr.html': {size: 9041, hash: '82a2bdaf90c8b38c1496f46ebb1c231e64cb4165334d0a9363e1ab5e4cbed9fd', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7393, hash: '791ec7a6c93eae69d305a1172faf605033750816fc89f87de9ad120a7e11db07', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 27372, hash: 'b8c07c86b1c79ce992c388c338c71f131b176b1b3def6a3ca5632c23795b63ec', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 15532, hash: '6a7483f9d0f76c4e75e1042280b6355bc3420fad4addbd611a69aa5320d92b37', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'select-plan/index.html': {size: 19592, hash: '49227a333c00393f9d8702ec54ca1128d69fe16e6ee6d7defb02d6cb36e103e3', text: () => import('./assets-chunks/select-plan_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 19592, hash: '49227a333c00393f9d8702ec54ca1128d69fe16e6ee6d7defb02d6cb36e103e3', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 16086, hash: 'c8d0e4dc78c4f466a58e760dc40d12aef986125135d3bf5a1a8aaaab5b71a75b', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 19592, hash: '49227a333c00393f9d8702ec54ca1128d69fe16e6ee6d7defb02d6cb36e103e3', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 19592, hash: '49227a333c00393f9d8702ec54ca1128d69fe16e6ee6d7defb02d6cb36e103e3', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'styles-LBTIECGU.css': {size: 3516, hash: '+/ZWUxZ1V14', text: () => import('./assets-chunks/styles-LBTIECGU_css.mjs').then(m => m.default)}
  },
};
