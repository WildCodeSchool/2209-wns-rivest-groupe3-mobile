module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      apiUrl: 'https://api.tabas.blog',
      imagesServiceUrl: 'https://images.tabas.blog',
      cloudinaryServiceUrl: 'https://res.cloudinary.com/du5fcvup4/',
    },
  }
}
