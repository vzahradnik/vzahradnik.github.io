"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.onRenderBody = void 0;

var _react = _interopRequireDefault(require("react"));

var _jsxFileName = "/home/vzahradnik/Dokumenty/gatsby-starter-novela/plugins/cookiehub-banner/src/gatsby-ssr.js";

var onRenderBody = function onRenderBody(_ref, pluginOptions) {
  var setHeadComponents = _ref.setHeadComponents,
      setPostBodyComponents = _ref.setPostBodyComponents;

  if (!pluginOptions.cookieHubId) {
    return null;
  }

  function isV2ApiEnabled(pluginOptions) {
    return pluginOptions.cookieHubV2Api !== undefined ? pluginOptions.cookieHubV2Api : false;
  }

  var setComponents = pluginOptions.head ? setHeadComponents : setPostBodyComponents;
  var apiVersion = isV2ApiEnabled(pluginOptions) ? 'c2' : 'cc';
  var cookieHubUrl = "https://cookiehub.net/" + apiVersion + "/" + pluginOptions.cookieHubId + ".js";
  var cookieNames = {};

  for (var i = 0; i < pluginOptions.categories.length; i++) {
    var category = pluginOptions.categories[i];
    cookieNames[category.categoryName] = category.cookieName;
  }

  return setComponents([_react.default.createElement("script", {
    key: "gatsby-plugin-cookiehub-banner-src",
    src: cookieHubUrl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }), _react.default.createElement("script", {
    key: "gatsby-plugin-cookiehub-banner-script",
    dangerouslySetInnerHTML: {
      __html: "\n                window.addEventListener(\"load\", function() {\n                    const cookieNames = " + JSON.stringify(cookieNames) + ";\n                    const handleCategoryUserInput = function(categoryName, allowed) {\n                        var cookieName = cookieNames[categoryName];\n                        if (cookieName === undefined) {\n                            cookieName = 'gatsby-plugin-cookiehub-banner-' + categoryName + '-allowed';\n                        } \n                        const cookieString = cookieName+'=' + allowed + ';path=/';\n                        document.cookie = cookieString;\n                    };\n\n                    const cpm = {\n                        onInitialise: function(status) {\n                            for (var i = 0; i < status.categories.length; i++) {\n                                var category = status.categories[i];\n                                handleCategoryUserInput(category.id, category.value);\n                            }\n                        },\n                        onAllow: function(category) {\n                            handleCategoryUserInput(category, true);\n                        },\n                        onRevoke: function(category) {\n                            handleCategoryUserInput(category, false);\n                        }\n                    };\n\n                    if (window.cookieconsent !== undefined) {\n                        window.cookieconsent.initialise(cpm);\n                    } else if (window.cookiehub !== undefined) {\n                        window.cookiehub.load(cpm);\n                    } else {\n                        console.log(\"CookieHub not loaded!\");\n                    }\n                });\n            "
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  })]);
};

exports.onRenderBody = onRenderBody;