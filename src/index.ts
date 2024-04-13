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
        const majorVersionTagName = `v${majorVersion}`
        const octokit = getOctokit(token);

        console.log(`Fetching tag ${version}`);
        const tagResponse = await octokit.rest.git.getRef({
            ...context.repo,
            ref: `tags/${version}`
        });

        let isUpdate = false;

        try {
            console.log(`Fetching major version tag ${majorVersionTagName}`);
            const tagResponse = await octokit.rest.git.getRef({
                ...context.repo,
                ref: `tags/${majorVersionTagName}`
            });

            isUpdate = tagResponse.status == 200;
        } catch (e: any) {
            if (e.status == 422) {
                console.log(`Major version tag ${majorVersionTagName} already exists`);
            }
        }

        console.log(`Creating annotated tag ${majorVersionTagName}`);
        const createTagResponse = await octokit.rest.git.createTag({
            ...context.repo,
            ref: `tags/${majorVersionTagName}`,
            tag: majorVersionTagName,
            message: "Hello",
            object: tagResponse.data.object.sha,
            type: 'commit',
        });

        if (isUpdate) {
            console.log(`Updating Git ref with commit sha ${createTagResponse.data.sha}`);
            const refResponse = await octokit.rest.git.updateRef({
                ...context.repo,
                ref: `refs/tags/${majorVersionTagName}`,
                sha: createTagResponse.data.sha,
                force: true
            });
            console.log(`Success! Updated new tag ${majorVersionTagName} with commit sha ${refResponse.data.object.sha}`);
        } else {
            console.log(`Creating Git ref with commit sha ${createTagResponse.data.sha}`);
            const refResponse = await octokit.rest.git.createRef({
                ...context.repo,
                ref: `refs/tags/${majorVersionTagName}`,
                sha: createTagResponse.data.sha
            });
            console.log(`Success! Created new tag ${majorVersionTagName} with commit sha ${refResponse.data.object.sha}`);
        }

    } catch (error: any) {
        console.debug(error);
        core.setFailed(error.message);
    }
}

main()