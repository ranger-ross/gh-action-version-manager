import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { parseMajorVersion } from './utils';

async function main() {
    try {
        const version = core.getInput('version');
        const token = core.getInput('token');
        const majorVersion = parseMajorVersion(version);
        const octokit = getOctokit(token);

        // @ts-ignore TODO: FIX?
        const res = await octokit.git.createTag({
            ...context.repo,
            tag: `v${majorVersion}`,
            message: "Hello",
            object: version,
            type: 'commit',
          });

          console.log(res);
    } catch (error: any) {
        core.setFailed(error.message);
    }
}


main()