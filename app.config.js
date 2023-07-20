module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      apiUrl: 'https://www.api.staging.tabas.blog',
      imagesServiceUrl: 'https://www.images.staging.tabas.blog',
    },
  }
}
