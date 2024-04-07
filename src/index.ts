import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { parseMajorVersion } from './utils';

async function main() {
    try {
        const version = core.getInput('version');
        const token = core.getInput('token');
        const majorVersion = parseMajorVersion(version);
        const octokit = getOctokit(token);

        const res = await octokit.rest.git.createTag({
            ...context.repo,
            ref: `refs/tags/v${majorVersion}`,
            tag: `v${majorVersion}`,
            message: "Hello",
            object: context.sha,
            type: 'commit',
        });

        await octokit.rest.git.createRef({
            ...context.repo,
            ref: `refs/tags/v${majorVersion}`,
            sha: res.data.sha
        });


    } catch (error: any) {
        core.setFailed(error.message);
    }
}


main()