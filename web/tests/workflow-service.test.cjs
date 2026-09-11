const test = require('node:test');
const assert = require('node:assert/strict');
const core = require('../public/workflow-sample/workflow.js');

test('rejects unusable limits and path-like output names', () => {
  for (const cap of [0, 19, 5001, 20.5, NaN]) assert.throws(() => core.settings(cap,1600,'catalog'));
  for (const side of [0,127,4097,2.5]) assert.throws(() => core.settings(500,side,'catalog'));
  for (const prefix of ['../secret','a/b','a\\b','','=SUM(A1)','x'.repeat(33)]) assert.throws(() => core.settings(500,1600,prefix));
  assert.equal(core.settings(500,1600,'catalog').maxBytes,512000);
});
test('accepts only decodable positive-size JPEG results inside both limits', () => {
  const config = core.settings(500,1600,'catalog');
  const result = {type:'image/jpeg',bytes:512000,width:1600,height:1000};
  assert.equal(core.fits(result,config),true);
  for (const patch of [{bytes:512001},{width:1601},{height:1601},{bytes:0},{width:0},{type:'image/png'}]) assert.equal(core.fits({...result,...patch},config),false);
});
test('neutralizes spreadsheet formulas and quotes hostile filenames', () => {
  for (const value of ['=1+1','+cmd','-10+20','@SUM(A1)','  =1','\tvalue']) assert.ok(core.csvCell(value).startsWith('"\''));
  assert.equal(core.csvCell('a"b.jpg'),'"a""b.jpg"');
  const csv = core.csv([{source:'a,b.jpg',status:'failed',reason:'bad\nimage'}]);
  assert.ok(csv.includes('"a,b.jpg"')); assert.ok(csv.includes('"bad\nimage"'));
});
test('numbered names cannot collide and oversized batches fail before processing', () => {
  assert.equal(new Set(Array.from({length:25},(_,i)=>core.outputName('catalog',i))).size,25);
  assert.equal(core.outputName('catalog',0),'catalog-0001.jpg');
  assert.ok(core.batchError([])); assert.ok(core.batchError(Array(26).fill({size:1})));
  assert.ok(core.batchError([{size:100*1024*1024+1}])); assert.equal(core.batchError([{size:100}]),'');
});
