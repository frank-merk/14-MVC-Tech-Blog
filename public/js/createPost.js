const newPost = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();
  
    if (title && description) {
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.append('post');
      } else {
        alert('Failed to create new post');
      }
    }
  };

  const deleteFunction = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/blog');
      } else {
        alert('Failed to delete project');
      }
    }
  };

  
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newPost);
  
  document
    .querySelector('.post-list')
    .addEventListener('click', deleteFunction);
  