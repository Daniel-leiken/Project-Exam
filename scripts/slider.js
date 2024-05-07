const slider = document.getElementById('slider');
const dotsContainer = document.getElementById('dots');

function renderSlider(posts) {
    createSliderHTML(posts);
    createDotsHTML(posts);
}

function createSliderHTML(posts) {
    slider.innerHTML = '';
    posts.forEach((post, index) => {
        const featuredImage = post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0];
        const imageUrl = featuredImage ? featuredImage.source_url : 'placeholder.jpg'; // Replace 'placeholder.jpg' with your default image URL
        const postElement = document.createElement('div');
        postElement.classList.add('post-slider');
        postElement.style.display = index < 3 ? 'block' : 'none'; // Show only the first 3 posts
        postElement.innerHTML = `
            <a href="Blog post specific.html?id=${post.id}">
                <img src="${imageUrl}" alt="${post.title.rendered}">
                <p>${post.date}</p>
                <h2>${post.title.rendered}</h2>
                <p>${post.excerpt.rendered}</p>
            </a>`;
        slider.appendChild(postElement);
    });
}

function createDotsHTML(posts) {
    const numDots = Math.ceil(posts.length / 3)
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.dataset.slideIndex = i;
        dot.addEventListener('click', () => {
            currentSlideIndex = i;
            showSlide();
        });
        dotsContainer.appendChild(dot);
    }
}

function showSlide() {
    const posts = document.querySelectorAll('.post-slider');
    const dots = document.querySelectorAll('.dot');
    const startIndex = currentSlideIndex * 3;
    const endIndex = Math.min(startIndex + 2, posts.length - 1); // Ensure endIndex does not exceed the number of posts
    posts.forEach((post, index) => {
        post.style.display = index >= startIndex && index <= endIndex ? 'block' : 'none'; // Show only the posts within the current slide range
    });
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    });
}


