import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { parseMajorVersion } from './utils';

async function main() {
    try {
        const version = core.getInput('version');
        const token = core.getInput('token');
        const majorVersion = parseMajorVersion(version);
        const octokit = getOctokit(token);
        const commitSha = core.getInput('commit_sha');

        console.log('STARTING', {commitSha, contextSha: context.sha})

        const res = await octokit.rest.git.createTag({
            ...context.repo,
            ref: `tags/v${majorVersion}`,
            tag: `v${majorVersion}`,
            message: "Hello",
            object: context.sha,
            type: 'commit',
        });

        console.log('createTag() completed', res)

        const r = await octokit.rest.git.createRef({
            ...context.repo,
            ref: `refs/tags/v${majorVersion}`,
            sha: res.data.sha
        });

        console.log('createRef() completed', r)

    } catch (error: any) {
        console.error(error);

        core.setFailed(error.message);
    }
}


main()