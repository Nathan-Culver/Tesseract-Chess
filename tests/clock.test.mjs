import test from 'node:test';import assert from 'node:assert/strict';
import {DEFAULTS} from '../engine.mjs';
import {createClocks,consumeClock,finishClock,formatClock} from '../clock.mjs';
test('fixed allowance expires exactly at zero',()=>{const c={...DEFAULTS,clock:'total'},t={main:2,period:30,left:5};assert.equal(consumeClock(t,c,1),false);assert.equal(consumeClock(t,c,1),true);assert.equal(t.main,0);});
test('increment is added once per completed turn',()=>{const c={...DEFAULTS,clock:'increment',increment:5},t={main:10,period:30,left:5};consumeClock(t,c,3);finishClock(t,c);assert.equal(t.main,12);});
test('overtime carries excess elapsed time out of main allowance',()=>{const c={...DEFAULTS,clock:'overtime'},t={main:2,period:30,left:5};assert.equal(consumeClock(t,c,5),false);assert.equal(t.main,0);assert.equal(t.period,27);});
test('overtime consumes periods and flags after the last one',()=>{const c={...DEFAULTS,clock:'overtime'},t={main:0,period:30,left:2};assert.equal(consumeClock(t,c,31),false);assert.equal(t.left,1);assert.equal(t.period,29);assert.equal(consumeClock(t,c,29),true);});
test('successful overtime turn resets remaining period time',()=>{const c={...DEFAULTS,clock:'overtime'},t={main:0,period:4,left:3};finishClock(t,c);assert.equal(t.period,30);assert.equal(t.left,3);});
test('untimed games do not consume clock state',()=>{const c={...DEFAULTS,clock:'none'},t={main:60,period:30,left:5};assert.equal(consumeClock(t,c,500),false);assert.equal(t.main,60);});
test('player clocks are independent and correctly formatted',()=>{const c={...DEFAULTS},clocks=createClocks(c,4);clocks[1].main=9;assert.equal(clocks[2].main,900);assert.equal(formatClock(clocks[1]),'0:09');});

test('delay is consumed before main time, resets on a completed move and survives partial consumption',()=>{const c={...DEFAULTS,clock:'delay',delaySeconds:5},t=createClocks(c,2)[1];consumeClock(t,c,3);assert.equal(t.main,900);assert.equal(t.delayLeft,2);consumeClock(t,c,4);assert.equal(t.main,898);assert.equal(t.delayLeft,0);finishClock(t,c);assert.equal(t.delayLeft,5);});
test('hourglass transfers only available thinking time and preserves the total',()=>{const c={...DEFAULTS,clock:'hourglass'},a={main:3},b={main:10};assert.equal(consumeClock(a,c,2,b),false);assert.equal(a.main+b.main,13);assert.equal(consumeClock(a,c,5,b),true);assert.equal(a.main,0);assert.equal(b.main,13);});
test('per-move timer resets once per completed move',()=>{const c={...DEFAULTS,clock:'permove',moveSeconds:20},t=createClocks(c,2)[1];assert.equal(t.main,20);consumeClock(t,c,7);assert.equal(t.main,13);finishClock(t,c);assert.equal(t.main,20);assert(consumeClock(t,c,20));});
test('total timers display zero on flag; overtime displays period time',()=>{assert.equal(formatClock({main:0,period:30},{clock:'total'}),'0:00');assert.equal(formatClock({main:0,period:12},{clock:'overtime'}),'0:12');});
