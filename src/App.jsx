import { useEffect, useState } from "react";
import { PostList } from "./components/PostList";
import Home from "./pages/Home";
import { fetchPosts } from "./utils/fetchPosts";

function App() {
  return <Home />;
}

export default App;
