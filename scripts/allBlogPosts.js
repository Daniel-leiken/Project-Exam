const allBlogPostSpinner = document.querySelector(".spinner");
const allBlogPostLoadMoreButton = document.querySelector(".load-more-button");
const allBlogPostNoMorePosts = document.querySelector(".no-more-posts");
const pageSize = 10;
let currentPage = 1;
let hasMorePosts = true;

async function Initialize() {
    try {
        allBlogPostLoadMoreButton.style.display = "none";
        allBlogPostSpinner.style.display = "block";
        const posts = await getPosts({
            pageSize: pageSize,
            page: currentPage
        });
        renderPostArray(posts);
        allBlogPostSpinner.style.display = "none";
        allBlogPostLoadMoreButton.style.display = "block";
    } catch (error) {
        console.error('Error initializing:', error);
        displayErrorMessage();
    }
}

async function NextPage() {
    allBlogPostSpinner.style.display = "block";
    allBlogPostLoadMoreButton.style.display = "none";
    currentPage = currentPage + 1;
    try {
        const posts = await getPosts({
            pageSize: pageSize,
            page: currentPage
        });
        renderPostArray(posts);
        allBlogPostLoadMoreButton.style.display = "block";
    } catch (error) {
        hasMorePosts = false;
        allBlogPostNoMorePosts.style.display = "block";
        console.error('Error fetching next page:', error);
    }
    allBlogPostSpinner.style.display = "none";
}

async function getPosts({ pageSize, page }) {
    try {
        const response = await fetch(`https://wordpress-561851-4306624.cloudwaysapps.com/wp-json/wp/v2/posts?_embed&_orderby=date&_order=desc&page=${page}&per_page=${pageSize}`);
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

function displayErrorMessage() {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = 'An error occurred while loading. Please try again later.';
    errorMessage.classList.add('error-message');
    document.body.appendChild(errorMessage);
}

Initialize();
