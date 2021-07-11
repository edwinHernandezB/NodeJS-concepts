const fetch = require('node-fetch');
const archiver = require('archiver');
const {getTransformStream} = require('./getTransformStream.js')
const {ReplaceManager} = require('./ReplaceManager.js')

function startCrawling(req, res){ 
    
    let replaceMg = new ReplaceManager(req.query.maxFiles);
    let downloadedFiles = [];
    let counter = 0;
    let archive = archiver('zip')
    res.writeHead(200, {'Content-Type': 'application/zip',
    'Content-Disposition' : 'attachment; filename=files.zip' });
    archive.pipe(res)

    function doCrawlAndDownloadResource(downloadableURL, recLevel, entryName){
        if (recLevel > 0 && !downloadedFiles.includes(entryName) && entryName != '404.html') {
            
            downloadedFiles.push(entryName)

            fetch(downloadableURL)
            .then(response => {
                
                let transformStream = getTransformStream(downloadableURL, recLevel, replaceMg, doCrawlAndDownloadResource)
                archive.append(response.body.pipe(transformStream), { name: entryName})

                transformStream.on('finish', () =>{
                    counter++
                    if (counter == downloadedFiles.length) {
                        archive.finalize()          
                    }
                })
            })
        }
    }
    doCrawlAndDownloadResource(req.query.uri, req.query.recLevel, replaceMg.lookupName(new URL(req.query.uri)))

}
module.exports = { startCrawling };