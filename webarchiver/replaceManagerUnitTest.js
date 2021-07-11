const {ReplaceManager}  = require('./public/ReplaceManager.js');


var r = new ReplaceManager(4);
console.log(r.lookupName('http://stw.deic-docencia.uab.cat/nodeJS/webArchiver/test.html'));
console.log(r.lookupName('http://stw.deic-docencia.uab.cat/nodeJS/webArchiver/test_1_1.html'));
console.log(r.lookupName('http://stw.deic-docencia.uab.cat/nodeJS/webArchiver/test_1_2.html'));
console.log(r.lookupName('http://stw.deic-docencia.uab.cat/nodeJS/webArchiver/test_2_2.html'));

