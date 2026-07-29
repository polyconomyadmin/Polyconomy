
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
    'index.csr.html': {size: 9041, hash: '92db850311f8cc6c79186dc8b23d96de093d10d74f481289c4a33fd72a7ebdde', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7393, hash: '583527a08b02b56a8ee526ca244c98536e7a2f2b6ae50e35ee7593f1a336bdc5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 19592, hash: 'e10731bb08646405f53dc9b667953a9aebd5963ed3cccfba251b00627297c3bd', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 15532, hash: 'a4058b7dbb94b364b6721dc4f8bb6153dbca1129a60e94e2b5242141f39a6262', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'index.html': {size: 27372, hash: '2b927c9850e77075012bc146fd405f2c168b809a338f588ca2ee5bef6bc2df6f', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 19592, hash: 'e10731bb08646405f53dc9b667953a9aebd5963ed3cccfba251b00627297c3bd', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'select-plan/index.html': {size: 19592, hash: 'e10731bb08646405f53dc9b667953a9aebd5963ed3cccfba251b00627297c3bd', text: () => import('./assets-chunks/select-plan_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 16086, hash: '7a7ba683541cc5388556708b336814f026f54676edf049e9ee0452c5610ab417', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 19592, hash: 'e10731bb08646405f53dc9b667953a9aebd5963ed3cccfba251b00627297c3bd', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'styles-LBTIECGU.css': {size: 3516, hash: '+/ZWUxZ1V14', text: () => import('./assets-chunks/styles-LBTIECGU_css.mjs').then(m => m.default)}
  },
};
