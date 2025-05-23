import { createTransport } from "nodemailer";

export const createEmailVerificationUrl = (id, token) =>
  `${process.env.CLIENT_URL}/routes/auth/confirm-email/${id}/${token}`;

export const createPasswordResetUrl = (id, token) =>
  `${process.env.CLIENT_URL}/routes/auth/reset-password/${id}/${token}`;

export const transporter = createTransport({
  service: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const confirmEmailTemplate = (user, url) => {
  const { user_name, email } = user;
  return {
    from: `The Learning Audit <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Confirm Your Email Address",
    html: `
          <h2>Welcome to The Learning Audit ${user_name}!</h2>
          <p>Please confirm your email address by clicking the link below:</p>
          <a href="${url}">Confirm Email</a>
          <p>This link will expire in 24 hours.</p>
        `,
  };
};

export const passwordResetTemplate = (user, url) => {
  const { user_name, email } = user;
  return {
    from: `The Learning Audit <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Reset Password`,
    html: `
        <h2>Password Reset Link</h2>
        <p>Hi ${user_name} we've received a request to reset your password</p>
        <p>You can do that by clicking on the link below:</p>
        <a href=${url}><button>Reset Password</button></a>
        <p>If this wasn't you, please ignore!</p>
        <br />
        <br />
        <small><a style="color: #38A169" href=${url}>${url}</a></small>
        <br />
        <small>The link will expire in 15 mins!</small>
        <br /><br />
        <p>Thanks,</p>
        <p>The Learning Audit Team</p>`,
  };
};

export const passwordResetConfirmationTemplate = (user) => {
  const { email } = user;
  return {
    from: `The Learning Audit <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Password Reset Successful`,
    html: `
        <h2>Password Reset Successful</h2>
        <p>You've successfully updated your password for your account <${email}>. </p>
        <small>If you did not change your password, reset it from your account.</small>
        <br /><br />
        <p>Thanks,</p>
        <p>The Learning Audit Team</p>`,
  };
};
