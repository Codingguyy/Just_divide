export function getNeighbors(idx){
const row=Math.floor(idx/4);
const col=idx%4;
const neighbors=[];
if(row>0)neighbors.push(idx-4);
if(row<3)neighbors.push(idx+4);
if(col>0)neighbors.push(idx-1);
if(col<3)neighbors.push(idx+1);
return neighbors;
}

export function canMerge(a,b){
if(a===b)return true;
const big=Math.max(a,b);
const small=Math.min(a,b);
return big%small===0;
}

export function mergeResult(a,b){
if(a===b)return null;
const big=Math.max(a,b);
const small=Math.min(a,b);
const res=big/small;
return res===1?null:res;
}

export function resolveGrid(grid,placedIdx,placedVal){
const newGrid=[...grid];
newGrid[placedIdx]=placedVal;
let scoreGained=0;
let changed=true;

while(changed){
changed=false;
for(let i=0;i<16;i++){
if(newGrid[i]===null)continue;
const neighbors=getNeighbors(i);

for(const n of neighbors){
if(newGrid[n]===null)continue;

if(canMerge(newGrid[i],newGrid[n])){
  const a=newGrid[i];
  const b=newGrid[n];

if(a===b){
  newGrid[i]=null;
  newGrid[n]=null;
scoreGained+=a+b;
}else{
  const big=Math.max(a,b);
  const res=mergeResult(a,b);
  const bigIdx=a===big?i:n;
  const smallIdx=a===big?n:i;
  newGrid[bigIdx]=res;
  newGrid[smallIdx]=null;
  scoreGained+=big;
}

  changed=true;
  break;
}
}

if(changed) break;
}
}

return{grid:newGrid,scoreGained};
}

export function isGameOver(grid,queue){
const filled=grid.filter(v=>v!==null).length;
if(filled<16) return false;

const nextVal=queue[0];

for(let i=0;i<16;i++){
if(grid[i]!==null&&canMerge(grid[i],nextVal))return true;
}

return false;
}

export function getHintCells(grid,activeVal){
const hints=[];

for(let i=0;i<16;i++){
if(grid[i]!==null)continue;

const neighbors=getNeighbors(i);

for(const n of neighbors){
if(grid[n]!==null&&canMerge(grid[n],activeVal)){
hints.push(i);
break;
}
}
}

return hints;
}

const TILE_POOL_EASY=[2,3,4,5,6,8,9,10];
const TILE_POOL_MEDIUM=[2,3,4,5,6,8,9,10,12,15,16,18];
const TILE_POOL_HARD=[2,3,4,5,6,8,9,10,12,15,16,18,20,24,25,27,32];

export function generateTileValue(level,difficulty=1){
const pool=
difficulty===3
?TILE_POOL_HARD
:difficulty===2
?TILE_POOL_MEDIUM
:TILE_POOL_EASY;

const maxIdx=Math.min(3+level,pool.length-1);
return pool[Math.floor(Math.random()*(maxIdx+1))];
}

export function generateQueue(level,difficulty=1){
return[
generateTileValue(level,difficulty),
generateTileValue(level,difficulty),
generateTileValue(level,difficulty)
];
}

export function formatTime(seconds){
const m=String(Math.floor(seconds/60)).padStart(2,'0');
const s=String(seconds%60).padStart(2,'0');
return`${m}:${s}`;
}