export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  auth: {
    secret: process.env.AUTH_SECRET,
    expiresIn: process.env.AUTH_JWT_EXPIRES_IN,
  },
});
