'use strict';

const fs = require('fs');
const readline = require('readline');

const rs = fs.createReadStream('./popu-pref.csv');
const rl = readline.createInterface({ 'input': rs, 'output': {} });

const obj2010 = {};
const obj2015 = {};
const arr = [];

function comp(a, b){
  return b.rate - a.rate;
}

rl.on('line', (lineString) => {
  const columns = lineString.split(',');
  const year = parseInt(columns[0]);
  const pref = columns[1];
  const population = parseInt(columns[3]);

  if(year === 2010) {
    obj2010[pref] = population;
  } else if(year === 2015) {
    obj2015[pref] = population;
  }
});

rl.on('close', () => {
  Object.keys(obj2010).forEach(function (key) {
    arr.push({
      pref: key,
      rate: obj2015[key] / obj2010[key]
    });
  });
  console.log(arr.sort(comp));
});
