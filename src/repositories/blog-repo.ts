import {blogs} from "../data";

export const blogsRepo = {
    findAllBlogs(){
        return blogs;
    },

    findBlogById(id:string|null){
        if(id){
            return blogs.find(blog => blog.id === id)
        }
        else{
            return null
        }
    },
    createBlog(name:string,
               youtubeUrl:string,
    ){
        const blog = {
            id:Math.random().toString(),
            name:name,
            youtubeUrl:youtubeUrl,
        }
        blogs.push(blog);
        return blog;
    },
    deleteBlog(id:string|null){
          for(let i=0; i < blogs.length; i++){
              if(blogs[i].id === id) {
                  blogs.splice(i,1);
                  return true;
              }
          }
          return false
      },
    updateBlog(id:string,
               name:string,
               youtubeUrl:string
               ){
        const blog = this.findBlogById(id);
        if(blog){
            blog.name = name;
            blog.youtubeUrl=youtubeUrl;
            return true
        }
        return false
      }

}