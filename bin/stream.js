const child_process = require('child_process');
const WebSocket = require('ws');

const wss = new WebSocket.Server({port: process.env.STREAM_WEBSOCKET_PORT});

wss.on('connection', (ws) => {
  const rtmpUrl = decodeURIComponent('rtmp://a.rtmp.youtube.com/live2/--');
  console.log('Target RTMP URL:', rtmpUrl);
  
  const ffmpeg = child_process.spawn(process.env.FFMPEG_PATH, [
    '-f', 'lavfi', '-i', 'anullsrc',
    '-i', '-',
    '-shortest',
    '-vcodec', 'copy',
    '-acodec', 'aac',
    '-f', 'flv',

    rtmpUrl 
  ]);
  
  // If FFmpeg stops for any reason, close the WebSocket connection.
  ffmpeg.on('close', (code, signal) => {
    console.log('FFmpeg child process closed, code ' + code + ', signal ' + signal);
    ws.terminate();
  });

  // write incoming date to ffmpeg standart input
  ws.on('message', (msg) => {
    console.log('INCOMING DATA LENGTH: ', msg.length);
    ffmpeg.stdin.write(msg);
  });
  
  // If the client disconnects, stop FFmpeg.
  ws.on('close', (e) => {
    ffmpeg.kill('SIGINT');
  });


  // stdin error to console
  ffmpeg.stdin.on('error', (e) => {
    console.log('FFmpeg STDIN Error', e);
  });

  // ffmpeg debug
  ffmpeg.stderr.on('data', (data) => {
    //console.log('FFmpeg STDERR:', data.toString());
  });

});
