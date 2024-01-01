module.exports.serverConfig = {
  defaultPort: 4041,
  defaultHost: 'http://localhost'
}

// Not needed here
module.exports.cockroachCloudCluster = {
  connectionString: 'postgresql://lsm-admin:Atyw-4zvtwbQB7gl4rfKSg@lms-project-2473.7s5.cockroachlabs.cloud:26257/playlistconverter_db?sslmode=verify-full',
  dbName: 'playlistconverter_db'
}

module.exports.localFolderPath = '/home/ad.rapidops.com/saumya.dixit/Server Storage'; // Need to validatie that this file name cannot be renamed