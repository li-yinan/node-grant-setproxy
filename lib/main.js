'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.exec = undefined;

var exec = exports.exec = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return grant();

                    case 2:
                        _context.next = 4;
                        return exe.apply(undefined, _args);

                    case 4:
                        return _context.abrupt('return', _context.sent);

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function exec() {
        return _ref.apply(this, arguments);
    };
}();

exports.grant = grant;
exports.exe = exe;
exports.hasGrant = hasGrant;

var _sudoPrompt = require('sudo-prompt');

var _sudoPrompt2 = _interopRequireDefault(_sudoPrompt);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var exeCmd = _path2.default.join(__dirname, '/tools/proxysetup');

function grant() {
    if (!hasGrant()) {
        var cmd = 'chown 0:0 ' + exeCmd + ';chmod u+s ' + exeCmd;
        return new Promise(function (resolve, reject) {
            _sudoPrompt2.default.exec(cmd, { name: 'darp' }, function (err) {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}

function exe() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    var cmd = exeCmd + ' ' + args.join(' ');
    return new Promise(function (resolve, reject) {
        _child_process2.default.exec(cmd, function (error, stdout, stderr) {
            if (error && !stderr) {
                return reject(error);
            }
            resolve({ stdout: stdout, stderr: stderr });
        });
    });
}

function hasGrant() {
    var stat = _fs2.default.statSync(exeCmd);
    return stat.uid === 0;
}

exec('-setwebproxystate', 'wi-fi', 'on');