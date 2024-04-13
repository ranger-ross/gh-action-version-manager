# GitHub Action Version Manager

An action for automating the versioning of other GitHub Actions.

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
```


## License

The scripts and documentation in this project are released under the [MIT License](./LICENSE).

## Contibutions

Contributions are welcome. Please open a GitHub Issue and we can discuss.