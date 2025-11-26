function validateName(name) {
  const nameRegex = /^[A-Za-z ]{3,30}$/;
  return nameRegex.test(name);
}

function validateEmail(email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passRegex.test(password);
}

module.exports = { validateName, validateEmail, validatePassword };