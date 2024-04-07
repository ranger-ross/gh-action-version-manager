import * as core from '@actions/core';
import { parseMajorVersion } from './utils';

function main() {
    const version = core.getInput('version');

    console.log('FOUND ' + version)

    const majorVersion = parseMajorVersion(version);

    console.log('FOUND MAJOR => ' + majorVersion)
}


main()