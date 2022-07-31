export async function fetchPosts() {
    const postsResponse = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const photosResponse = await fetch(
      "https://jsonplaceholder.typicode.com/photos"
    );

    const postsJSON = await postsResponse.json();
    const photosJSON = await photosResponse.json();

    const postList = postsJSON.map((post, index) => ({
      ...post,
      image: photosJSON[index].url,
    }));

    return postList
}