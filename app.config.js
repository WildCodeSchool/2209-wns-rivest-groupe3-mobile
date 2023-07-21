module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      apiUrl: 'https://api.staging.tabas.blog',
      imagesServiceUrl: 'https://images.staging.tabas.blog',
      cloudinaryServiceUrl: 'https://res.cloudinary.com/du5fcvup4/',
    },
  }
}
