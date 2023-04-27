module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      apiUrl: 'http://192.168.1.22:5000/',
      imagesServiceUrl: 'http://192.168.1.22:8000',
    },
  }
}
