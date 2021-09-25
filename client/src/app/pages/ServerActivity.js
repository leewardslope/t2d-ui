import { Box } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';

const ServerActivity = () => {
  const userWebsocketdURL = 't2d.leewardslope.com';
  const [log, setLog] = useState('');

  useEffect(() => {
    var ws = new WebSocket(`wss://${userWebsocketdURL}`);

    ws.onopen = function () {
    };

    ws.onmessage = function (event) {
      setLog((log) => log + '<br>' + event.data)
    };
    return () => {
      ws.onclose = function () {
      };
    }
  }, []);



  return <Box backgroundColor="black" color="white" borderRadius="lg" paddingX="6" paddingBottom="6"  dangerouslySetInnerHTML={{ __html: log }}></Box>;
};

export default ServerActivity;
