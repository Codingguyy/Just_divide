import '../styles/Background.css';
const BUBBLES = [
  {left:'3%',top:'5%',size:78},
  {left:'5%',top:'10%',size:20},
  {left:'6%',top:'17%',size:26},
  {left:'4%',top:'55%',size:118},
  {left:'8%',top:'72%',size:85},
  {left:'7%',top:'82%',size:32},
  {left:'19%',top:'91%',size:16},
  {left:'85%',top:'3%',size:98},
  {left:'92%',top:'15%',size:30},
  {left:'94%',top:'22%',size:20},
  {left:'88%',top:'46%',size:88},
  {left:'91%',top:'58%',size:30},
  {left:'87%',top:'66%',size:108},
  {left:'50%',top:'93%',size:68},
  {left:'58%',top:'96%',size:88},
];
export default function Background() {
  return (
    <div className="background">
      {BUBBLES.map((b,i)=>(<div
          key={i}
          className="background__bubble"
          style={{left:b.left,top:b.top,width:b.size,height:b.size}}/>
      ))}
    </div>
  );
}
