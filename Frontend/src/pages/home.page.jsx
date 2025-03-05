import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPost from "../components/nobanner-blog-post.component";

const HomePage = () => {

  let [ blogs, setBlog ] = useState(null);
  let [ trendingBlogs, setTrendingBlog ] = useState(null);
  let categories = ["programming", "hollywood", "film making", "social media", "cooking", "tech", "finances", "travel"]



  const fetchLatestBlogs = () => {
    axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs")
    .then(({ data }) => {
      setBlog(data.blogs);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const fetchTrendingBlogs = () => {
    axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
    .then(({ data }) => {
      setTrendingBlog(data.blogs);
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchLatestBlogs();
    fetchTrendingBlogs();
  }, [])

  return (
    <AnimationWrapper>

      <section className="h-cover flex justify-center gap-10">

        <div className="w-full">
          
          <InPageNavigation routes={["home", "trending blogs"]} defaultHidden={["trending blogs"]}>

            <>
              {
                blogs == null ? <Loader /> :
                blogs.map((blog, i) => {
                  return <AnimationWrapper transition={{ duration: 1, delay: i*.1 }} key={i}>
                    <BlogPostCard content={blog} author={blog.author?.personal_info || {}} />
                  </AnimationWrapper>
                })
              }
            </>

            {
              trendingBlogs == null ? <Loader /> :
              trendingBlogs.map((blog, i) => {
                return <AnimationWrapper transition={{ duration: 1, delay: i*.1 }} key={i}>
                  <MinimalBlogPost blog={blog} index={i} />
                </AnimationWrapper>
              })
            }

          </InPageNavigation>

        </div>

        <div className="min-w-[40%] 1g:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">

          <div className="flex flex-col gap-10">

            <h1 className="font-medium text-xl mb-8">Stories form all interests</h1>

            <div className="flex gap-3 flex-wrap">
              {

              }
            </div>

          </div>

          <div>
            <h1 className="font-medium text-xl mb-8">Trending <i className="fi fi-rr-arrow-trend-up"></i></h1>
            {
              trendingBlogs = null ? <Loader /> :
              trendingBlogs.map((blog, i) => {
                return <AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i}>
                  <MinimalBlogPost blog={blog} index={i} />
                </AnimationWrapper>
              })
            }
          </div>

        </div>

      </section>

    </AnimationWrapper>
  );
}

export default HomePage;