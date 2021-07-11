const stream = require('stream');
const cheerio = require ('cheerio');
const URLManager = require('./URLmanager.js').URLManager

let getTransformStream = function(url, recLevel, replaceManager, doCrawlAndDownloadResource) {
    let transformStream = new stream.Transform();
    let buffer='';
    
    transformStream._transform = function(chunk, encoding, callback) {
      buffer += chunk.toString();
      callback();
    };
  
    transformStream._flush = function(callback){
      this.push(transformStream._replace(buffer));
      callback();
    }
  
    transformStream._replace = function(chunk){
        $ = cheerio.load(chunk);
        $('a').each(function (i, link){
          let href = $(this).attr('href');
          let downloadableURL = URLManager.getDownloadableURL(url,href);
          let newhref = replaceManager.lookupName(downloadableURL);
          $(this).attr('href', newhref);
  
          doCrawlAndDownloadResource(downloadableURL, recLevel - 1, newhref);
  
        }); //end $a.each
        return $.html();
    };
  
    return transformStream;
  }//end getTransformStream

  module.exports = { getTransformStream }