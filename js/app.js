let allPosts = [];

async function loadPosts() {
  try {
    const response = await fetch('posts.json');
    if (!response.ok) throw new Error('posts.json not found');
    allPosts = await response.json();
    renderPosts(allPosts);
  } catch (error) {
    document.getElementById('post-list').innerHTML = '<p>게시글을 불러올 수 없습니다.</p>';
  }
}

function renderPosts(posts) {
  const container = document.getElementById('post-list');
  if (!container) return;
  
  container.innerHTML = posts.map(post => `
    <div class="post-item">
      <h2><a href="post.html?file=${encodeURIComponent(post.file)}">${post.title}</a></h2>
      <p><small>${post.date} | ${post.category}</small></p>
      <p>${post.excerpt}</p>
    </div>
  `).join('');
}

if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/onlymyjourney.github.io/')) {
  loadPosts();
}
