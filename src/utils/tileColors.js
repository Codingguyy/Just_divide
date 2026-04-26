import tileOrange from '../assets/tile_orange.png';
import tileRed from '../assets/tile_red.png';
import tileBlue from '../assets/tile_blue.png';
import tilePink from '../assets/tile_pink.png';
import tilePurple from '../assets/tile_purple.png';
export const TILE_COLORS = [
  {key:'orange',img:tileOrange,textColor:'#7a3000',bg:null},
  {key:'yellow',img:null,textColor:'#5a3e00',bg:'#f7cc35'},
  {key:'red',img:tileRed,textColor:'#6b0000',bg:null},
  {key:'blue',img:tileBlue,textColor:'#001850',bg:null},
  {key:'pink',img:tilePink,textColor:'#5c0025',bg:null},
  {key:'purple',img:tilePurple,textColor:'#2b0050',bg:null},
];

export function getTileColor(value){
  const hash= (value * 2654435761)>>>0;
  return TILE_COLORS[hash % TILE_COLORS.length];
}
