# AI-Era Tech Interview Examples

This repository is the companion code for the book Acing the Frontend Interview. It is written for any engineer whose interview loop now includes reviewing or extending AI-generated code, whether the role is frontend, full-stack, or backend.

Each example is small and runnable (React, TypeScript, and Node.js) and isolates one fundamental that interviewers probe:
* How the browser treats markup, styles, forms, and its builtin APIs
* How JavaScript and TypeScript behave at runtime
* How React renders, manages state, and handles failure
* How systems are designed and scaled, from one component to many services

## Requirements
* Node.js: v22.22 or higher
* npm: v10 or higher

## Getting started
1. Clone the repository
```
git clone https://github.com/JenniferFuBook/ai-era-tech-interview
cd ai-era-tech-interview
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm run dev
```
You should see output like:
```
> ai-era-tech-interview@1.0.0 dev
> vite
  VITE v8.1.3  ready in 207 ms
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```
Open a browser and go to `http://localhost:5173` to view the following “My Favorite Article” page:

![alt text](https://github.com/JenniferFuBook/ai-era-tech-interview/blob/main/public/my-favorite-article.png?raw=true)

## Running examples
By default, the app runs the `BlogPostExample`.

### Run a specific example
You can launch a specific example by setting the `VITE_NAME` environment variable:
```
VITE_NAME=CssSpecificityExample npm run dev
```

### Hot-reload friendly configuration
In `App.tsx`, you can set the example programmatically:
```
const exampleName = import.meta.env.VITE_NAME || 'BlogPostExample';
// You can also hardcode a specific example:
const exampleName = 'CssSpecificityExample';
```

### Form examples: Web3Forms access key
The form examples (`FormSimple`, `FormAdvanced`) submit to [Web3Forms](https://web3forms.com), a privacy-friendly service that delivers form submissions to an email inbox with no backend required. Before running them, obtain a free access key from https://web3forms.com, then add the key to the shell configuration file (`.zshrc` or `.bashrc`):
```
export WEB3FORMS_ACCESS_KEY="<your_access_key>"
```
Create a `.env` file in the project root with the following content:
```
VITE_ACCESS_KEY=$WEB3FORMS_ACCESS_KEY
```
This keeps the access key out of the source code while making it available to Vite during development.

## Verifying the code (tests and CI)
Every example in this repository is checked automatically. A GitHub Actions workflow (`.github/workflows/ci.yml`) **runs on every push and pull request** (and can be started by hand from the repository's **Actions** tab). It runs `npm run testAll`, which performs four checks in order:

| Command | Checks |
|---|---|
| `npm run build` | TypeScript type-check (`tsc -b`), then a production `vite build` |
| `npm run lint` | ESLint |
| `npm test` | Vitest test suite |
| `npm run snippets` | Runs the standalone `node` snippets in `src/snippets/`, syntax-checking the ones that are long-running servers or browser-only demos |

### Run the checks manually
Run all four at once (the same command CI runs):
```
npm run testAll
```
Or run any single check on its own:
```
npm run build      # type-check and production build
npm run lint       # ESLint
npm test           # Vitest test suite
npm run snippets   # run the standalone snippets
```
A standalone snippet can also be executed directly, for example:
```
node src/snippets/ch05/closureExample.js
```

### Verify every branch
This repository keeps one branch per stage of the star rating case study (`main`, `initial-version`, `toggle-rating`, `half-star`, `animation`). To run the full suite against every local branch in turn, pass `--allBranches`:
```
npm run testAll -- --allBranches
```
The working tree must be clean. The command checks out each branch, runs the four checks, returns to the branch it started on, and prints a per-branch pass/fail summary.

## Examples by chapter
| Chapter | Examples (`VITE_NAME=`) |
|---|---|
| 3 — Frontend system design | `StarRatingExample`, `WeatherForecastApp` |
| 4 — HTML and CSS | `BlogPostExample`, `CssSpecificityExample`, `DragAndDrop`, `FormSimple`, `FormAdvanced` |
| 5 — JavaScript and TypeScript | `GenericConstraintsExample`, `GenericListExample`, `Timer` |
| 6 — React: core principles and patterns | `ContextApiExample`, `DebounceExample`, `PropDrillingExample`, `RenderComponentExample`, `SearchComponentExample`, `TooltipExample` |
| 7 — React in production | `MantineThemeExample`, `BlogPostApp`, `FaviconExample`, `ModularRouteApp`, `NestedRoutesExample`, `ProtectedRouteExample`, `ReactRouterExample` |
| 8 — Distributed systems | `LRUDemo` |

## Project structure
The repository is set up as a [Vite](https://vite.dev) TypeScript project. Vite is a modern build tool and development server that offers lightning-fast startup and hot module replacement for web projects. It is designed to provide an extremely fast and efficient development experience by leveraging native ES modules and smart caching. The directory and code structure are organized as follows:
```
ai-era-tech-interview/             # Root of the project
  ├── public/                      # Static assets (images, fonts, etc.)
  ├── src/                         # Application source code
  |     ├── algorithms/            # Common algorithm implementations
  │     ├── assets/                # Shared images and assets
  │     ├── components/            # Reusable React components
  │     ├── hooks/                 # Custom React hooks
  │     ├── snippets/              # Code snippets
  │     ├── features/              # Feature apps for the modular routing example
  │     ├── styles/                # Shared style helpers
  │     ├── use-cases/             # Individual use case demos
  │     ├── App.tsx                # Main app component
  │     ├── index.css              # Global styles
  │     ├── main.tsx               # Standard app entry point
  │     └── vite-env.d.ts          # Vite environment type declarations
  ├── .env                         # Environment variable definitions
  ├── .gitignore                   # Git ignore rules
  ├── eslint.config.js             # ESLint configuration
  ├── index.html                   # Main HTML entry point
  ├── package.json                 # Project metadata and scripts
  ├── README.md                    # Project documentation
  ├── tsconfig.app.json            # TypeScript config for the app
  ├── tsconfig.json                # Base TypeScript configuration
  ├── tsconfig.node.json           # Node.js-specific TypeScript config
  └── vite.config.ts               # Vite configuration
```