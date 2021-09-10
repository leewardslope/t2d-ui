import React from 'react';

const ServerActivity = () => {
  const userIP = '134.209.153.62';

  var ws = new WebSocket(`ws://${userIP}:4444/'`);
  ws.onopen = function () {
    console.log('CONNECT');
  };
  ws.onclose = function () {
    console.log('DISCONNECT');
  };
  ws.onmessage = function (event) {
    console.log(event.data);
  };
  return <div>check your console log</div>;
};

export default ServerActivity;
