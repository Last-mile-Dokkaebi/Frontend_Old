module.exports = {
  async rewirtes() {
    if (process.env.NODE_ENV != 'production') {
      return [
        {
          source: '/api/:path*',
          destination: process.env.BACKEND_DEVELOP + '/:path*',
        }
      ]
    }
    else {
      return [
        {
          source: '/:path*',
          destination: process.env.BACKEND_DEVELOP + '/:path*',
        }
      ]
    }
  }
}