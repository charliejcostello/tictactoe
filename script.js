(() => {
  const boardEl = document.getElementById('board');
  const cells = Array.from(document.querySelectorAll('.cell'));
  const statusEl = document.getElementById('status');
  const resetBtn = document.getElementById('reset');

  const WINNING_COMBOS = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diags
  ];

  let board;        // array of 9: 'X' | 'O' | null
  let player;       // 'X' | 'O'
  let gameOver;     // boolean

  function init() {
    board = Array(9).fill(null);
    player = 'X';
    gameOver = false;
    cells.forEach((c, i) => {
      c.textContent = '';
      c.classList.remove('disabled', 'win');
      c.disabled = false;
      c.setAttribute('aria-label', `Cell ${i + 1}`);
    });
    setStatus(`${player}'s turn`);
    boardEl.setAttribute('aria-label', 'Tic Tac Toe board, new game started');
  }

  function setStatus(text) {
    statusEl.textContent = text;
  }

  function handleCellClick(e) {
    const cell = e.currentTarget;
    const idx = Number(cell.dataset.index);

    if (gameOver || board[idx]) return;

    board[idx] = player;
    cell.textContent = player;
    cell.classList.add('disabled');
    cell.setAttribute('aria-label', `Cell ${idx + 1}, ${player}`);

    const winner = getWinner();
    if (winner) {
      highlightWin(winner.combo);
      setStatus(`${winner.player} wins!`);
      endGame();
      return;
    }

    if (board.every(Boolean)) {
      setStatus(`It's a draw.`);
      endGame();
      return;
    }

    player = player === 'X' ? 'O' : 'X';
    setStatus(`${player}'s turn`);
  }

  function getWinner() {
    for (const combo of WINNING_COMBOS) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { player: board[a], combo };
      }
    }
    return null;
  }

  function highlightWin(combo) {
    combo.forEach(i => cells[i].classList.add('win'));
  }

  function endGame() {
    gameOver = true;
    cells.forEach(c => c.classList.add('disabled'));
    cells.forEach(c => c.disabled = true);
  }

  // Events
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  resetBtn.addEventListener('click', init);

  // Start
  init();
})();
