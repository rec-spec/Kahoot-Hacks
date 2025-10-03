async function joinGame(pin, nickname) {
  const response = await fetch(`https://kahoot.it/reserve/game?gameID=${pin}&name=${nickname}`);
  const data = await response.json();
  return data;
}

async function fetchQuestions(gameID) {
  const response = await fetch(`https://kahoot.it/game/${gameID}/questions`);
  const data = await response.json();
  return data;
}

async function submitAnswer(gameID, questionID, answer) {
  await fetch(`https://kahoot.it/game/${gameID}/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ questionID, answer })
  });
}

window.startBot = async function() {
  const gamePin = document.getElementById('gamePin').value;
  const nickname = document.getElementById('nickname').value;

  try {
    const game = await joinGame(gamePin, nickname);
    const questions = await fetchQuestions(game.gameID);

    for (const question of questions) {
      const correctAnswer = question.correctAnswer; // Assume this is the correct answer
      await submitAnswer(game.gameID, question.id, correctAnswer);
    }
  } catch (error) {
    console.error('Bot encountered an error:', error);
  }
};
