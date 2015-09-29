function errorHandler(e) {
var msg = '';
switch (e.code) {
case FileError.QUOTA_EXCEEDED_ERR:
msg = 'QUOTA_EXCEEDED_ERR';
break;
case FileError.NOT_FOUND_ERR:
msg = 'NOT_FOUND_ERR';
break;
case FileError.SECURITY_ERR:
msg = 'SECURITY_ERR';
break;
case FileError.INVALID_MODIFICATION_ERR:
msg = 'INVALID_MODIFICATION_ERR';
break;
case FileError.INVALID_STATE_ERR:
msg = 'INVALID_STATE_ERR';
break;
default:
msg = 'Unknown Error';
break;
};
console.log('Error: ' + msg);
}

function onInitFs(fs) {
fs.root.getFile('log.txt', {create: true, exclusive:
true}, function(fileEntry) {
// fileEntry.isFile === true
// fileEntry.name == 'log.txt'
// fileEntry.fullPath == '/log.txt'
}, errorHandler);
}
window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs,
errorHandler);