const os = require('os')
const path = require('path')

module.exports.serverConfig = {
  defaultPort: 4041,
  defaultHost: 'http://localhost'
}

// module.exports.localFolderPath = path.join(os.homedir(), 'Downloads');

module.exports.localFolderPath = path.join('D:', 'media-manager', 'root');