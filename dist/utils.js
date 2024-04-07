"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMajorVersion = void 0;
function parseMajorVersion(version) {
    var normalizedVersion = version;
    if (version[0] === 'v') {
        normalizedVersion = version.substring(1);
    }
    var majorVersion = '';
    for (var _i = 0, _a = normalizedVersion.split(''); _i < _a.length; _i++) {
        var char = _a[_i];
        if (char === '.') {
            break;
        }
        if (isNaN(parseInt(char))) {
            throw Error("Could not parse major version from tag name");
        }
        majorVersion += char;
    }
    if (!majorVersion || majorVersion.length === 0) {
        throw Error("Could not parse major version from tag name");
    }
    return parseInt(majorVersion);
}
exports.parseMajorVersion = parseMajorVersion;
