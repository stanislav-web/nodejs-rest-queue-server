window.onload = function () {
  'use strict';

  //noinspection NodeModulesDependencies
  var socket = io.connect('ws://localhost:8081', {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 99999
  });

  socket.on('connect', function () {
    socket.on('updateJobStatus', function (data) {
      var block = document.getElementsByClassName('alert')[0];
        block.innerHTML = 'Connected...' +
        '\nand waiting for updates';
        block.innerHTML = 'Job #' + data.jobId + ' has been updated to ' + data.jobStatus;
    });
  });
};