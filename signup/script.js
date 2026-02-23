// Client-side behavior for the signup form
document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  const firstNameInput = document.getElementById('first_name');
  const lastNameInput = document.getElementById('last_name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const togglePassword = document.getElementById('togglePassword');
  const termsCheckbox = document.getElementById('terms');

  // Helper: remove any characters that are not letters or spaces
  const stripNonLetters = (value) => value.replace(/[^a-zA-Z\s]/g, '');

  // Restrict first and last name to letters/spaces only while typing
  [firstNameInput, lastNameInput].forEach((input) => {
    if (!input) return;
    input.addEventListener('input', () => {
      const cleaned = stripNonLetters(input.value);
      if (cleaned !== input.value) {
        input.value = cleaned;
      }
    });
  });

  // Toggle password visibility
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      togglePassword.textContent = isPassword ? '🙈' : '👁';
    });
  }

  // Simple email pattern for quick validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Form submit validation
  if (signupForm) {
    signupForm.addEventListener('submit', (event) => {
      const firstName = firstNameInput.value.trim();
      const lastName = lastNameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      // Validate names (letters and spaces only)
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!firstName || !nameRegex.test(firstName)) {
        event.preventDefault();
        alert('First name can only contain letters and spaces.');
        firstNameInput.focus();
        return;
      }

      if (!lastName || !nameRegex.test(lastName)) {
        event.preventDefault();
        alert('Last name can only contain letters and spaces.');
        lastNameInput.focus();
        return;
      }

      // Validate email
      if (!emailPattern.test(email)) {
        event.preventDefault();
        alert('Please enter a valid email address.');
        emailInput.focus();
        return;
      }

      // Validate password length (contents can be letters, numbers, symbols)
      if (password.length < 6) {
        event.preventDefault();
        alert('Password should be at least 6 characters.');
        passwordInput.focus();
        return;
      }

      // Require terms checkbox
      if (!termsCheckbox.checked) {
        event.preventDefault();
        alert('You must agree to the Terms and Conditions.');
        termsCheckbox.focus();
      }
    });
  }
});

