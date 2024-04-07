"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core = require("@actions/core");
function main() {
    var version = core.getInput('version');
    console.log('FOUND ' + version);
    var majorVersion = parseMajorVersion(version);
    console.log('FOUND MAJOR => ' + majorVersion);
}
function parseMajorVersion(version) {
    var normalizedVersion = version;
    if (version[0] === 'v') {
        normalizedVersion = version.substring(1);
    }
    var majorVersion = '';
    for (var char in normalizedVersion.split('')) {
        if (char === '.') {
            break;
        }
        if (isNaN(parseInt(char))) {
            throw Error("Could not parse major version from tag name");
        }
        majorVersion += char;
    }
    if (majorVersion) {
        throw Error("Could not parse major version from tag name");
    }
    return parseInt(majorVersion);
}
main();
