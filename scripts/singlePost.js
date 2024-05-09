const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const productContainer = document.querySelector(".singlePost");

if (id) {
  const url = `https://wordpress-561851-4306624.cloudwaysapps.com/wp-json/wp/v2/posts/${id}`;

  async function getSinglePost() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const product = await response.json();

      // Fetch featured image URL separately
      const featuredImageUrl = await fetchFeaturedImageUrl(product.featured_media);

      createHTML(product, featuredImageUrl);
    } catch (error) {
      console.error('Error fetching single post:', error);
      displayErrorMessage();
    }
  }

  getSinglePost();

  async function fetchFeaturedImageUrl(featuredMediaId) {
    const imageUrlResponse = await fetch(`https://wordpress-561851-4306624.cloudwaysapps.com/wp-json/wp/v2/media/${featuredMediaId}`);
    const imageData = await imageUrlResponse.json();
    return imageData.source_url;
  }

  function createHTML(product, featuredImageUrl) {
    productContainer.innerHTML += `
      <div class="post">
        <img class="post-image" src="${featuredImageUrl}" alt="${product.title.rendered}">
        <p>${product.date}</p>
        <h2>${product.title.rendered}</h2>
        <p>${product.content.rendered}</p>
      </div>`;
    
    // Add event listener to open modal when image is clicked
    const postImage = document.querySelector('.post-image');
    postImage.addEventListener('click', () => {
      openModal(featuredImageUrl);
    });
  }
} else {
  console.error("Product ID not found in the URL");
  displayErrorMessage();
}

function displayErrorMessage() {
  const errorMessage = document.createElement('div');
  errorMessage.textContent = 'An error occurred while loading the post. Please try again later.';
  errorMessage.classList.add('error-message');
  productContainer.appendChild(errorMessage);
}

// Modal functions
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');

// Function to open the modal
function openModal(imageUrl) {
  modal.style.display = 'block';
  modalImage.src = imageUrl;
}

// Close the modal when user clicks on the close button or outside the modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Close the modal when user clicks on the close button
const closeBtn = document.querySelector('.close');
closeBtn.onclick = function() {
  modal.style.display = "none";
}