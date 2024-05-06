const url = "https://wordpress-561851-4306624.cloudwaysapps.com/wp-json/wp/v2/posts?_embed&_orderby=date&_order=desc";
const postContainer = document.querySelector(".posts");
const spinner = document.querySelector(".spinner");

async function getPosts() {
  try {
    // Show spinner while fetching data
    spinner.style.display = "block";

    const response = await fetch(url);
    const posts = await response.json();
    createHTML(posts);

    // Hide spinner after fetching data
    spinner.style.display = "none";
  } catch (error) {
    console.log(error);
  }
}

getPosts();

function createHTML(posts) {
  const postsContainer = document.querySelector('.posts-container');

  posts.forEach(function (post) {
    if (post._links && post._links["wp:featuredmedia"]) {
      fetch(post._links["wp:featuredmedia"][0].href)
        .then(response => response.json())
        .then(featuredMedia => {
          const featuredImageUrl = featuredMedia.source_url;

          // Create post element
          const postElement = document.createElement('div');
          postElement.classList.add('post');

          // Create post content
          postElement.innerHTML = `
            <a href="Blog post specific.html?id=${post.id}">
              <img src="${featuredImageUrl}" alt="${post.title.rendered}">
              <p>${post.date}
              <h2>${post.title.rendered}</h2>
              <p>${post.excerpt.rendered}</p>
            </a>`;

          // Append post element to posts container
          postsContainer.appendChild(postElement);
        })
        .catch(error => {
          console.error('Error fetching featured image:', error);
        });
    } else {
      // Handle case where featured image link is missing
      // Create post element
      const postElement = document.createElement('div');
      postElement.classList.add('post');

      // Create post content
      postElement.innerHTML = `
        <a href="productpage.html?id=${post.id}">
          <h2>${post.title.rendered}</h2>
          <p>${post.excerpt.rendered}</p>
        </a>`;

      // Append post element to posts container
      postsContainer.appendChild(postElement);
    }
  });
}
