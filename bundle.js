(() => {
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/object-assign/index.js
  var require_object_assign = __commonJS({
    "node_modules/object-assign/index.js"(exports, module) {
      "use strict";
      var getOwnPropertySymbols = Object.getOwnPropertySymbols;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var propIsEnumerable = Object.prototype.propertyIsEnumerable;
      function toObject(val) {
        if (val === null || val === void 0) {
          throw new TypeError("Object.assign cannot be called with null or undefined");
        }
        return Object(val);
      }
      function shouldUseNative() {
        try {
          if (!Object.assign) {
            return false;
          }
          var test1 = new String("abc");
          test1[5] = "de";
          if (Object.getOwnPropertyNames(test1)[0] === "5") {
            return false;
          }
          var test2 = {};
          for (var i = 0; i < 10; i++) {
            test2["_" + String.fromCharCode(i)] = i;
          }
          var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
            return test2[n];
          });
          if (order2.join("") !== "0123456789") {
            return false;
          }
          var test3 = {};
          "abcdefghijklmnopqrst".split("").forEach(function(letter) {
            test3[letter] = letter;
          });
          if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
            return false;
          }
          return true;
        } catch (err) {
          return false;
        }
      }
      module.exports = shouldUseNative() ? Object.assign : function(target, source) {
        var from;
        var to = toObject(target);
        var symbols;
        for (var s = 1; s < arguments.length; s++) {
          from = Object(arguments[s]);
          for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
              to[key] = from[key];
            }
          }
          if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from, symbols[i])) {
                to[symbols[i]] = from[symbols[i]];
              }
            }
          }
        }
        return to;
      };
    }
  });

  // node_modules/vary/index.js
  var require_vary = __commonJS({
    "node_modules/vary/index.js"(exports, module) {
      "use strict";
      module.exports = vary;
      module.exports.append = append;
      var FIELD_NAME_REGEXP = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
      function append(header, field) {
        if (typeof header !== "string") {
          throw new TypeError("header argument is required");
        }
        if (!field) {
          throw new TypeError("field argument is required");
        }
        var fields = !Array.isArray(field) ? parse(String(field)) : field;
        for (var j = 0; j < fields.length; j++) {
          if (!FIELD_NAME_REGEXP.test(fields[j])) {
            throw new TypeError("field argument contains an invalid header name");
          }
        }
        if (header === "*") {
          return header;
        }
        var val = header;
        var vals = parse(header.toLowerCase());
        if (fields.indexOf("*") !== -1 || vals.indexOf("*") !== -1) {
          return "*";
        }
        for (var i = 0; i < fields.length; i++) {
          var fld = fields[i].toLowerCase();
          if (vals.indexOf(fld) === -1) {
            vals.push(fld);
            val = val ? val + ", " + fields[i] : fields[i];
          }
        }
        return val;
      }
      function parse(header) {
        var end = 0;
        var list = [];
        var start = 0;
        for (var i = 0, len = header.length; i < len; i++) {
          switch (header.charCodeAt(i)) {
            case 32:
              if (start === end) {
                start = end = i + 1;
              }
              break;
            case 44:
              list.push(header.substring(start, end));
              start = end = i + 1;
              break;
            default:
              end = i + 1;
              break;
          }
        }
        list.push(header.substring(start, end));
        return list;
      }
      function vary(res, field) {
        if (!res || !res.getHeader || !res.setHeader) {
          throw new TypeError("res argument is required");
        }
        var val = res.getHeader("Vary") || "";
        var header = Array.isArray(val) ? val.join(", ") : String(val);
        if (val = append(header, field)) {
          res.setHeader("Vary", val);
        }
      }
    }
  });

  // node_modules/cors/lib/index.js
  var require_lib = __commonJS({
    "node_modules/cors/lib/index.js"(exports, module) {
      (function() {
        "use strict";
        var assign = require_object_assign();
        var vary = require_vary();
        var defaults = {
          origin: "*",
          methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
          preflightContinue: false,
          optionsSuccessStatus: 204
        };
        function isString(s) {
          return typeof s === "string" || s instanceof String;
        }
        function isOriginAllowed(origin, allowedOrigin) {
          if (Array.isArray(allowedOrigin)) {
            for (var i = 0; i < allowedOrigin.length; ++i) {
              if (isOriginAllowed(origin, allowedOrigin[i])) {
                return true;
              }
            }
            return false;
          } else if (isString(allowedOrigin)) {
            return origin === allowedOrigin;
          } else if (allowedOrigin instanceof RegExp) {
            return allowedOrigin.test(origin);
          } else {
            return !!allowedOrigin;
          }
        }
        function configureOrigin(options, req) {
          var requestOrigin = req.headers.origin, headers = [], isAllowed;
          if (!options.origin || options.origin === "*") {
            headers.push([{
              key: "Access-Control-Allow-Origin",
              value: "*"
            }]);
          } else if (isString(options.origin)) {
            headers.push([{
              key: "Access-Control-Allow-Origin",
              value: options.origin
            }]);
            headers.push([{
              key: "Vary",
              value: "Origin"
            }]);
          } else {
            isAllowed = isOriginAllowed(requestOrigin, options.origin);
            headers.push([{
              key: "Access-Control-Allow-Origin",
              value: isAllowed ? requestOrigin : false
            }]);
            headers.push([{
              key: "Vary",
              value: "Origin"
            }]);
          }
          return headers;
        }
        function configureMethods(options) {
          var methods = options.methods;
          if (methods.join) {
            methods = options.methods.join(",");
          }
          return {
            key: "Access-Control-Allow-Methods",
            value: methods
          };
        }
        function configureCredentials(options) {
          if (options.credentials === true) {
            return {
              key: "Access-Control-Allow-Credentials",
              value: "true"
            };
          }
          return null;
        }
        function configureAllowedHeaders(options, req) {
          var allowedHeaders = options.allowedHeaders || options.headers;
          var headers = [];
          if (!allowedHeaders) {
            allowedHeaders = req.headers["access-control-request-headers"];
            headers.push([{
              key: "Vary",
              value: "Access-Control-Request-Headers"
            }]);
          } else if (allowedHeaders.join) {
            allowedHeaders = allowedHeaders.join(",");
          }
          if (allowedHeaders && allowedHeaders.length) {
            headers.push([{
              key: "Access-Control-Allow-Headers",
              value: allowedHeaders
            }]);
          }
          return headers;
        }
        function configureExposedHeaders(options) {
          var headers = options.exposedHeaders;
          if (!headers) {
            return null;
          } else if (headers.join) {
            headers = headers.join(",");
          }
          if (headers && headers.length) {
            return {
              key: "Access-Control-Expose-Headers",
              value: headers
            };
          }
          return null;
        }
        function configureMaxAge(options) {
          var maxAge = (typeof options.maxAge === "number" || options.maxAge) && options.maxAge.toString();
          if (maxAge && maxAge.length) {
            return {
              key: "Access-Control-Max-Age",
              value: maxAge
            };
          }
          return null;
        }
        function applyHeaders(headers, res) {
          for (var i = 0, n = headers.length; i < n; i++) {
            var header = headers[i];
            if (header) {
              if (Array.isArray(header)) {
                applyHeaders(header, res);
              } else if (header.key === "Vary" && header.value) {
                vary(res, header.value);
              } else if (header.value) {
                res.setHeader(header.key, header.value);
              }
            }
          }
        }
        function cors2(options, req, res, next) {
          var headers = [], method = req.method && req.method.toUpperCase && req.method.toUpperCase();
          if (method === "OPTIONS") {
            headers.push(configureOrigin(options, req));
            headers.push(configureCredentials(options, req));
            headers.push(configureMethods(options, req));
            headers.push(configureAllowedHeaders(options, req));
            headers.push(configureMaxAge(options, req));
            headers.push(configureExposedHeaders(options, req));
            applyHeaders(headers, res);
            if (options.preflightContinue) {
              next();
            } else {
              res.statusCode = options.optionsSuccessStatus;
              res.setHeader("Content-Length", "0");
              res.end();
            }
          } else {
            headers.push(configureOrigin(options, req));
            headers.push(configureCredentials(options, req));
            headers.push(configureExposedHeaders(options, req));
            applyHeaders(headers, res);
            next();
          }
        }
        function middlewareWrapper(o) {
          var optionsCallback = null;
          if (typeof o === "function") {
            optionsCallback = o;
          } else {
            optionsCallback = function(req, cb) {
              cb(null, o);
            };
          }
          return function corsMiddleware(req, res, next) {
            optionsCallback(req, function(err, options) {
              if (err) {
                next(err);
              } else {
                var corsOptions = assign({}, defaults, options);
                var originCallback = null;
                if (corsOptions.origin && typeof corsOptions.origin === "function") {
                  originCallback = corsOptions.origin;
                } else if (corsOptions.origin) {
                  originCallback = function(origin, cb) {
                    cb(null, corsOptions.origin);
                  };
                }
                if (originCallback) {
                  originCallback(req.headers.origin, function(err2, origin) {
                    if (err2 || !origin) {
                      next(err2);
                    } else {
                      corsOptions.origin = origin;
                      cors2(corsOptions, req, res, next);
                    }
                  });
                } else {
                  next();
                }
              }
            });
          };
        }
        module.exports = middlewareWrapper;
      })();
    }
  });

  // index.js
  var express = __require("express");
  var cors = require_lib();
  var app = express();
  var port = 3e3;
  app.use(express.json());
  app.use(cors());
  var notes = [];
  app.get("/notes", function(req, res) {
    res.send(JSON.stringify(notes));
  });
  app.post("/notes", function(req, res) {
    const newNote = {
      title: req.body.title,
      content: req.body.content
    };
    notes.push(newNote);
    res.send(JSON.stringify(newNote));
  });
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/*!
 * vary
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
