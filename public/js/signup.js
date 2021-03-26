

const signUpFunction = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#new-email').value.trim();
    const password = document.querySelector('#new-password').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
            'Content-Type': 'application/json'
          }
      });
      
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert("failed to sign-up");
        console.log("hit!")
      }
    }
    
  };

  document.querySelector('#signup-form').addEventListener('submit', signUpFunction);