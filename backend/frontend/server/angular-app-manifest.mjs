
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
    'index.csr.html': {size: 9041, hash: 'f68223d3e643571b37f1918b1af7f53a4d5150b97d3b4e450f72b04ce2230db1', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7393, hash: 'be8d7657b478974b77219afb80427a807cc2b6724e1a95efb3f32ad21789e936', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 27372, hash: '22271da6f511c161ff5fa29aa7e9d3591b70d2b4d73747a541635476d92d963d', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 19592, hash: '405b482720855bd733b1d4d41814112b5b002d1f0432666f558c86574bd203bf', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 15532, hash: '51205870c4ed7c67a78782fdf10718020d963a5ad8a5445051a480215454d611', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 19592, hash: '405b482720855bd733b1d4d41814112b5b002d1f0432666f558c86574bd203bf', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'select-plan/index.html': {size: 19592, hash: '405b482720855bd733b1d4d41814112b5b002d1f0432666f558c86574bd203bf', text: () => import('./assets-chunks/select-plan_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 16086, hash: '38cf909bcf2b3cc1f65af264918f6cbf421395ca01f25e87b4766c3faa22db03', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'signup/index.html': {size: 19592, hash: '405b482720855bd733b1d4d41814112b5b002d1f0432666f558c86574bd203bf', text: () => import('./assets-chunks/signup_index_html.mjs').then(m => m.default)},
    'styles-LBTIECGU.css': {size: 3516, hash: '+/ZWUxZ1V14', text: () => import('./assets-chunks/styles-LBTIECGU_css.mjs').then(m => m.default)}
  },
};
