document.addEventListener('DOMContentLoaded', () => {
    const createAnotherButton = document.querySelector('#create-another');
  
    if (createAnotherButton) {
      createAnotherButton.addEventListener('click', () => {
        window.location.href = '/profile'; // Adjust the URL if needed
      });
    }
  });
  