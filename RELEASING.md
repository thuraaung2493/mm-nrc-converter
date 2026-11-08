# Releasing

This project uses GitHub Actions for continuous integration and automated npm publishing.

CI runs on pull requests and pushes to `main` using Node.js 22 and 24.

Publishing runs only when a stable GitHub release is published. The workflow:

1. Verifies the release tag matches the package version.
2. Installs dependencies using the lockfile.
3. Runs all tests.
4. Previews the npm package contents.
5. Publishes to npm using OIDC trusted publishing with provenance.

Pull requests, normal pushes, draft releases, and prereleases do not publish packages.

## One-time npm configuration

In the [npm package settings](https://www.npmjs.com/package/@thuraaung2493/mm-nrc-converter/access), configure a GitHub Actions trusted publisher with the following values:

| Field                | Value                                       |
| -------------------- | ------------------------------------------- |
| Organization or user | `thuraaung2493`                             |
| Repository           | `mm-nrc-converter`                          |
| Workflow filename    | `publish.yml`                               |
| Environment name     | Leave blank                                 |
| Allowed action       | Enable direct publishing with `npm publish` |

The publishing workflow must exist at `.github/workflows/publish.yml`.

The workflow uses:

- GitHub-hosted Ubuntu runner
- Node.js 24
- npm 11
- `id-token: write` permission
- OIDC authentication and npm provenance

No `NPM_TOKEN` or `NODE_AUTH_TOKEN` secret is required.

See [npm trusted publishing documentation](https://docs.npmjs.com/trusted-publishers/) for more information.

This configuration is required only once, unless the repository or workflow settings change.

## Publishing a release

1. Update the version in `package.json` and `package-lock.json`.
2. Update `CHANGELOG.md` with the release changes.
3. Commit and push the changes, then merge into `main`.
4. Ensure the CI workflow passes.
5. Create a [GitHub release](https://github.com/thuraaung2493/mm-nrc-converter/releases/new) with the tag `v<version>`, targeting the tested commit on `main`.
6. Publish the release as a stable release, not a prerelease.
7. Verify the **Publish to npm** workflow succeeds.
8. Confirm the new version is available on [npm](https://www.npmjs.com/package/@thuraaung2493/mm-nrc-converter).

For example, package version `2.1.0` requires the GitHub release tag `v2.1.0`.

### Release rules

- The release tag must use the `v` prefix and exactly match `package.json`.
- `package.json` and `package-lock.json` must have matching versions.
- Only stable semantic versions (`MAJOR.MINOR.PATCH`) are supported by the publishing workflow.
- Publishing a stable GitHub release triggers npm publication.
- Creating a tag alone does not trigger publication.
- Draft releases and prereleases do not trigger publication.
- Already published npm versions cannot be overwritten.

## Troubleshooting

### Publishing fails before npm publication

Check the **Publish to npm** workflow logs.

Verify that:

- The npm trusted publisher configuration matches the GitHub repository and workflow.
- The release tag matches the package version.
- The package and lockfile versions match.
- All tests pass.

Fix the issue and rerun the failed GitHub Actions job.

### Version already exists on npm

npm does not allow overwriting an already published version.

Update the package version and changelog, then create a new GitHub release using the new version.

### Release does not trigger publishing

Confirm that:

- The GitHub release was published, not saved as a draft.
- The release is not marked as a prerelease.
- The publishing workflow exists at `.github/workflows/publish.yml`.
- The workflow is enabled in the repository.

A tag push alone does not trigger the publishing workflow.
