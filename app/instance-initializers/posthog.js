import config from 'codecrafters-frontend/config/environment';
import posthog from 'posthog-js';

export function initialize() {
  if (typeof FastBoot === 'undefined' && config.environment === 'production') {
    posthog.init('phc_jCl1mm3XbnvyIUr4h54oORqWEqj37gxhZIOebREBwxb', {
      api_host: 'https://app.posthog.com',
      autocapture: false, // We have our own events
      maskAllInputs: false,
      maskInputOptions: {
        password: true,
      },
    });
  }
}

export default {
  initialize,
};
