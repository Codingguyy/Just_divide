import catImg from '../assets/Cat.png';
import placementImg from '../assets/Placement_Box.png';
import badgeImg from '../assets/LevelBadge.png';
import Tile from './Tile';
import '../styles/Grid.css';
export default function Grid({
  grid,
  level,
  score,
  hintCells,
  onCellClick,
  onDragOver,
  onDrop,
  onRestart,
  onUndo,
  bestScore,
  hintsEnabled,
  difficulty,
}){
  return(
    <div className="grid-section">
      <div className="grid-cat">
        <img src={catImg} alt="cat mascot" />
      </div>
<div className="grid-badges">
        <div className="badge">
          <img src={badgeImg} alt="" />
          <span className="badge__label">LEVEL {level}</span>
        </div>
        <div className="badge">
          <img src={badgeImg} alt="" />
          <span className="badge__label">SCORE {score}</span>
        </div>
      </div>
<div className="grid-board">
        {grid.map((val,idx) => {
          const isHint=hintCells.includes(idx);
          return (<div
              key={idx}
              data-cell-idx={idx}
              className={`grid-cell${val!==null?'grid-cell--occupied':''}`}
              onDragOver={onDragOver}
              onDrop={(e)=>onDrop(e,idx)}
              onClick={()=>val===null&&onCellClick(idx)}
            >{val===null?(
                <img
                  className="grid-cell__placement"
                  src={placementImg}
                  alt=""
                />):(
                <Tile value={val} size={72}/>
              )}
              {isHint &&<div className="grid-cell__hint-overlay"/>}
            </div>
          );
        })}
      </div><div className="grid-actions">
        <button
          className="grid-actions__btn grid-actions__btn--restart"
          onClick={onRestart}
        >
          RESTART (R)
        </button>
        <button
          className="grid-actions__btn grid-actions__btn--undo"
          onClick={onUndo}
        >UNDO (Z)
        </button>
      </div>
      <p className="grid-footer">
        Best: {bestScore} &nbsp;·&nbsp; Hints: {hintsEnabled?'ON':'OFF'} (G)
        &nbsp;·&nbsp; Difficulty: {difficulty} (keys 1/2/3)
      </p>
    </div>
  );
}
