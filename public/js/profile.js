const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#project-name').value.trim();
    const posted_by = document.querySelector('#posted-by').value.trim();
    const content = document.querySelector('#project-content').value.trim();

    if (title && posted_by && content) {
      const response = await fetch(`/api/projects`, {
        method: 'POST',
        body: JSON.stringify({ title, posted_by, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create project');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);
  