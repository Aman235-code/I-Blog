import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { FaRegHeart } from "react-icons/fa";
import { Bookmark, MessageSquare, Share2 } from "lucide-react";
import { toast } from "sonner";

const BlogView = () => {
  const params = useParams();
  const blogId = params.blogId;
  const { blog } = useSelector((store) => store.blog);
  const selectedBlog = blog.find((blog) => blog._id === blogId);

  const changeTime = (isDate) => {
    const date = new Date(isDate);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate;
  };

  const handleShare = (blogId) => {
    const blogUrl = `${window.location.origin}/blogs/${blogId}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Checkout this blog",
          text: "Read this amazing blog post",
          url: blogUrl,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error(error));
    } else {
      navigator.clipboard
        .writeText(blogUrl)
        .then(() => toast.success("Blog link copied to clipboard"));
    }
  };

  return (
    <div className="pt-14">
      <div className="max-w-6xl mx-auto p-10">
        {" "}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/docs/components">Blogs</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{selectedBlog.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="my-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {selectedBlog.title}
          </h1>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={selectedBlog.author.photoUrl} alt="author" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium">
                  {selectedBlog.author.firstName} {selectedBlog.author.lastName}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Published on {changeTime(selectedBlog.createdAt)} 8 min read{" "}
            </p>
          </div>
        </div>
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={selectedBlog.thumbnail}
            alt="thumbnail"
            width={1000}
            height={500}
            className="w-full object-cover"
          />
          <p className="text-sm text-muted-foreground mt-2 italic">
            {selectedBlog.subtitle}
          </p>
        </div>
        <p dangerouslySetInnerHTML={{ __html: selectedBlog.description }} />
        <div className="mt-10">
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge variant="secondary" className={"dark:bg-gray-800"}>
              Next.js
            </Badge>
            <Badge variant="secondary" className={"dark:bg-gray-800"}>
              React.js
            </Badge>
            <Badge variant="secondary" className={"dark:bg-gray-800"}>
              Web Development
            </Badge>
            <Badge variant="secondary" className={"dark:bg-gray-800"}>
              Javascript
            </Badge>
          </div>

          <div className="flex items-center justify-between border-y dark:border-gray-800 border-gray-300 py-4 mb-8">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className={"flex items-center gap-1"}>
                <FaRegHeart
                  size={24}
                  className="cursor-pointer hover:text-gray-600 text-white"
                />
                <span>0</span>
              </Button>

              <Button variant="ghost">
                <MessageSquare className="h-4 w-4" />
                <span>1 Comments</span>
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost">
                <Bookmark className="w-4 h-4" />
              </Button>

              <Button
                onClick={() => handleShare(selectedBlog._id)}
                variant="ghost"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogView;
