import axios from "axios";
import React, { useEffect, useState } from "react";
import search from "../../assets/icons/search.svg";
import BlogCard from "../../layouts/blog/BlogCard";
import Pagination from "../Pagination";
import RecentPostsCard from "./RecentPostsCard";

export default function BlogContainer() {
  const [recentPosts, setRecentPosts] = useState(null);
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3;
  const [blogSearch, setBlogSearch] = useState("");
  const handleChange = (e) => {
    setBlogSearch(e.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://immutable858-001-site1.atempurl.com/api/Blog?Page=${currentPage}&ShowMore.Take=${itemsPerPage}&Prompt=${blogSearch}`
        );
        setData(response.data[0].blogs);
        const totalPages = Math.ceil(
          response.data[0]?.totalBlogCount / itemsPerPage
        );
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentPage, blogSearch]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getRecentPosts = async () => {
    const res = await axios.get(
      `https://immutable858-001-site1.atempurl.com/api/Blog/recent-posts`
    );
    setRecentPosts(res.data);
  };
  useEffect(() => {
    getRecentPosts();
  }, []);

  const [posts, setPosts] = useState(null);

  const getPost = async () => {
    const res =
      await axios.get(`https://immutable858-001-site1.atempurl.com/api/Blog?Page=1&ShowMore.Take=8
      `);
    setPosts(res.data);
  };
  useEffect(() => {
    getPost();
  }, []);

  const [blogCategory, setBlogCategory] = useState(null);

  const getBlogCategory = async () => {
    const res = await axios.get(
      `https://immutable858-001-site1.atempurl.com/api/Blog/blog-categories`
    );
    setBlogCategory(res.data);
  };
  useEffect(() => {
    getBlogCategory();
  }, []);
  return (
    <section className="flex w-full py-8 lg:py-16">
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="w-[85%] gap-5 lg:gap-10 relative flex justify-between min-[320px]:flex-col-reverse sm:flex-col-reverse md:flex-col-reverse lg:flex-row">
          <div className="flex flex-col gap-10  min-[320px]:w-[100%] sm:w-[100%] md:w-[100%] lg:w-[70%]">
            {data?.map((e) => (
              <BlogCard
                key={e?.id}
                img={e?.imageUrls?.[0]}
                adminInfo={e?.adminInfo?.roleName}
                createdDate={e?.createdDate}
                category={e?.category?.categoryName}
                header={e?.header}
                text={e?.text}
              />
            ))}
          </div>
          <div className="min-[320px]:w-[100%] sm:w-[100%] md:w-[100%] lg:w-[30%]">
            <div className="flex lg:sticky pb-4 lg:top-[75px] flex-col gap-6">
              <div className="flex flex-col gap-6 justify-center">
                <div className="flex gap-2 border border-[#9F9F9F] rounded-[10px] py-2 px-4">
                  <input
                    className="w-full"
                    type="text"
                    value={blogSearch}
                    onChange={handleChange}
                  />
                  <img className="w-[20px]" src={search} />
                </div>
                <div className="flex flex-col gap-7 justify-center items-center">
                  <div className="w-[85%] flex flex-col gap-6">
                    <h2 className="text-2xl font-medium">Categories</h2>
                    {blogCategory?.map((e) => (
                      <div
                        key={e.id}
                        className="flex justify-between text-[#9F9F9F]"
                      >
                        <div className="flex flex-col gap-5">
                          <span>{e.categoryName}</span>
                        </div>
                        <div className="flex flex-col gap-5">
                          <span>{e.blogCount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-[85%] flex flex-col gap-6">
                    <h2 className="text-2xl font-medium">Recent Posts</h2>
                    {recentPosts?.map((e) => (
                      <RecentPostsCard
                        key={e?.id}
                        img={e?.imageUrls?.[0]}
                        header={e?.header}
                        createdDate={e?.createdDate}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </section>
  );
}
