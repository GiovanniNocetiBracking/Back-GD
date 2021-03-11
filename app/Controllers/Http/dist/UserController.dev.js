"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Mail = use("Mail");
var User = use("App/Models/User");
var Sensor = use("App/Models/Sensor");

var _use = use("Validator"),
    validate = _use.validate;

var Hash = use("Hash");

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: "login",

    /* ---------------------------------------------LOGIN-------------------------------------------- */
    value: function login(_ref) {
      var request, auth, response, _request$all, email, password, rules, messages, validation, token;

      return regeneratorRuntime.async(function login$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              request = _ref.request, auth = _ref.auth, response = _ref.response;
              _context.prev = 1;
              _request$all = request.all(), email = _request$all.email, password = _request$all.password;
              rules = {
                email: "required|email",
                password: "required"
              };
              messages = {
                "email.email": "Por favor ingrese un email valido",
                "email.required": "El campo email es obligatorio",
                "password.required": "El campo contraseña es obligatorio"
              };
              _context.next = 7;
              return regeneratorRuntime.awrap(validate(request.all(), rules, messages));

            case 7:
              validation = _context.sent;

              if (!validation.fails()) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return", response.json(validation));

            case 10:
              _context.next = 12;
              return regeneratorRuntime.awrap(auth.attempt(email, password));

            case 12:
              token = _context.sent;
              return _context.abrupt("return", response.json(token));

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](1);
              return _context.abrupt("return", response.json(_context.t0.message));

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 16]]);
    }
    /* -------------------------------------------REGISTER----------------------------------------- */

  }, {
    key: "store",
    value: function store(_ref2) {
      var request, response, _request$all2, email, password, username, suscribe, rules, messages, validation, userRepeat, newUser;

      return regeneratorRuntime.async(function store$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              request = _ref2.request, response = _ref2.response;
              _request$all2 = request.all(), email = _request$all2.email, password = _request$all2.password, username = _request$all2.username, suscribe = _request$all2.suscribe;
              rules = {
                email: "required|email|unique:users,email",
                password: "required",
                username: "required"
              };
              messages = {
                "email.unique": "El correo ingresado ya esta registrado",
                "email.required": "El campo correo es obligatorio",
                "email.email": "El email ingresado no es valido",
                "password.required": "El campo contraseña es obligatorio",
                "username.required": "El campo nombre es obligatorio"
              };
              _context2.next = 6;
              return regeneratorRuntime.awrap(validate(request.all(), rules, messages));

            case 6:
              validation = _context2.sent;
              _context2.prev = 7;

              if (!validation.fails()) {
                _context2.next = 23;
                break;
              }

              _context2.t0 = regeneratorRuntime;
              _context2.t1 = User.query().select("id").where("email", email).from("users");
              _context2.next = 13;
              return regeneratorRuntime.awrap(Hash.make(password));

            case 13:
              _context2.t2 = _context2.sent;
              _context2.t3 = username;
              _context2.t4 = {
                password: _context2.t2,
                username: _context2.t3
              };
              _context2.t5 = _context2.t1.update.call(_context2.t1, _context2.t4);
              _context2.next = 19;
              return _context2.t0.awrap.call(_context2.t0, _context2.t5);

            case 19:
              userRepeat = _context2.sent;
              return _context2.abrupt("return", response.json([validation, {
                registrado: "El usuario se a registrado con exito"
              }]));

            case 23:
              _context2.next = 25;
              return regeneratorRuntime.awrap(User.create({
                email: email,
                password: password,
                username: username,
                suscribe: suscribe
              }));

            case 25:
              newUser = _context2.sent;
              return _context2.abrupt("return", response.json([newUser, {
                registrado: "El usuario se a registrado con exito"
              }]));

            case 27:
              _context2.next = 32;
              break;

            case 29:
              _context2.prev = 29;
              _context2.t6 = _context2["catch"](7);
              return _context2.abrupt("return", response.json(eroor));

            case 32:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[7, 29]]);
    }
    /* -------------------------------------------- CONTACT US ------------------------------------- */

  }, {
    key: "contactUs",
    value: function contactUs(_ref3) {
      var request, _request$all3, name, email, subject, message, data, rules, messages, validation;

      return regeneratorRuntime.async(function contactUs$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              request = _ref3.request;
              _context3.prev = 1;
              _request$all3 = request.all(), name = _request$all3.name, email = _request$all3.email, subject = _request$all3.subject, message = _request$all3.message;
              data = request.body;
              rules = {
                email: "required|email",
                name: "required",
                subject: "required",
                message: "required"
              };
              messages = {
                "email.email": "Por favor ingrese un email valido",
                "email.required": "El campo email es obligatorio",
                "name.required": "El campo nombre es obligatorio",
                "subject.required": "El campo asunto es obligatorio",
                "message.required": "El campo mensaje es obligatorio"
              };
              _context3.next = 8;
              return regeneratorRuntime.awrap(validate(request.all(), rules, messages));

            case 8:
              validation = _context3.sent;

              if (!validation.fails()) {
                _context3.next = 13;
                break;
              }

              return _context3.abrupt("return", response.json(Validation));

            case 13:
              _context3.next = 15;
              return regeneratorRuntime.awrap(Mail.send("email", data, function (message) {
                message.to("giovanni.noceti@gmail.com").from("giovanni.noceti@gmail.com").subject(subject);
              }));

            case 15:
              return _context3.abrupt("return", response.json(data));

            case 16:
              _context3.next = 21;
              break;

            case 18:
              _context3.prev = 18;
              _context3.t0 = _context3["catch"](1);
              console.log(_context3.t0);

            case 21:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[1, 18]]);
    }
    /* ---------------------------------------------SUSCRIBE-------------------------------------- */

  }, {
    key: "suscribe",
    value: function suscribe(_ref4) {
      var request, response, _request$all4, email, suscribe, rules, messages, validation, userRepeat, user, newSuscriber;

      return regeneratorRuntime.async(function suscribe$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              request = _ref4.request, response = _ref4.response;
              _context4.prev = 1;
              _request$all4 = request.all(), email = _request$all4.email, suscribe = _request$all4.suscribe;
              rules = {
                email: "required|email|unique:users, email"
              };
              messages = {
                "email.unique": "El correo ingresado ya esta suscrito",
                "email.required": "El campo correo es obligatorio",
                "email.email": "El email ingresado es invalido"
              };
              _context4.next = 7;
              return regeneratorRuntime.awrap(validate(request.only("email"), rules, messages));

            case 7:
              validation = _context4.sent;

              if (!validation.fails()) {
                _context4.next = 22;
                break;
              }

              _context4.next = 11;
              return regeneratorRuntime.awrap(User.query().select("id", "suscribe").where("email", email).from("users").first());

            case 11:
              userRepeat = _context4.sent;
              _context4.next = 14;
              return regeneratorRuntime.awrap(User.find(userRepeat.id));

            case 14:
              user = _context4.sent;

              if (!(userRepeat.suscribe == 0)) {
                _context4.next = 21;
                break;
              }

              user.suscribe = 1;
              user.save();
              return _context4.abrupt("return", response.json({
                suscrito: "El usuario ahora esta suscrito"
              }));

            case 21:
              return _context4.abrupt("return", response.json(validation));

            case 22:
              _context4.next = 24;
              return regeneratorRuntime.awrap(User.create({
                email: email,
                suscribe: suscribe
              }));

            case 24:
              newSuscriber = _context4.sent;
              return _context4.abrupt("return", response.json(newSuscriber));

            case 28:
              _context4.prev = 28;
              _context4.t0 = _context4["catch"](1);
              return _context4.abrupt("return", response.json(_context4.t0.message));

            case 31:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[1, 28]]);
    }
  }, {
    key: "arduinoSensor",
    value: function arduinoSensor(_ref5) {
      var request, response, _request$all5, sensor, data;

      return regeneratorRuntime.async(function arduinoSensor$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              request = _ref5.request, response = _ref5.response;
              _context5.prev = 1;
              _request$all5 = request.all(), sensor = _request$all5.sensor;
              _context5.next = 5;
              return regeneratorRuntime.awrap(Sensor.create({
                sensor: sensor
              }));

            case 5:
              data = _context5.sent;
              return _context5.abrupt("return", response.json(data));

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](1);
              return _context5.abrupt("return", response.json(_context5.t0.message));

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[1, 9]]);
    }
  }]);

  return UserController;
}();

module.exports = UserController;