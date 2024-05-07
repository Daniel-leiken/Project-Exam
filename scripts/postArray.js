const postArray = document.getElementById("post-array");

function renderPostArray(posts) {
  createPostArrayHTML(posts);
}


function createPostArrayHTML(posts) {

  posts.forEach(function (post) {
    if (post._links && post._links["wp:featuredmedia"]) {
      const featuredImage = post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0];
      const imageUrl = featuredImage ? featuredImage.source_url : 'placeholder.jpg'; 

      // Create post element
      const postElement = document.createElement('div');
      postElement.classList.add('post-array-item');

      // Create post content
      postElement.innerHTML = `
        <a href="Blog post specific.html?id=${post.id}">
          <img src="${imageUrl}" alt="${post.title.rendered}">
          <p>${post.date}
          <h2>${post.title.rendered}</h2>
          <p>${post.excerpt.rendered}</p>
        </a>`;

      // Append post element to posts container
      postArray.appendChild(postElement);
    } else {
      // Handle case where featured image link is missing
      // Create post element
      const postElement = document.createElement('div');
      postElement.classList.add('post-array-item');

      // Create post content
      postElement.innerHTML = `
        <a href="productpage.html?id=${post.id}">
          <h2>${post.title.rendered}</h2>
          <p>${post.excerpt.rendered}</p>
        </a>`;

      // Append post element to posts container
      postArray.appendChild(postElement);
    }
  });
}
