export default {
  port: process.env.PORT || 3035,
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/coleta-seletiva',
  baseUrl: process.env.BASE_URL_API
}
