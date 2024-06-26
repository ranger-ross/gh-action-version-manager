export function isMajorVersion(version: string) {
    // Check if the string starts with "v" and is followed by a number
    return /^v?\d+$/.test(version);
}

export function parseMajorVersion(version: string): number {
    let normalizedVersion = version
    if (version[0] === 'v') {
        normalizedVersion = version.substring(1)
    }


    let majorVersion = ''

    for (const char of normalizedVersion.split('')) {
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

    return parseInt(majorVersion)
}

