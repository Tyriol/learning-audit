export default function validatePassword(password) {
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,32}$/;
  return passwordRegex.test(password);
}
