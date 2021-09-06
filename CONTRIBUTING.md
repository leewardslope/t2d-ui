# Table of Contents

- [Branch name conventions](#branch-name-conventions)
- - [Permanent Branches](#permanent-branches)
- - [Temporary Branches](#temporary-branches)
- [Do follow the semantic PR's](#do-follow-the-semantic-prs)
- [A small beginner friendly overview](#a-small-beginner-friendly-overview)

# Branch name conventions

Most of the content I mention here are a collection of best practices. There is nothing special here, if you are already familiar with developer friendly branch naming conventions. There

## Permanent Branches

### Main

This is the main branch, some people might also term it as a `master` branch, but during the 2020 Black lives matter, github took an initiative to make its master brach as main. And I really like PoV.

Also, this is the production ready branch, if the repository is published, this is the default branch being presented.

### Devel

This branch is synonymous to development branch. All new features and bug fixes should be brought to the development branch. Resolving developer codes conflicts should be done as early as here.

> This branch is not yet ready, should wait for the first release.

#### Small Note

We are not yet implementing the traditional `development > test > staging > production`. Adding this right now makes things more complicated rather than being development friendly.

> In subsequent releases we might come across a need for such practices, but for now it is not required.

## Temporary Branches

The reason for mentioning `permanent branches` is to make sure that all the contributors are on same page. But when it comes to real development/ PRs temporary branches are the goto solutions.

So here are few list of acceptable branch conventions with some details.

### Feature

Any code changes for a new module or use case should be done on a feature branch. This branch is created based on the current development branch. When all changes are Done, a Pull Request/Merge Request is needed to put all of these to the development branch.

> Along with the feature also, mention the directory. `feature/directory/`
> Examples:

- `feature/integrate-swagger`
- `feature/client/new-component`
- `feature/server/multi-thread`

### Bug Fix

If the code changes made from the feature branch were rejected after a release, sprint or demo, any necessary fixes after that should be done on the bugfix branch.

Examples:

- `bugfix/client/more-gray-shades`
- `bugfix/ansible/improve-playbook`

### Hot Fix

If there is a need to fix a blocker, do a temporary patch, apply a critical framework or configuration change that should be handled immediately, it should be created as a Hotfix. It does not follow the scheduled integration of code and could be merged directly to the production branch, then on the development branch later.

Examples:

- `hotfix/client/disable-endpoint-zero-day-exploit`
- `hotfix/server/increase-scaling-threshold`

### Experimental

Any new feature or idea that is not part of a release or a sprint. A branch for playing around.

Examples:

- `experimental/client/dark-theme-support`
- `experimental/ansible/domain-support`

### Build

A branch specifically for creating specific build artifacts or for doing code coverage runs.

Examples:

- `build/jacoco-metric`
- `build/server/updating-npm-packages`

### Release

A branch for tagging a specific release version

Examples:

- `release/t2d-1.01.123`

Git also supports tagging a specific commit history of the repository. A release branch is used if there is a need to make the code available for checkout or use.

# Do follow the semantic PR's

WIth the introduction of [Sematic Pull Requests](https://github.com/zeke/semantic-pull-requests) this repo has GitHub status check that ensures your `pull requests` and `commits` follow the Conventional Commits spec.

> For more in-depth information, you can refer to the [official repo](https://github.com/zeke/semantic-pull-requests).

## Must follow guide

1. Among all of your commits, there should be at least one commit which follows the conventional commit specs.
2. The title should always be semantic.

> If you wanna introduce/use a new semantic convention, ping @akhil-naidu.

## Here are few types and scopes

There is no much difference to explain between types and scopes. It would be better if you think these terms in this way.

- `Type` is nothing but the conventional/traditional terms
- Where as, `Scope` is project based semantics.

### Types supported by t2d

> Format => type colon space and commit msg; ex: "chore: removing unnecessary comments"

- `feat: `a new feature for the user, not a new feature for a build script
- `fix: `bug fix for the user, not a fix to a build scripts
- `refactor: `refactoring production code
- `chore: `updating tasks, or routine changes etc.; no production code change
- `docs: `changes to documentation
- `style: `formatting, missing semicolons, etc.; no code change
- `perf: `code improved in terms of processing performance
- `vendor: `update version for dependencies, packages.
- `test: `adding missing tests, refactoring tests; no production code change
- `revert: `reverts a previous commit
- `build: `changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)

### Scopes

> Format => scope colon space and commit msg; ex: "new: adding semantic PR to t2d repo"

- `new: `It is not a new feature to the repo, but it is new.
- `component: `new chakra-ui components

# A small beginner friendly overview

### Initial setup

```
git clone https://github.com/leewardslope/t2d
git checkout -b feature/client/changelog
git push --set-upstream origin feature/client/changelog
```

With this initial setup, now you can do all the changes you want. And also, frequently use the commit messages, if you are not good with terminal commit messages, use VSCode gitlens extension.

- semantic commit message format => `feat: adding changelog`
- Now you can push the code, `git push` or use gitlens.
- Once the push, was done, you can navigate to github account in browser and raise a PR, where even the title should be in semantic
- Once you have all the build verifications, and acceptable code, it can be merged by any maintainer.

### Deleting finished branches

First we delete the remote branch and then our local branch.

```
git checkout main
git push origin --delete feature/client/changelog
git branch -D feature/client/changelog
git pull origin main
```

> Now, repeat the same process for every PR.
