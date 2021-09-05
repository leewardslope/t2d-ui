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

### Scopes

> Format => scope colon space and commit msg; ex: "new: adding semantic PR to t2d repo"

- `new: `It is not a new feature to the repo, but it is new.
- `component: `new chakra-ui components
