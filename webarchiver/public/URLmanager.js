const path = require('path');

let URLManager = (function(){
    
    let getResourceExtension_ = function(uri){
        let uriObject = new URL(uri)
        return path.extname(uriObject.pathname).length  < 1 ? '.html' : path.extname(uriObject.pathname)  
    }

    let getDownloadableURL_ = function(urlParent, href){
        return new URL(href, urlParent)
    }


    return {
        getResourceExtension: getResourceExtension_,
        getDownloadableURL: getDownloadableURL_,
    }
})()

module.exports = { URLManager };

/*
URL {
  href: 'http://www.google.es/',
  origin: 'http://www.google.es',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'www.google.es',
  hostname: 'www.google.es',
  port: '',
  pathname: '/',
  search: '',
  searchParams: URLSearchParams {},
  hash: '' }

/nodeJS/webArchiver/test.html
/
/test/foo
/
/a.pdf
/a*/