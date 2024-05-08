const homeSpinner = document.querySelector(".spinner");

async function Initialize() {
    try {
        homeSpinner.style.display = "block";
        const posts = await getPosts({
            page: 1,
            pageSize: 12
        });
        renderSlider(posts);
        renderPostArray(posts);
        const width = window.innerWidth;
        setDisplayBySize(width);
        window.addEventListener("resize", resize);
        homeSpinner.style.display = "none";
    } catch (error) {
        console.error('Error initializing:', error);
        displayErrorMessage();
    }
}

function resize(e) {
    const width = e.currentTarget.innerWidth;
    setDisplayBySize(width);
}

function setDisplayBySize(width) {
    if(width <= 991) {
        document.getElementById("slider").style.display = 'none';
        document.getElementById("dots").style.display = 'none';
        document.getElementById("post-array").style.display = 'grid';
    } else if(width > 991) {
        document.getElementById("slider").style.display = 'flex';
        document.getElementById("dots").style.display = 'flex';
        document.getElementById("post-array").style.display = 'none';
    }
}

async function getPosts({ page, pageSize }) {
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
