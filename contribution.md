
# Contributing

We welcome contributions! Please follow these guidelines to help us review and merge your changes smoothly.

## Quick start

1. Fork the repository on GitHub: https://github.com/gdgusar/website
2. Clone your fork and enter the project directory:

```bash
git clone https://github.com/<your-username>/website.git
cd website
```

3. Add the upstream remote (the original repo) so you can pull updates:

```bash
git remote add upstream https://github.com/gdgusar/website.git
git fetch upstream
```

4. Update `main` and create a branch for your work (see branch naming):

```bash
git checkout main
git pull upstream main
git checkout -b feature/brief-description
```

## Branch naming

Use short, descriptive names. Common patterns:

- `feature/<short-description>`
- `fix/<short-description>`
- `refactor/<short-description>`
- `chore/<short-description>`

Include an issue number when relevant: `fix/123-fix-login`

## Making changes

- Make small, focused commits. Stage and commit only related files:

```bash
git add <files>
git commit -m "type: short description"
```

Commit message tips: start with a type (`feat`, `fix`, `chore`, `refactor`) and keep the summary concise.

## Push and open a Pull Request

Push your branch to your fork and open a PR against `gdgusar/website:main`:

```bash
git push -u origin feature/brief-description
```

- Open a pull request against `gdgusar/website:main`. In the PR include:
	- What changed and why
	- Any setup or test steps reviewers should run
	- Related issue links

Use a draft PR while still working.

## Working with shared branches / pushed commits

- Coordinate before rewriting published history. If you must rewrite, use:

```bash
git push --force-with-lease origin <branch-name>
```

If a commit has been pushed and you want to undo it without rewriting history, use revert:

```bash
git revert <commit-hash>
git push origin <branch-name>
```


Thank you — we appreciate contributions. If you need help, open an issue or ask in the PR comments.

