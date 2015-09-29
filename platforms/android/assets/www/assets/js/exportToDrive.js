// var file;

// chrome.syncFileSystem.requestFileSystem(function(fs){

//     fs.root.getFile('data.txt', {create: true}, function(fileEntry){

//       file = fileEntry;

//     })

// //document.querySelector("#write").addEventListener("click", writeData);

// //document.querySelector("#read").addEventListener("click", readData);

// document.getElementById('write').addEventListener('click', writeData);
// document.getElementById('read').addEventListener('click', readData);

// function writeData(){

// 	var data = document.querySelector("#data").value;

// 	file.createWriter(function(writer){

// 		writer.onwriteend = function(e){

// 			console.log("write completed");
// 		}

// 		writer.onerror = function(e){

// 			console.log("write error");
// 		}

// 		var blob = new Blob([data]);

// 		writer.write(blob);
// 	})


// } 

// function readData(){

// 	file.file(function(fileObject){

// 		var reader = new FileReader();

// 		reader.onloadend = function(e){

// 			document.querySelector("#data").value = this.result;
// 		}

// 		reader.readAsTest(fileObject);

// 	})


// }


// // end chrome.syncFileSystem
// })
