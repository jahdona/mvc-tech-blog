async function newFormHandler(event) {
    event.preventDefault();
  
   // const title = document.querySelector('input[name="post-title"]').value;
    const comment_text = document.querySelector('textarea[name="comment-body"]').value;
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length-1
    ];
  
    const response = await fetch(`/api/comments/${id}`, {
      method: 'POST',
      body: JSON.stringify({
        //title,
        comment_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.comment-form').addEventListener('submit', newFormHandler);