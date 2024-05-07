async function getPosts(paging) {
    let url = "https://wordpress-561851-4306624.cloudwaysapps.com/wp-json/wp/v2/posts?_embed&_orderby=date&_order=desc";

    if(paging) {
      url+="&page="+paging.page+"&per_page="+paging.pageSize;
    }

    try {  
      const response = await fetch(url);
      const posts = await response.json();
      return posts;
    } catch (error) {
      console.log(error);
    }
  }