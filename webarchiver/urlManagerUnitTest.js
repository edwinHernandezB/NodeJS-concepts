const {URLManager}  = require('./public/URLmanager.js');

let list = [
    'http://stw.deic-docencia.uab.cat/nodeJS/webArchiver/test.html',
    'http://www.google.es',
    'http://deic-docencia.uab.cat/test/foo?a=1&b=2',
    'http://donotexist',
    'http://foo.com/a.pdf',
    'http://foo.com/a',
]

let urlAbsoluta = [
    {urlParent: 'http://stw.deic-docencia.uab.cat/nodeJS/webArchiver/test.html', href: 'test_1_1.html'},
    {urlParent: 'http://stw.deic-docencia.uab.cat/nodeJS/webArchiver/test.html', href: 'http://www.google.es'},
    {urlParent: 'http://stw.deic-docencia.uab.cat/nodeJS/webArchiver/test.html', href: ''}
    
]
console.log('############ TEST getResourceExtension ################ \n');
let result = []

for (let index = 0; index < list.length; index++) {
    result.push(URLManager.getResourceExtension(list[index]));
   
}
console.log(result + '\n');


console.log('############ TEST getDownloadableURL ################');
result = []

for (let index = 0; index < urlAbsoluta.length; index++) {
    result.push(URLManager.getDownloadableURL(urlAbsoluta[index].urlParent,urlAbsoluta[index].href));
}
for (let index = 0; index < urlAbsoluta.length; index++) {
    console.log(result[index].href)
}
