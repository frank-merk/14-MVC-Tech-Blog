const editFunction = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('id')) {
      const id = event.target.getAttribute('id');

      const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();
  
    if (title && description) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: id,
          title,
          description
        }),
        headers: {
            'Content-Type': 'application/json'
          }
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to edit project');
      }
    }
    }
  };

  document.querySelector('.edit').addEventListener('submit', editFunction);