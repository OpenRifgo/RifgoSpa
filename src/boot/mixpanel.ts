import mixpanel from 'mixpanel-browser';

// or with require() syntax:
// const mixpanel = require('mixpanel-browser');

// Enabling the debug mode flag is useful during implementation,
// but it's recommended you remove it for production
mixpanel.init('c4468d2ce5c83b4f81b3352c36596af0', {debug: true});
