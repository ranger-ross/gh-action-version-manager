# GitHub Action Version Manager

[![Run Tests](https://github.com/ranger-ross/gh-action-version-manager/actions/workflows/check.yaml/badge.svg)](https://github.com/ranger-ross/gh-action-version-manager/actions/workflows/check.yaml)

An action for automating the versioning of other GitHub Actions.

This action will update a "major version tag" (ie. `v1`) when a semver tag (ie. `v1.1.0`) is updated.

For more information on GitHub Action versioning see the [offical documentation](https://docs.github.com/en/actions/creating-actions/about-custom-actions#using-release-management-for-actions)

## Usage

```yaml
name: Publish major version tag

on:
  push:
    tags:
      - "v**"

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions: write-all
    steps:
    - uses: ranger-ross/gh-action-version-manager@v1
      with:
        version: ${{ github.ref_name }}
        token: ${{ secrets.GITHUB_TOKEN }}
```


## License

The scripts and documentation in this project are released under the [MIT License](./LICENSE).

## Contibutions

Contributions are welcome. Please open a GitHub Issue and we can discuss.
