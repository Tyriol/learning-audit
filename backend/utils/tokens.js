import pkg from "jsonwebtoken";
const { sign } = pkg;

export const createAccessToken = (id) => {
  return sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 15 * 60,
  });
};

export const createRefreshToken = (id) => {
  return sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "90d",
  });
};

export const createVerifyEmailToken = (id, email) => {
  return sign({ id, email }, process.env.VERIFY_EMAIL_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

export const createPasswordResetToken = ({ id, email, password }) => {
  const secret = password;
  return sign({ id, email }, secret, {
    expiresIn: 15 * 60,
  });
};

export const sendAccessToken = (_req, res, accesstoken) => {
  return {
    accesstoken,
    message: "Sign in Successful 🥳",
    type: "success",
  };
};

export const sendRefreshToken = (res, refreshtoken) => {
  res.cookie("refreshtoken", refreshtoken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
    maxAge: 90 * 24 * 60 * 60 * 1000,
  });
};
