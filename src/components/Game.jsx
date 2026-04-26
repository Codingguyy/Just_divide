import { useGameState } from '../hooks/useGameState';
import { getHintCells } from '../utils/gameLogic';
import Header from './Header';
import Grid from './Grid';
import SidePanel from './SidePanel';
import GameOver from './GameOver';
import BackgroundImage from '../assets/background.png'
import '../styles/Game.css';
export default function Game() {
  const {state,actions,dragHandlers,touchHandlers}=useGameState();
  const activeVal=state.queue[0];
  const hintCells=state.hintsEnabled&&activeVal?getHintCells(state.grid,activeVal):[];
  return(
    <div className="game-wrapper">
     <img src={BackgroundImage} alt='An asset' className="backgroundImage"/>
<div className="game-container">
        <Header
          timer={state.timer}
          hintsEnabled={state.hintsEnabled}
          onUndo={actions.undo}
          onToggleHints={actions.toggleHints}
        />
<div className="game-layout">
          <Grid
            grid={state.grid}
            level={state.level}
            score={state.score}
            hintCells={hintCells}
            onCellClick={(idx)=>actions.placeTile(idx,activeVal)}
            onDragOver={dragHandlers.handleDragOver}
            onDrop={dragHandlers.handleDrop}
            onRestart={actions.restart}
            onUndo={actions.undo}
            bestScore={state.bestScore}
            hintsEnabled={state.hintsEnabled}
            difficulty={state.difficulty}
          />
<SidePanel
            queue={state.queue}
            keepVal={state.keepVal}
            trashCount={state.trashCount}
            onKeep={actions.keep}
            onTrash={actions.trash}
            onDragStart={dragHandlers.handleDragStart}
            onDragOver={dragHandlers.handleDragOver}
            onDrop={dragHandlers.handleDrop}
            onTouchStart={touchHandlers.handleTouchStart}
            onTouchMove={touchHandlers.handleTouchMove}
            onTouchEnd={touchHandlers.handleTouchEnd}
          />
        </div>
      </div>
{state.gameOver&&(
        <GameOver
          score={state.score}
          bestScore={state.bestScore}
          onRestart={actions.restart}
        />
      )}
    </div>
  );
}
