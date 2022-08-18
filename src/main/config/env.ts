export default {
  port: process.env.PORT || 3035,
  mongoUrl: process.env.MONGO_URL,
  baseUrl: process.env.BASE_URL_API,
  jwtSecret: process.env.JWT_SECRET
}
