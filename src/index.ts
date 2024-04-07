import * as core from '@actions/core';
import * as github from '@actions/github';
import { parseMajorVersion } from './utils';

async function main() {
    try {
        const version = core.getInput('version');
        const token = core.getInput('token');
        const majorVersion = parseMajorVersion(version);
        const octokit = github.getOctokit(token);

    } catch (error: any) {
        core.setFailed(error.message);
    }
}


main()