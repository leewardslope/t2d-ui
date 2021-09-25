import { Box } from '@chakra-ui/layout';
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
      setLog((log) => log + '<br>' + event.data)
      console.log(event.data)
    };
    return () => {
      ws.onclose = function () {
        console.log('DISCONNECT');
      };
    }
  }, []);



  return <Box backgroundColor="black" color="white" borderRadius="lg" paddingX="6" paddingBottom="6"  dangerouslySetInnerHTML={{ __html: log }}></Box>;
};

export default ServerActivity;
