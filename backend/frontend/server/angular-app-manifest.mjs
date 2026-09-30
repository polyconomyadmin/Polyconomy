
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
    'index.csr.html': {size: 9041, hash: 'd9624cca74b4745e95be94b7493bf202aef52308fceede33cac4d549b1c781e3', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7393, hash: '421a0fae222de94fa6a8698b2d415628f76c4fca49f047120a98d38750a123da', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 30045, hash: '6a08ab10a05fad0629837c78dd1c354063e95b59f5481a2d2b0c5d7c9854e388', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 21875, hash: '9c8a8dfac17054ed5400f0b2d956b2bbf03b534f51b457b78c752dd31e95d538', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 21875, hash: '9c8a8dfac17054ed5400f0b2d956b2bbf03b534f51b457b78c752dd31e95d538', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 19127, hash: 'c4e100f5dc95eb201d83d6dc11cfcec3f7deb9377e96e0023a0a311b7225a4c0', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'select-plan/index.html': {size: 21875, hash: '9c8a8dfac17054ed5400f0b2d956b2bbf03b534f51b457b78c752dd31e95d538', text: () => import('./assets-chunks/select-plan_index_html.mjs').then(m => m.default)},
    'settings/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/settings_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 21875, hash: '9c8a8dfac17054ed5400f0b2d956b2bbf03b534f51b457b78c752dd31e95d538', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 18631, hash: 'efbd863314f662f34643cdb0b6839ae4789c711825914ed1b03409fb51a314b1', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'chat/index.html': {size: 225, hash: 'f0d9e0108796e2e7b54a5ebcd679ace5ab8824b2f86a04284da20f61efcdadf1', text: () => import('./assets-chunks/chat_index_html.mjs').then(m => m.default)},
    'styles-LBTIECGU.css': {size: 3516, hash: '+/ZWUxZ1V14', text: () => import('./assets-chunks/styles-LBTIECGU_css.mjs').then(m => m.default)}
  },
};
