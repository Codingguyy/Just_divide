import { formatTime } from '../utils/gameLogic';
import '../styles/Header.css';
export default function Header({timer,hintsEnabled,onUndo,onToggleHints}) {
  return (
    <>
      <div className="header">
        <button
          className="header__icon-btn header__icon-btn--undo"
          onClick={onUndo}
          title="Undo (Z)"
        >↩ Z
        </button>
        <div className="header__center">
          <div className="header__title">JUST DIVIDE</div>
          <div className="header__timer">
            <span className="header__timer-icon">⏳</span>
            <span className="header__timer-text">{formatTime(timer)}</span>
          </div>
        </div>
        <button
          className={`header__icon-btn header__icon-btn--hint${hintsEnabled?'active':''}`}
          onClick={onToggleHints}
          title="Toggle Hints (G)"
        >?
        </button>
      </div>
<p className="header__subtitle">
        DIVIDE WITH THE NUMBERS TO SOLVE THE ROWS AND COLUMNS.
      </p>
    </>
  );
}
