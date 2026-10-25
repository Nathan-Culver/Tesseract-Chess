import {chooseMove} from './ai.mjs';
self.onmessage=({data})=>{try{const result=chooseMove(data.state,{difficulty:data.difficulty,timeMs:data.timeMs,onProgress:progress=>self.postMessage({progress,id:data.id})});self.postMessage({result,id:data.id});}catch(e){self.postMessage({error:e.message,id:data.id});}};
