async function loadPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const file = urlParams.get('file');
  const container = document.getElementById('post-content');
  
  if (!file) {
    container.innerHTML = '<p>게시글을 찾을 수 없습니다.</p>';
    return;
  }

  try {
    const response = await fetch(`pages/${file}`);
    if (!response.ok) throw new Error('File not found');
    let markdown = await response.text();

    // Front Matter 제거
    const frontMatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
    const match = markdown.match(frontMatterRegex);
    let content = markdown;
    let title = file.replace('.md', '');
    let date = '';
    
    if (match) {
      const frontMatter = match[1];
      content = match[2];
      
      const lines = frontMatter.split(/\r?\n/);
      lines.forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
          const key = line.substring(0, colonIndex).trim();
          let value = line.substring(colonIndex + 1).trim();
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          if (key === 'title') title = value;
          if (key === 'date') date = value;
        }
      });
    }

    const htmlContent = marked.parse(content);
    container.innerHTML = `
      <h1>${title}</h1>
      ${date ? `<p><small>${date}</small></p>` : ''}
      <hr>
      ${htmlContent}
    `;

    // Prism.js 하이라이팅
    if (window.Prism) {
      Prism.highlightAll();
    }
    
    loadGiscus();
  } catch (error) {
    container.innerHTML = '<p>게시글을 불러오는 중 오류가 발생했습니다.</p>';
  }
}

function loadGiscus() {
  const container = document.getElementById('giscus-container');
  if (!container) return;

  const script = document.createElement('script');
  script.src = 'https://giscus.app/client.js';
  script.setAttribute('data-repo', 'onlymyjourney/onlymyjourney.github.io');
  script.setAttribute('data-repo-id', 'YOUR_REPO_ID'); // 수정 필요
  script.setAttribute('data-category', 'General');
  script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID'); // 수정 필요
  script.setAttribute('data-mapping', 'pathname');
  script.setAttribute('data-strict', '0');
  script.setAttribute('data-reactions-enabled', '1');
  script.setAttribute('data-emit-metadata', '1');
  script.setAttribute('data-input-position', 'bottom');
  script.setAttribute('data-theme', 'preferred_color_scheme');
  script.setAttribute('data-lang', 'ko');
  script.crossOrigin = 'anonymous';
  script.async = true;

  container.appendChild(script);
}

if (window.location.pathname.endsWith('post.html')) {
  loadPost();
}
