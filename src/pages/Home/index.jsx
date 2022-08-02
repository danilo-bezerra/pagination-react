import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Pagination } from "../../components/Pagination";
import { PostList } from "../../components/PostList";
import { fetchPosts } from "../../utils/fetchPosts";
import "./styles.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const [searchText, setSearchText] = useState("");

  const filteredPosts = !!searchText
    ? allPosts.filter((post) => post.title.toLowerCase().includes(searchText))
    : posts;

  function handleChangePage(value) {
    setPage(value);
  }

  function handleChangePostsPerPage(num) {
    setPostsPerPage(num);
    if (Math.ceil(allPosts.length / num) < page) {
      setPage(Math.ceil(allPosts.length / num));
    }
  }

  function handleSlicePostsToShow(postList, page, postsPerPage) {
    return postList.slice((page - 1) * postsPerPage, postsPerPage * page);
  }

  useEffect(() => {
    async function getPosts() {
      const postList = await fetchPosts();

      setAllPosts(postList);
      setPosts(handleSlicePostsToShow(postList, page, postsPerPage));
    }
    getPosts();
  }, []);

  useEffect(() => {
    if (allPosts) {
      setPosts(handleSlicePostsToShow(allPosts, page, postsPerPage));
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
      {filteredPosts.length > 0 ? (
        <PostList posts={filteredPosts} />
      ) : (
        <h2>Not for you here...</h2>
      )}
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
