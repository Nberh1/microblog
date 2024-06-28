function logout() {
  
  localStorage.clear(); 

  
  window.location.href = "http://127.0.0.1:5501/microblog/account/login.html"; 
}

function Back() {
  
  window.location.href = "http://127.0.0.1:5501/microblog/posts/posts.html"; 
}
