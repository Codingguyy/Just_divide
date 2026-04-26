import Tile from './Tile';
import '../styles/Panel.css';
const QUEUE_CLASSES = [
  'queue-tile queue-tile--active',
  'queue-tile queue-tile--second',
  'queue-tile queue-tile--third',
];
const QUEUE_SIZES = [72, 60, 52];
export default function SidePanel({
  queue,
  keepVal,
  trashCount,
  onKeep,
  onTrash,
  onDragStart,
  onDragOver,
  onDrop,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) {
  return (
    <div className="side-panel">
      <div className="panel-slot">
        <div
          data-action="keep"
          className={`panel-slot__box ${keepVal ?'panel-slot__box--keep-filled':'panel-slot__box--keep-empty'}`}
          onDragOver={onDragOver}
          onDrop={(e) => { e.preventDefault(); onKeep();}}
          onClick={onKeep}
        >
          {keepVal ? (
            <Tile value={keepVal} size={66} />
          ) : (
            <div className="panel-slot__keep-placeholder" />
          )}
        </div>
        <span className="panel-slot__label panel-slot__label--keep">KEEP</span>
      </div>
      <div className="queue-container">
        {queue.map((val, qi) => (
          <div
            key={qi}
            className={QUEUE_CLASSES[qi]}
            draggable={qi===0}
            onDragStart={qi===0?(e) =>onDragStart(e,val):undefined}
            onTouchStart={qi===0?(e) =>onTouchStart(e,val):undefined}
            onTouchMove={qi===0?onTouchMove:undefined}
            onTouchEnd={qi===0?onTouchEnd:undefined}
          >
            <Tile value={val} size={QUEUE_SIZES[qi]} />
          </div>
        ))}
      </div>
      <div className="panel-slot">
        <span className="panel-slot__label panel-slot__label--trash">TRASH</span>
        <div
          data-action="trash"
          className={`panel-slot__box ${trashCount >0?'panel-slot__box--trash-active':'panel-slot__box--trash-disabled'}`}
          onDragOver={onDragOver}
          onDrop={(e)=>{e.preventDefault();onTrash();}}
          onClick={onTrash}
        >
          <div className="panel-slot__trash-inner">
            <span className="panel-slot__trash-icon">🗑️</span>
            <span className="panel-slot__trash-count">×{trashCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
