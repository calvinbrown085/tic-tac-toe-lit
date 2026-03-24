# Project Overview

This repository contains a simple Tic-Tac-Toe game implemented as a custom HTML element using the Lit library. It leverages Vite for a fast development experience and efficient bundling, providing a self-contained web component that manages its own game state and rendering.

## Architecture

The application's architecture is centered around a single Lit web component, `<my-element>`. This component encapsulates all the game logic, state management (board, current player, winner), and UI rendering for the Tic-Tac-Toe game. Vite serves as the build tool and development server, compiling the TypeScript and bundling the assets for the browser. The `index.html` file simply hosts this custom element, making it a standalone, embeddable game.

## Key Files

*   `package.json`: Defines the project's metadata, scripts for development (`dev`), building (`build`), and previewing (`preview`), and lists essential dependencies like `lit` (for web components), `typescript` (for type-safety), and `vite` (for development and bundling).
*   `src/my-element.ts`: This is the primary source file containing the `MyElement` Lit web component. It defines the game's properties (`board`, `currentPlayer`, `winner`) using `@property` decorators, implements the game logic (`_handleCellClick`, `_checkWinner`, `_resetGame`), renders the game board and status using Lit's `html` template literal, and applies styling using `static styles` with tagged `css` literal.
*   `index.html`: The main entry point for the application. It includes the necessary scripts and hosts the `<my-element>` custom tag, which the Lit component registers and renders.
*   `src/index.css`: Provides global CSS styles that apply across the application, potentially including resets or general typography.

## How to Run

To set up and run the Tic-Tac-Toe game locally:

1.  **Clone the repository** (if not already done):
    ```bash
    git clone https://github.com/calvinbrown085/tic-tac-toe-lit.git
    cd tic-tac-toe-lit
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the development server**:
    ```bash
    npm run dev
    ```
    This will start a Vite development server, usually accessible at `http://localhost:5173`.
4.  **Build for production**:
    ```bash
    npm run build
    ```
    This command compiles the TypeScript code and bundles the application into the `dist/` directory, ready for deployment.
5.  **Preview the production build**:
    ```bash
    npm run preview
    ```
    This command serves the static files from the `dist/` directory, allowing you to test the production build locally.

## Environment Variables

This project does not currently utilize any environment variables for configuration.