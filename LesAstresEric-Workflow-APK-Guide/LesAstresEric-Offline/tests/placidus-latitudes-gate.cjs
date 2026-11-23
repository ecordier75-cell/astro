const fs=require('node:fs');const assert=require('node:assert/strict');
const report=JSON.parse(fs.readFileSync('docs/AUDIT-PLACIDUS-LATITUDES.json','utf8'));
assert.equal(report.cases,560);assert.equal(report.computed,480);assert.equal(report.rejected,80);assert.equal(report.compared_cusps,5760);
assert.ok(report.max_error_degrees<0.1,'Écart maximal Placidus supérieur à 0,1°');
console.log('Audit Placidus : 480 thèmes calculés, 5760 cuspides, écart maximal '+report.max_error_degrees+'°; 80 cas polaires refusés.');
