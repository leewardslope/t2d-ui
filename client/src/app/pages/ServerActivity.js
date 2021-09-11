import React from 'react';

const ServerActivity = () => {
  const userWebsocketdURL = 't2d.leewardslope.com'; //Just a placeholder, later it will be unique for each user and with their URL.

  var ws = new WebSocket(`wss://${userWebsocketdURL}`);
  // const [log, setLog] = useState('loading ...');

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
