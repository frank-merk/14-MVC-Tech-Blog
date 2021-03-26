const newPost = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#new-title').value.trim();
    const description = document.querySelector('#description').value.trim();
  
    if (title && description) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ 
          title, 
          description }),
        headers: { 
          'Content-Type': 'application/json' 
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create new post');
      }
    }
  };

  // const deleteFunction = async (event) => {
  //   if (event.target.hasAttribute('id')) {
  //     const id = event.target.getAttribute('id');
  
  //     const response = await fetch(`/api/posts/${id}`, {
  //       method: 'DELETE',
  //       body: JSON.stringify({
  //         id: id
  //       })
  //     });

  //     if (response.ok) {
  //       document.location.replace('/dashboard');
  //     } else {
  //       alert('Failed to delete project');
  //     }
  //   }
  // };

  
  
  document.querySelector('#new-post-form').addEventListener('submit', newPost);
  
  // document
  //   .querySelector('.delete-btn')
  //   .addEventListener('click', deleteFunction);
  