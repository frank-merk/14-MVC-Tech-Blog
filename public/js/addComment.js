const newComment = async (event) => {
    event.preventDefault();
  
    const text = document.querySelector('#new-comment').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
  
    if (text) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ 
          post_id, 
          text }),
        headers: { 
          'Content-Type': 'application/json' 
        },
      });
  
      if (response.ok) {
        document.location.reload();
        console.log(post_id);
      } else {
        alert('Failed to create new comment');
      }
    }
  };

  document.querySelector('add-comment').addEventListener('submit', newComment);