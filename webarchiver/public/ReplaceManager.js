const {URLManager} = require('./URLmanager.js')
let ReplaceManager = function(maxFiles){
    
    let _fileCounter = 0;
    let _replaceMap = [];
    
    let _lookupName = function(_url){
        if (_fileCounter == 0) {
            _replaceMap[_url] = 'index' + URLManager.getResourceExtension(_url)
            _fileCounter++
        } else if(_replaceMap[_url]) {
            return _replaceMap[_url]
        }else{
            if (_fileCounter < maxFiles) {
                _replaceMap[_url] = _fileCounter + URLManager.getResourceExtension(_url)
            } else {
                _replaceMap[_url] = ReplaceManager._NOT_FOUND_FILE;
            }
            _fileCounter++            
        }

        return _replaceMap[_url]
    }

    let _getFileCounter = function(){ return _fileCounter}
    return {
        lookupName: _lookupName,
        getFileCounter: _getFileCounter
    }
    
}

ReplaceManager._NOT_FOUND_FILE = '404.html'


module.exports = { ReplaceManager };
/*let ReplaceManager = function(maxFiles){
    
    let _fileCounter = 0;
    let _replaceMap = [];
    
    let _lookupName = function(_url){
        if (_fileCounter == 0) {
            _replaceMap[_url] = 'index' + URLmanager.getResourceExtension(_url)
            _fileCounter++
        } else if(_replaceMap[_url]) {
            return _replaceMap[_url]
        }else{
            if (_fileCounter < maxFiles) {
                _replaceMap[_url] = _fileCounter + URLmanager.getResourceExtension(_url)
            } else {
                _replaceMap[_url] = ReplaceManager._NOT_FOUND_FILE;
            }
            _fileCounter++            
        }

        return _replaceMap[_url]
    }
    return {
        lookupName: _lookupName
    }
    
}

ReplaceManager._NOT_FOUND_FILE = '404.html'

*/