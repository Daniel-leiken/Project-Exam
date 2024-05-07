
const allBlogPostSpinner = document.querySelector(".spinner");
const allBlogPostLoadMoreButton = document.querySelector(".load-more-button");
const allBlogPostNoMorePosts = document.querySelector(".no-more-posts");
const pageSize = 10;
let currentPage = 1;
let hasMorePosts = true;

async function Initialize() {
    allBlogPostLoadMoreButton.style.display = "none";
    allBlogPostSpinner.style.display = "block";
    const posts = await getPosts({
        pageSize: pageSize,
        page: currentPage
    });
    renderPostArray(posts);
    allBlogPostSpinner.style.display = "none";
    allBlogPostLoadMoreButton.style.display = "block";
}

async function NextPage() {

    allBlogPostSpinner.style.display = "block";
    allBlogPostLoadMoreButton.style.display = "none";
    currentPage = currentPage+1;
    try {
        const posts = await getPosts({
            pageSize: pageSize,
            page: currentPage
        });
        renderPostArray(posts);
        allBlogPostLoadMoreButton.style.display = "block";
    } catch(error) {
        hasMorePosts = false;
        allBlogPostNoMorePosts.style.display = "block";

    }

    allBlogPostSpinner.style.display = "none";

}



Initialize();