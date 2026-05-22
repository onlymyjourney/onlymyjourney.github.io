const searchInput = document.getElementById('search-input');

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    // allPosts is global from app.js
    if (typeof allPosts !== 'undefined') {
      const filtered = allPosts.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.description.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query)
      );
      renderPosts(filtered);
    }
  });
}
