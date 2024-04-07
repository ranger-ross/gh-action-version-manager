import * as core from '@actions/core';

function main() {
    const version = core.getInput('version');

    console.log('FOUND ' + version)

    const majorVersion = parseMajorVersion(version);

    console.log('FOUND MAJOR => ' + majorVersion)

}

function parseMajorVersion(version: string): number {
    let normalizedVersion = version
    if (version[0] === 'v') {
        normalizedVersion = version.substring(1)
    }

    let majorVersion = ''

    for (const char in normalizedVersion.split('')) {
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

    return parseInt(majorVersion)
}



main()