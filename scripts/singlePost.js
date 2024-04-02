const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (id) {
  const url = `https://wordpress-561851-4306624.cloudwaysapps.com/wp-json/wp/v2/posts/${id}`;
  const productContainer = document.querySelector(".singlePost");

  async function getSinglePost() {
    try {
      const response = await fetch(url);
      const product = await response.json();

      // Fetch featured image URL separately
      const featuredImageUrl = await fetchFeaturedImageUrl(product.featured_media);

      createHTML(product, featuredImageUrl);
    } catch (error) {
      console.log(error);
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
        <img src="${featuredImageUrl}" alt="${product.title.rendered}">
        <p>${product.date}</p>
        <h2>${product.title.rendered}</h2>
        <p>${product.content.rendered}</p>
      </div>`;
  }
} else {
  console.error("Product ID not found in the URL");
}
