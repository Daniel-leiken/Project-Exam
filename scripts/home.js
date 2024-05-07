
const homeSpinner = document.querySelector(".spinner");

async function Initialize() {
    homeSpinner.style.display="block";
    const posts = await getPosts({
        page: 1,
        pageSize: 12
    });
    renderSlider(posts);
    renderPostArray(posts);
    const width = window.innerWidth;
    setDisplayBySize(width);
    window.addEventListener("resize", resize);
    homeSpinner.style.display="none";
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

Initialize();