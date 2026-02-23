// Behavior for reset password page
document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('email');
  const newPasswordInput = document.getElementById('new_password');
  const confirmPasswordInput = document.getElementById('confirm_password');
  const toggleNewPassword = document.getElementById('toggleNewPassword');
  const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
  const resetForm = document.getElementById('resetForm');

  // Toggle visibility for new password
  if (toggleNewPassword && newPasswordInput) {
    toggleNewPassword.addEventListener('click', () => {
      const isPassword = newPasswordInput.type === 'password';
      newPasswordInput.type = isPassword ? 'text' : 'password';
      toggleNewPassword.textContent = isPassword ? '🙈' : '👁';
    });
  }

  // Toggle visibility for confirm password
  if (toggleConfirmPassword && confirmPasswordInput) {
    toggleConfirmPassword.addEventListener('click', () => {
      const isPassword = confirmPasswordInput.type === 'password';
      confirmPasswordInput.type = isPassword ? 'text' : 'password';
      toggleConfirmPassword.textContent = isPassword ? '🙈' : '👁';
    });
  }

  // Client-side validation
  if (resetForm) {
    resetForm.addEventListener('submit', (event) => {
      const email = emailInput ? emailInput.value.trim() : '';
      const newPass = newPasswordInput.value;
      const confirmPass = confirmPasswordInput.value;

      // Basic email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        event.preventDefault();
        alert('Please enter your email.');
        if (emailInput) emailInput.focus();
        return;
      }

      if (!emailPattern.test(email)) {
        event.preventDefault();
        alert('Please enter a valid email address.');
        if (emailInput) emailInput.focus();
        return;
      }

      if (!newPass || !confirmPass) {
        event.preventDefault();
        alert('Please fill in both password fields.');
        return;
      }

      if (newPass.length < 6) {
        event.preventDefault();
        alert('Password should be at least 6 characters.');
        return;
      }

      if (newPass !== confirmPass) {
        event.preventDefault();
        alert('New password and confirm password do not match.');
        return;
      }
    });
  }
});

