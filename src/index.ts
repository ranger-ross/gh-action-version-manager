import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { isMajorVersion, parseMajorVersion } from './utils';

async function main() {
    try {
        const version = core.getInput('version');
        const token = core.getInput('token');
        if (isMajorVersion(version)) {
            console.warn(`${version} is already a major version. Skipping`);
            return;
        }

        const majorVersion = parseMajorVersion(version);
        const octokit = getOctokit(token);

        console.log(`Fetching tag ${version}`);
        const tagResponse = await octokit.rest.git.getRef({
            ...context.repo,
            ref: `tags/${version}`
        });
        
        console.log(`Creating annotated tag ${majorVersion}`);
        const createTagResponse = await octokit.rest.git.createTag({
            ...context.repo,
            ref: `tags/v${majorVersion}`,
            tag: `v${majorVersion}`,
            message: "Hello",
            object: tagResponse.data.object.sha,
            type: 'commit',
        });

        console.log(`Creating Git ref with commit sha ${createTagResponse.data.sha}`);
        const refResponse = await octokit.rest.git.createRef({
            ...context.repo,
            ref: `refs/tags/v${majorVersion}`,
            sha: createTagResponse.data.sha
        });

        console.log(`Success! Created new tag v${majorVersion} with commit sha ${refResponse.data.object.sha}`);
    } catch (error: any) {
        console.debug(error);
        core.setFailed(error.message);
    }
}

main()