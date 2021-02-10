export const environment = () => {
  const port = process.env.PORT || 3000;

  return {
    port: port,
    siteUrl: `http://localhost:${port}`,
    email: {
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
      },
    },
  };
};
