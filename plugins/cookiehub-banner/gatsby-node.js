"use strict";

exports.onPreInit = function (_ref, options) {
  var reporter = _ref.reporter;

  if (!options.cookieHubId) {
    reporter.warn("The cookiehub banner plugin requires a cookieHubId.");
  }
};