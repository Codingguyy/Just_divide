import '../styles/GameOver.css';
export default function GameOver({score,bestScore,onRestart}) {
  return (
    <div className="gameover-overlay">
      <div className="gameover-card">
        <div className="gameover-card__emoji">🎮</div>
        <div className="gameover-card__title">GAME OVER</div>
        <p className="gameover-card__score">
          Score:{' '}
          <span className="gameover-card__score-value">{score}</span>
        </p>
        <p className="gameover-card__best">
          Best:{' '}
          <span className="gameover-card__best-value">{bestScore}</span>
        </p>
        <button className="gameover-card__btn" onClick={onRestart}>
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}
