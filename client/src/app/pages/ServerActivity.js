import React, { useEffect, useState } from 'react';

const ServerActivity = () => {
  const userWebsocketdURL = 't2d.leewardslope.com';
  const [log, setLog] = useState('');

  useEffect(() => {
    var ws = new WebSocket(`wss://${userWebsocketdURL}`);

    ws.onopen = function () {
      console.log('CONNECT');
    };

    ws.onmessage = function (event) {
      setLog((log) => event.data + '<br>' + log)
      console.log(event.data)
    };
    return () => {
      ws.onclose = function () {
        console.log('DISCONNECT');
      };
    }
  }, []);



  return <div dangerouslySetInnerHTML={{ __html: log }}></div>;
};

export default ServerActivity;
