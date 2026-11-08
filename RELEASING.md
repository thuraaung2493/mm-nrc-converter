# Releasing

CI checks pull requests and pushes to `main` on Node 22 and 24. Publishing runs
only when a stable GitHub release is published. It checks the release version,
installs locked dependencies, runs all tests, previews the package, and publishes
to npm with OIDC and provenance. Pull requests, normal pushes, and prereleases
never publish a package.

## One-time npm configuration

In the [package settings](https://www.npmjs.com/package/mm-nrc-converter/access),
add a GitHub Actions trusted publisher with these exact values:

| Field | Value |
| --- | --- |
| Organization or user | `thuraaung2493` |
| Repository | `mm-nrc-converter` |
| Workflow filename | `publish.yml` |
| Environment name | Leave blank |
| Allowed action | Enable direct publishing with `npm publish` |

The workflow file must be pushed to `.github/workflows/publish.yml` in the
repository. No `NPM_TOKEN` or `NODE_AUTH_TOKEN` secret is needed. The publishing
job uses a GitHub-hosted runner, Node 24, npm 11, and `id-token: write`.

See [npm's trusted publishing documentation](https://docs.npmjs.com/trusted-publishers/)
for the account setup. The npm configuration must be saved before publishing the
first release through this workflow.

## Release 2.0.0

1. Commit and push the package changes, both workflows, and the version changes
   in `package.json` and `package-lock.json` to GitHub, then merge into `main`.
2. Wait for the CI workflow to pass.
3. Create a [GitHub release](https://github.com/thuraaung2493/mm-nrc-converter/releases/new)
   with the tag `v2.0.0`, targeting the tested commit on `main`. Use the 2.0.0
   changelog for release notes and publish it as a stable release.
4. Watch the **Publish to npm** workflow and verify the new version on npm.

The `v` prefix and exact version match are required. Publishing the GitHub
release triggers npm publication; a draft release or tag push alone does not.
An already published npm version cannot be overwritten.

## Subsequent releases

Update both package version files and the changelog in a pull request. Run the
checks, merge, then publish a stable GitHub release tagged `v<version>`. For
example, version `2.0.1` requires the tag `v2.0.1`.

If publishing fails before the npm version appears, fix the configuration and
rerun the failed GitHub Actions job. If the version already exists on npm,
prepare a new version instead of trying to publish it again.
