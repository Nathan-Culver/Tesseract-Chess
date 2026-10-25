import {validateSave} from './engine.mjs';
const testing=typeof location!=='undefined'&&new URLSearchParams(location.search).get('test')==='1';
const DB='tesseract-chess-v1'+(testing?'-test':'');const MANUAL='tesseract-chess-manual'+(testing?'-test':'');let pending;
function db(){return pending??=new Promise((resolve,reject)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>r.result.createObjectStore('saves');r.onsuccess=()=>resolve(r.result);r.onerror=()=>{pending=null;reject(r.error);};});}
export async function put(key,value){const d=await db();return new Promise((resolve,reject)=>{const t=d.transaction('saves','readwrite');t.objectStore('saves').put(value,key);t.oncomplete=()=>resolve();t.onerror=()=>reject(t.error);t.onabort=()=>reject(t.error);});}
export async function get(key){const d=await db();return new Promise((resolve,reject)=>{const r=d.transaction('saves').objectStore('saves').get(key);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
export function envelope(state,clocks){return {format:'Tesseract-Chess',version:1,savedAt:new Date().toISOString(),state,clocks};}
export function read(data){const s=validateSave(data);if(data.clocks&&(!Array.isArray(data.clocks)||data.clocks.length!==3||data.clocks.some(t=>!t||!Number.isFinite(t.main)||!Number.isFinite(t.period)||!Number.isInteger(t.left)||t.main<0||t.period<0||t.left<0||(t.delayLeft!==undefined&&(!Number.isFinite(t.delayLeft)||t.delayLeft<0)))))throw Error('Invalid saved clock data.');return {state:s,clocks:data.clocks};}
export function manualSave(value){localStorage.setItem(MANUAL,JSON.stringify(value));}
export function manualLoad(){const value=localStorage.getItem(MANUAL);if(!value)throw Error('The browser slot is empty.');return JSON.parse(value);}
export function download(value,name){const blob=new Blob([JSON.stringify(value)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),3000);}

