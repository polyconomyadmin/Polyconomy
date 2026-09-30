
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
    'index.csr.html': {size: 9041, hash: '1adb1e085ec7636d429e9cb823acf3ab9882973cc22ba1f819a993baab91a9c1', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7393, hash: '070dc2ee6f1127937dc7a8a4985ae1441bed06aec39e4bf96aec4380b5377e90', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 27614, hash: '844e83af19277d6cf2b64bf6ac07a1ca289c43aab08c21b10094f00c269aba70', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 19592, hash: '37d5bb6a6600a8498704210dc59561e4b65bd789e3c4f074b83566354b95939a', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 16844, hash: 'e3981f4542b085e3cf07734594ce643a6b1b417a25ec7a6e4322a7732876aa21', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'select-plan/index.html': {size: 19592, hash: '37d5bb6a6600a8498704210dc59561e4b65bd789e3c4f074b83566354b95939a', text: () => import('./assets-chunks/select-plan_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 16348, hash: 'c0cff318564ee2e88d523156e126412b35b124f8732de444aa701bfd69db062f', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'settings/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/settings_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 19592, hash: '37d5bb6a6600a8498704210dc59561e4b65bd789e3c4f074b83566354b95939a', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'chat/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/chat_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 19592, hash: '37d5bb6a6600a8498704210dc59561e4b65bd789e3c4f074b83566354b95939a', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'styles-LBTIECGU.css': {size: 3516, hash: '+/ZWUxZ1V14', text: () => import('./assets-chunks/styles-LBTIECGU_css.mjs').then(m => m.default)}
  },
};
