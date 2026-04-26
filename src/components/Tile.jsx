import { getTileColor } from '../utils/tileColors';
import '../styles/Tile.css';
export default function Tile({ value, size = 72 }) {
  const color=getTileColor(value);
  const fontSize=
    value>=1000
      ?size*0.24
      :value>=100
      ?size*0.29
      :value>=10
      ?size*0.35
      :size*0.43;
  return (
    <div className="tile" style={{width:size,height:size}}>
      {color.img?(
        <img className="tile__bg" src={color.img} alt=""/>
      ):(
        <div className="tile__bg--css" style={{background:color.bg}}/>
      )}
      <span
        className="tile__value"
        style={{fontSize,color:color.textColor}}
      >
        {value}
      </span>
    </div>
  );
}
