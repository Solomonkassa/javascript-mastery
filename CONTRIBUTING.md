# Contributing to JavaScript Mastery

First off, thank you for considering contributing to JavaScript Mastery! It's people like you that make this project great.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs
Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

1. **Use a clear and descriptive title**
2. **Describe the exact steps which reproduce the problem**
3. **Provide specific examples to demonstrate the steps**
4. **Describe the behavior you observed**
5. **Explain which behavior you expected to see instead**
6. **Include screenshots if possible**

### Suggesting Enhancements
Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

1. **Use a clear and descriptive title**
2. **Provide a step-by-step description of the suggested enhancement**
3. **Provide specific examples to demonstrate the steps**
4. **Describe the current behavior and explain the behavior you'd like to see**
5. **Explain why this enhancement would be useful**

### Pull Requests
1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Process

### Setting Up Development Environment
1. Fork and clone the repository
2. Install Node.js (version specified in `.nvmrc`)
3. Run `npm install`
4. Copy `.env.example` to `.env` and configure
5. Run `npm run dev` to start development

### Git Workflow
1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Commit Message Guidelines
We follow [Conventional Commits](https://www.conventionalcommits.org/).

Format: `<type>(<scope>): <subject>`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semi colons, etc
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Build process, tooling changes

Example: `feat(core): add user authentication`

### Testing
- Write tests for new features
- Ensure all tests pass before submitting PR
- Maintain or improve code coverage

### Code Style
- Use ESLint and Prettier configurations provided
- Follow the existing code style
- Write meaningful comments and documentation

## Project Structure
