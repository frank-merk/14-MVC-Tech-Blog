const newPost = async (event) => {
    event.preventDefault();
  
    const 
    // TODO: Add a comment describing the functionality of these expressions
    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();
  
    if (title && description) {
      const response = await fetch('/api/users/post', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  