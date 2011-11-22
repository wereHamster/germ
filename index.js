
function deployCommand(sha) {
  return [
    'git fetch -q origin', 'git reset -q --hard $1', 'npm install', 'node compile.js'
  ].join(' && ').replace('$1', sha);
};

var spawn = require('child_process').spawn;
module.exports = function(msg) {
  if (msg.cmd === 'zion:bootstrap') {
    process.send({ cmd: 'zion:fork' }); process.exit(0);
  } else if (msg.cmd === 'zion:fork') {
    if (msg.deploy) {
      spawn('sh', [ '-c', deployCommand(msg.deploy) ]).on('exit', function(code) {
        if (code === 0) {
          process.send({ cmd: 'zion:restart' });
        } process.exit(0);
      });
    } else {
      require('./app');
    }
  }
};
