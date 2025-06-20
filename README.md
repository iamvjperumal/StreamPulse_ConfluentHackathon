# StreamPulse_ConfluentHackathon

A Node.js + TypeScript project managed with [pnpm](https://pnpm.io/).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (v8+ recommended)

### Install Dependencies

```bash
pnpm install
```

### Run the Project

```bash
pnpm start
```

### Build

```bash
pnpm build
```

### Deploy

Deployment steps depend on your target platform. For example, to deploy to a cloud provider, follow their documentation after building:

```bash
pnpm build
# Then deploy the contents of the `dist` directory
```

## Scripts

- `pnpm start` — Run the application in development mode
- `pnpm build` — Compile TypeScript to JavaScript in the `dist` folder

## Project Structure

```
src/        # Source code
dist/       # Compiled output
package.json
tsconfig.json
```

## License

MIT