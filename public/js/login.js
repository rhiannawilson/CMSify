const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Check if the password has at least 8 characters
  if (password.length < 8) {
      alert('Please enter a password with at least 8 characters.');
      return; // Stop execution if the password is not valid
  }

  if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          // If successful, redirect the browser to the profile page
          document.location.replace('/profile');
      } else {
          alert(response.statusText);
      }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // Check if the password has at least 8 characters
  if (password.length < 8) {
      alert('Please enter a password with at least 8 characters.');
      return; // Stop execution if the password is not valid
  }

  if (name && email && password) {
      const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          document.location.replace('/profile');
      } else {
          alert(response.statusText);
      }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
