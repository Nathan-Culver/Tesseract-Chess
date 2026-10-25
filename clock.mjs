export function createClocks(config,count){return Array.from({length:count+1},()=>({main:config.clock==='permove'?config.moveSeconds:config.minutes*60,period:config.periodSeconds,left:config.periods,delayLeft:config.delaySeconds||0}));}
export function consumeClock(clock,config,seconds,opponent=null){
 if(config.clock==='none'||seconds<=0)return false;
 if(config.clock==='delay'){const grace=Math.min(clock.delayLeft??config.delaySeconds,seconds);clock.delayLeft=Math.max(0,(clock.delayLeft??config.delaySeconds)-grace);seconds-=grace;}
 if(config.clock!=='overtime'){const spent=Math.min(clock.main,seconds);clock.main=Math.max(0,clock.main-seconds);if(config.clock==='hourglass'&&opponent)opponent.main+=spent;return clock.main===0;}
 let remaining=seconds;if(clock.main>0){const spent=Math.min(clock.main,remaining);clock.main-=spent;remaining-=spent;}
 if(remaining>0){clock.period-=remaining;while(clock.period<=0&&clock.left>0){clock.left--;clock.period+=config.periodSeconds;}if(clock.left<=0)clock.period=0;}
 return clock.left<=0;
}
export function finishClock(clock,config){if(config.clock==='increment')clock.main+=config.increment;if(config.clock==='overtime'&&clock.main<=0)clock.period=config.periodSeconds;if(config.clock==='delay')clock.delayLeft=config.delaySeconds;if(config.clock==='permove')clock.main=config.moveSeconds;}
export function formatClock(clock,config={}){const seconds=Math.max(0,Math.ceil(config.clock==='overtime'&&clock.main<=0?clock.period:clock.main));return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;}
export function clockDetail(clock,config){if(config.clock==='delay')return `${Math.ceil(clock.delayLeft??config.delaySeconds)}s delay remaining`;if(config.clock==='overtime')return `${clock.left} overtime periods · ${config.periodSeconds}s each`;if(config.clock==='increment')return `+${config.increment}s per move`;if(config.clock==='permove')return `${config.moveSeconds}s per move`;if(config.clock==='hourglass')return 'Time used transfers to opponent';return config.clock==='none'?'Untimed':'Total allowance';}
