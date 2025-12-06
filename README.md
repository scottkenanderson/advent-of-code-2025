# Scott's Advent of Code 2025 🎄

Welcome to Scott's personal Advent of Code 2025 repository! 🎅✨ This is where the magic happens as Scott tackles the daily coding challenges of December. It's all set up to make the journey smooth and enjoyable, so grab a cuppa and let's dive in.

## Project Structure

Here's how Scott has organised the project:

- **`packages/`**: Each day's solution lives here in its own folder (e.g., `day01`, `day02`, etc.). There's also a `common` package for shared utilities.
- **`scripts/`**: Handy scripts to automate tasks, including the magical `new-day.cjs`.
- **`tmp/`**: A temporary space for any intermediate files or experiments.

## Getting Started

1. **Install Dependencies**:
   Make sure you've got Node.js (v24.11.1) installed. Then, run:
   ```bash
   npm install
   ```

2. **Build the Project**:
   Before running tests or scripts, ensure everything is built:
   ```bash
   npm run build
   ```

3. **Run Tests**:
   To verify the solutions:
   ```bash
   npm test
   ```
   Or, if you prefer a watch mode:
   ```bash
   npm run test:watch
   ```

4. **Lint the Code**:
   Keep the code tidy:
   ```bash
   npm run lint
   ```
   Auto-fix linting issues:
   ```bash
   npm run lint:fix
   ```

## Node Version Management

This project uses `nvm` (Node Version Manager) to manage the Node.js version. The required version is specified in the `.nvmrc` file. To ensure you're using the correct version:

1. Install `nvm` if you haven't already. Follow the instructions [here](https://github.com/nvm-sh/nvm#installing-and-updating).
2. Run the following command to switch to the correct Node.js version:
   ```bash
   nvm use
   ```

This ensures that you're using the Node.js version specified for the project, which is currently `v24.11.1`.

## Adding a New Day

When a new challenge drops, Scott can run:
```bash
npm run new-day
```
This will:
- Create a new folder under `packages/` for the day.
- Set up the necessary files (e.g., `input.txt`, `index.ts`, `index.test.ts`).

All that's left is to fill in the blanks and start coding! 🎅

## Tips & Tricks

- **Shared Utilities**: Check out the `common` package for reusable functions like array manipulation, grid handling, and more.
- **Inputs**: Each day's folder contains `input.txt` and `input.example.txt`. Use these to test the solutions.
- **GitHub Actions**: The project is set up with CI to lint and test the code on every push or pull request.

## Troubleshooting

- **Module Not Found**: If errors about missing modules appear, ensure `npm run build` has been run.
- **Tests Failing**: Placeholder tests are included to keep Jest happy. Replace them with real tests as challenges are solved.
