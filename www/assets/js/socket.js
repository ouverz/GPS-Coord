//var req = "GET /data/2.1/find/name?units=imperial&q=Chicago HTTP/1.1\r\n" +
  //"Host: api.localhost\r\n\r\n";


  // var serverSocket;
  // var clientSocket;
  //
  // // From https://developer.chrome.com/trunk/apps/app_hardware.html
  // var str2ab=function(str) {
  //   var buf=new ArrayBuffer(str.length);
  //   var bufView=new Uint8Array(buf);
  //   for (var i=0; i<str.length; i++) {
  //     bufView[i]=str.charCodeAt(i);
  //   }
  //   return buf;
  // }
  //
  // // From https://developer.chrome.com/trunk/apps/app_hardware.html
  // var ab2str=function(buf) {
  //   return String.fromCharCode.apply(null, new Uint8Array(buf));
  // };
  //
  // // Server
  // chrome.socket.create('udp', null, function(createInfo){
  //     serverSocket = createInfo.socketId;
  //
  //     chrome.socket.bind(serverSocket, '127.0.0.1', 1345, function(result){
  //         console.log('chrome.socket.bind: result = ' + result.toString());
  //     });
  //
  //     function read()
  //     {
  //         chrome.socket.recvFrom(serverSocket, 1024, function(recvFromInfo){
  //             console.log('Server: recvFromInfo: ', recvFromInfo, 'Message: ',
  //                 ab2str(recvFromInfo.data));
  //             if(recvFromInfo.resultCode >= 0)
  //             {
  //                 chrome.socket.sendTo(serverSocket,
  //                     str2ab('Received message from client ' + recvFromInfo.address +
  //                     ':' + recvFromInfo.port.toString() + ': ' +
  //                     ab2str(recvFromInfo.data)),
  //                     recvFromInfo.address, recvFromInfo.port, function(){});
  //                 read();
  //             }
  //             else
  //                 console.error('Server read error!');
  //         });
  //     }
  //
  //     read();
  // });
  //
  // // A client
  // chrome.socket.create('udp', null, function(createInfo){
  //     clientSocket = createInfo.socketId;
  //
  //     chrome.socket.connect(clientSocket, '127.0.0.1', 1345, function(result){
  //         console.log('chrome.socket.connect: result = ' + result.toString());
  //     });
  //
  //     chrome.socket.write(clientSocket, str2ab('Hello server!'), function(writeInfo){
  //         console.log('writeInfo: ' + writeInfo.bytesWritten +
  //             'byte(s) written.');
  //     });
  //
  //     chrome.socket.read(clientSocket, 1024, function(readInfo){
  //         console.log('Client: received response: ' + ab2str(readInfo.data), readInfo);
  //     });
  // });



  // Create the Socket
// chrome.sockets.udp.create({}, function(socketInfo) {
//   // The socket is created, now we can send some data
//   var socketId = socketInfo.socketId;
//   var person = {}
//     person.Fname = 'ofer';
//     person.Lname = 'kulka';
//     person.date = Date.now();
//
//   var arrayBuffer = person;
//
//   chrome.sockets.udp.send(socketId, arrayBuffer,
//     //'127.0.0.1', 80, function(sendInfo) {
//     '127.0.0.1', 1337, function(req) {
//       console.log("sent " + sendInfo.bytesSent);
//   });
// });







  // chrome.sockets.tcp.onReceive.addListener(
  //     function (info) {
  //        if (info.data)
  //             console.log(ab2str(info.data));
  //     }
  // );

// chrome.sockets.tcp.create({},
//     function (createInfo) {
//         console.log(createInfo.socketId);
//         chrome.sockets.tcp.connect(createInfo.socketId,
//             "api.localhost", 80,
//             function (result) {
//                 if (chrome.runtime.lastError)
//                     console.log(chrome.runtime.lastError.message);
//                 else {
//                     console.log(result);
//                     chrome.sockets.tcp.send(createInfo.socketId,
//                         str2ab(req),
//                           function (sendInfo) {
//                               console.log(sendInfo);
//                           }
//
//                     );
//                 }
//             }
//         );
//     }
// );
