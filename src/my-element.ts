import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * A tic-tac-toe game element.
 */
@customElement('my-element')
export class MyElement extends LitElement {
  /**
   * The game board state - 9 cells (null = empty, 'X' or 'O')
   */
  @property({ type: Array })
  board: (string | null)[] = Array(9).fill(null)

  /**
   * Current player ('X' or 'O')
   */
  @property({ type: String })
  currentPlayer: 'X' | 'O' = 'X'

  /**
   * Game winner or null if game is ongoing
   */
  @property({ type: String })
  winner: string | null = null

  render() {
    return html`
      <div class="game">
        <h1>Tic-Tac-Toe</h1>
        
        ${this.winner 
          ? html`<div class="status winner">🎉 ${this.winner} Wins! 🎉</div>`
          : this.board.every(cell => cell !== null)
          ? html`<div class="status draw">It's a Draw!</div>`
          : html`<div class="status">Current Player: ${this.currentPlayer}</div>`
        }

        <div class="board">
          ${this.board.map((cell, index) => html`
            <button 
              class="cell ${cell ? 'filled' : ''}"
              @click=${() => this._handleCellClick(index)}
              ?disabled=${cell !== null || this.winner !== null}
            >
              ${cell || ''}
            </button>
          `)}
        </div>

        ${(this.winner || this.board.every(cell => cell !== null))
          ? html`<button class="reset" @click=${this._resetGame}>Play Again</button>`
          : ''
        }
      </div>
    `
  }

  private _handleCellClick(index: number) {
    if (this.board[index] || this.winner) return

    // Update board
    const newBoard = [...this.board]
    newBoard[index] = this.currentPlayer
    this.board = newBoard

    // Check for winner
    this.winner = this._checkWinner()

    // Switch player if no winner
    if (!this.winner) {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
    }
  }

  private _checkWinner(): string | null {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ]

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern
      if (this.board[a] && 
          this.board[a] === this.board[b] && 
          this.board[a] === this.board[c]) {
        return this.board[a]
      }
    }

    return null
  }

  private _resetGame() {
    this.board = Array(9).fill(null)
    this.currentPlayer = 'X'
    this.winner = null
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .game {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    h1 {
      font-size: 3rem;
      margin: 0;
      color: #646cff;
    }

    .status {
      font-size: 1.5rem;
      font-weight: 600;
      min-height: 2rem;
    }

    .status.winner {
      color: #4caf50;
      animation: pulse 1s ease-in-out infinite;
    }

    .status.draw {
      color: #ff9800;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    .board {
      display: grid;
      grid-template-columns: repeat(3, 120px);
      grid-template-rows: repeat(3, 120px);
      gap: 10px;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .cell {
      background-color: #ffffff;
      border: none;
      border-radius: 10px;
      font-size: 3rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s ease;
      color: #333;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .cell:hover:not(:disabled) {
      background-color: #f0f0f0;
      transform: scale(1.05);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    .cell:active:not(:disabled) {
      transform: scale(0.95);
    }

    .cell:disabled {
      cursor: not-allowed;
      opacity: 0.9;
    }

    .cell.filled {
      animation: popIn 0.3s ease;
    }

    @keyframes popIn {
      0% { transform: scale(0); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }

    .reset {
      padding: 1rem 2rem;
      font-size: 1.2rem;
      font-weight: 600;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .reset:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    .reset:active {
      transform: translateY(0);
    }

    @media (prefers-color-scheme: light) {
      .cell {
        background-color: #ffffff;
        color: #333;
      }
      
      .cell:hover:not(:disabled) {
        background-color: #f5f5f5;
      }
    }

    @media (max-width: 600px) {
      .board {
        grid-template-columns: repeat(3, 90px);
        grid-template-rows: repeat(3, 90px);
        gap: 8px;
        padding: 15px;
      }

      .cell {
        font-size: 2rem;
      }

      h1 {
        font-size: 2rem;
      }

      .status {
        font-size: 1.2rem;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
