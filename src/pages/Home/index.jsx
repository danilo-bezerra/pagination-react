import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Pagination } from "../../components/Pagination";
import { PostList } from "../../components/PostList";
import { fetchPosts } from "../../utils/fetchPosts";
import "./styles.css";

function Home() {
  


  const [postsProvider, setPostsProvider] = useState({
    posts: [],
    allPosts: [],
    page: 1,
    postsPerPage: 4,
  });

  const [searchText, setSearchText] = useState('')

  const { posts, allPosts, page, postsPerPage } = postsProvider;

  const filteredPosts = !!searchText ? allPosts.filter(post => post.title.toLowerCase().includes(searchText)) : posts

  function handleChangePage(value) {
    if (value == "next") {
      return setPostsProvider((val) => ({ ...val, page: val.page + 1 }));
    }
    setPostsProvider((val) => ({ ...val, page: val.page - 1 }));
  }

  function handleChangePostsPerPage(num) {
    setPostsProvider((val) => ({
      ...val,
      postsPerPage: num,
      // verifica se a pagina atual pode ficar sem posts, se sim, a pagina atual é alterada para a ultima pagina que terá ao menos 1 post
      page: Math.ceil(allPosts.length / num) < page ? Math.ceil(allPosts.length / num) : val.page
    }));
  }

  function handleSlicePostsToShow(postList, page, postsPerPage) {
    return postList.slice((page - 1) * postsPerPage, postsPerPage * page);
  }

  useEffect(() => {
    async function getPosts() {
      const postList = await fetchPosts();

      setPostsProvider((val) => ({
        ...val,
        allPosts: postList,
        posts: handleSlicePostsToShow(postList, val.page, val.postsPerPage),
      }));
    }
    getPosts();
  }, []);

  useEffect(() => {
    if (allPosts) {
      setPostsProvider((val) => ({
        ...val,
        posts: handleSlicePostsToShow(val.allPosts, val.page, val.postsPerPage),
      }));
    }
  }, [page, postsPerPage]);

  if (allPosts == 0) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <form>
        <input
          type="text"
          value={searchText}
          onChange={({ target }) => setSearchText(target.value)}
          placeholder="Search for a post..."
        />
      </form>
      {filteredPosts.length > 0 ? <PostList posts={filteredPosts} /> : <h2>Not for you here...</h2>}
      {!searchText && (
        <Pagination
          page={page}
          maxPages={allPosts.length / postsPerPage + 1}
          postsPerPage={postsPerPage}
          onPageChange={handleChangePage}
          onPostPerPageChange={handleChangePostsPerPage}
        />
      )}
    </>
  );
}
export default Home;
