'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Mail = use('Mail');
var User = use('App/Models/User');

var _use = use('Validator'),
    validate = _use.validate;

var Hash = use('Hash');

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: "contactUs",
    value: function contactUs(_ref) {
      var request, _request$all, name, email, subject, message, data, rules, validation;

      return regeneratorRuntime.async(function contactUs$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              request = _ref.request;
              _context.prev = 1;
              _request$all = request.all(), name = _request$all.name, email = _request$all.email, subject = _request$all.subject, message = _request$all.message;
              data = request.body;
              rules = {
                email: 'required|email',
                name: 'required',
                subject: 'required',
                message: 'required'
              };
              _context.next = 7;
              return regeneratorRuntime.awrap(validate(request.all(), rules));

            case 7:
              validation = _context.sent;

              if (!validation.fails()) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", response.json(Validation));

            case 12:
              _context.next = 14;
              return regeneratorRuntime.awrap(Mail.send('email', data, function (message) {
                message.to('giovanni.noceti@gmail.com').from('giovanni.noceti@gmail.com').subject(subject);
              }));

            case 14:
              return _context.abrupt("return", console.log(data));

            case 15:
              _context.next = 20;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](1);
              console.log(_context.t0);

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 17]]);
    }
  }, {
    key: "login",
    value: function login(_ref2) {
      var request, auth, response, _request$all2, email, password, rules, validation, token;

      return regeneratorRuntime.async(function login$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              request = _ref2.request, auth = _ref2.auth, response = _ref2.response;
              _context2.prev = 1;
              _request$all2 = request.all(), email = _request$all2.email, password = _request$all2.password;
              rules = {
                email: 'required|email',
                password: 'required'
              };
              _context2.next = 6;
              return regeneratorRuntime.awrap(validate(request.all(), rules));

            case 6:
              validation = _context2.sent;

              if (!validation.fails()) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", console.log(validation));

            case 9:
              _context2.next = 11;
              return regeneratorRuntime.awrap(auth.attempt(email, password));

            case 11:
              token = _context2.sent;
              return _context2.abrupt("return", console.log(token));

            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", response.json(_context2.t0.message));

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[1, 15]]);
    }
  }, {
    key: "store",
    value: function store(_ref3) {
      var request, response, _request$all3, email, password, username, suscribe, rules, validation, userRepeat;

      return regeneratorRuntime.async(function store$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              request = _ref3.request, response = _ref3.response;
              _request$all3 = request.all(), email = _request$all3.email, password = _request$all3.password, username = _request$all3.username, suscribe = _request$all3.suscribe;
              rules = {
                email: 'required|email|unique:users,email',
                password: 'required',
                username: 'required'
              };
              _context3.next = 5;
              return regeneratorRuntime.awrap(validate(request.all(), rules));

            case 5:
              validation = _context3.sent;

              if (!validation.fails()) {
                _context3.next = 21;
                break;
              }

              _context3.t0 = regeneratorRuntime;
              _context3.t1 = User.query().select('id').where('email', email).from('users');
              _context3.next = 11;
              return regeneratorRuntime.awrap(Hash.make(password));

            case 11:
              _context3.t2 = _context3.sent;
              _context3.t3 = username;
              _context3.t4 = {
                password: _context3.t2,
                username: _context3.t3
              };
              _context3.t5 = _context3.t1.update.call(_context3.t1, _context3.t4);
              _context3.next = 17;
              return _context3.t0.awrap.call(_context3.t0, _context3.t5);

            case 17:
              userRepeat = _context3.sent;
              return _context3.abrupt("return", response.json({
                "registrado": "El usuario se a registrado con exito"
              }));

            case 21:
              _context3.next = 23;
              return regeneratorRuntime.awrap(User.create({
                email: email,
                password: password,
                username: username,
                suscribe: suscribe
              }));

            case 23:
              return _context3.abrupt("return", response.json({
                "registrado": "El usuario se a registrado con exito"
              }));

            case 24:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
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
                email: 'required|email|unique:users, email'
              };
              messages = {
                'email.unique': 'El correo ingresado ya esta suscrito'
              };
              _context4.next = 7;
              return regeneratorRuntime.awrap(validate(request.only('email'), rules, messages));

            case 7:
              validation = _context4.sent;

              if (!validation.fails()) {
                _context4.next = 22;
                break;
              }

              _context4.next = 11;
              return regeneratorRuntime.awrap(User.query().select('id', 'suscribe').where('email', email).from('users').first());

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
                "suscrito": "El usuario ahora esta suscrito"
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
  }]);

  return UserController;
}();

module.exports = UserController;