// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Get references to password input and toggle icon
  const passwordInput = document.getElementById('password');
  const togglePassword = document.getElementById('togglePassword');
  const loginForm = document.getElementById('loginForm');
  const forgotLink = document.querySelector('.forgot-link');
  const emailInput = document.getElementById('email');
  
  // Toggle password visibility when eye icon is clicked
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function() {
      // Check current input type
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      
      // Toggle input type between password and text
      passwordInput.setAttribute('type', type);
      
      // Change eye icon emoji based on visibility
      if (type === 'password') {
        togglePassword.textContent = '👁';
      } else {
        togglePassword.textContent = '🙈';
      }
    });
  }
  
  // Form validation before submission
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      // Basic email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      // Check if email is valid
      if (!emailPattern.test(email)) {
        e.preventDefault();
        alert('Please enter a valid email address');
        return false;
      }
      
      // Check if password is not empty
      if (password.length < 1) {
        e.preventDefault();
        alert('Please enter your password');
        return false;
      }
      
      // If validation passes, form will submit normally
      return true;
    });
  }
  
  // Open reset password page when clicking "Forgot password?"
  if (forgotLink) {
    forgotLink.addEventListener('click', function(e) {
      e.preventDefault();
      
      const email = emailInput ? emailInput.value.trim() : '';
      
      if (!email) {
        alert('Please enter your email first so we can reset your password.');
        if (emailInput) {
          emailInput.focus();
        }
        return;
      }
      
      // Basic email pattern check before redirecting
      const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        if (emailInput) {
          emailInput.focus();
        }
        return;
      }
      
      // Redirect to reset password page, passing email in the URL
      window.location.href = '../reset/index.php?email=' + encodeURIComponent(email);
    });
  }
  
  // Optional: Add input field focus effects
  const inputs = document.querySelectorAll('.input-group input');
  inputs.forEach(input => {
    // Add focus class to parent when input is focused
    input.addEventListener('focus', function() {
      this.parentElement.style.transform = 'scale(1.01)';
      this.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    // Remove focus class when input loses focus
    input.addEventListener('blur', function() {
      this.parentElement.style.transform = 'scale(1)';
    });
  });
  
});

