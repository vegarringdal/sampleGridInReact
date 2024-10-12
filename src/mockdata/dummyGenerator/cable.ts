// just trying out what we can do
// maybe make a wrapper class later, so its ewasuer to create many

import { CableEntity } from "../../data/cable/cableEntity";

const cableCache = new Map<number, CableEntity>();
let isInit = false;
let counter = 0;


function numbPad(num, pad){
    return 
}

export function getCables() {
  if (!isInit) {
    isInit = true;
    for (let i = 0; i < 150; i++) {
      counter = i;
      cableCache.set(counter, {
        id: counter,
        tag: "cable - " + counter,
        fromTag: "fromTag - " + counter,
        areaFrom: "areaFrom - " + counter,
        toTag: "toTag - " + counter,
        areaTo: "areaTo - " + counter,
        const: "contr - " + counter,
        design: "disg - " + counter,
        cableTypeId: "cid - " + counter,
        cableType: "BFOU(c)",
        cableTypeDim: "1x2x0.75mm2",
        mc: "M01E" + String(counter).padStart(4, '0'),
        com: "C02E" + String(counter).padStart(4, '0'),
        op01: "PU:0",
        op02: "TF:0",
        op03: "TT:0",
        op04: "TC:0",
        op05: null,
        op06: null,
        op07: null,
        op08: null,
        op09: null,
        op10: null,
        op11: null,
        op12: null,
        op13: null,
        op14: null,
      });
    }
  }

  return Array.from(cableCache).map((v) => v[1]);
}


export function newCable(newData: CableEntity) {
  counter += 1;
  cableCache.set(counter, newData);

  return cableCache.get(counter);
}

export function updateCable(id: number, newData: CableEntity) {
  const oldData = cableCache.get(id) as CableEntity;
  cableCache.set(id, Object.assign(oldData, newData));

  return cableCache.get(id);
}

export function deleteCable(id: number) {
 
    cableCache.delete(id)
  
    return cableCache.get(id);
  }
  

