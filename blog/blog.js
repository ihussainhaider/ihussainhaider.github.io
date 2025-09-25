fetch("posts.json")
  .then(response => response.json())
  .then(posts => {
    const container = document.getElementById("posts-container");

    posts.forEach(post => {
      const card = document.createElement("article");
      card.classList.add("blog-card");

      card.innerHTML = `
        <h2><a href="${post.link}">${post.title}</a></h2>
        <p class="date">${post.date}</p>
        <p class="excerpt">${post.excerpt}</p>
        <a href="${post.link}" class="read-more">Read More →</a>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => console.error("Error loading posts:", error));
