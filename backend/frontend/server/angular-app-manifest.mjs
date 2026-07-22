
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
    'index.csr.html': {size: 9041, hash: '5cfbe04edbc3b3d3791e5f69093c734c9f2a565400f80b418757c2cfccc42b55', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7393, hash: '0db5f1dc36f42f45dcd1aebf1add68d7dffdbf1aa108b2afb8c47e10d8496002', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'about/index.html': {size: 15532, hash: '385e1627757eb781b08a5b0483ebafca9d30393b1441f41ec0aac007315c24c6', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 19592, hash: '09759bdcad06d955c6626e94d6877b7cfae41bdb8f850cec54bdcdc0a3102e98', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'index.html': {size: 28124, hash: '69fdc23426771d228e3e535799d6573e2bc78de5de0c954fdbc69ca4d51c567e', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 19592, hash: '09759bdcad06d955c6626e94d6877b7cfae41bdb8f850cec54bdcdc0a3102e98', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'select-plan/index.html': {size: 19592, hash: '09759bdcad06d955c6626e94d6877b7cfae41bdb8f850cec54bdcdc0a3102e98', text: () => import('./assets-chunks/select-plan_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 19592, hash: '09759bdcad06d955c6626e94d6877b7cfae41bdb8f850cec54bdcdc0a3102e98', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 16086, hash: '5babe636bec216e9787793a1f0816134f56a339923721d58f5822f88b52b3c35', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'styles-LBTIECGU.css': {size: 3516, hash: '+/ZWUxZ1V14', text: () => import('./assets-chunks/styles-LBTIECGU_css.mjs').then(m => m.default)}
  },
};
