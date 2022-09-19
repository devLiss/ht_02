import {blogs, posts} from "../data";
import {postType} from "../types";

export const postRepo = {
    findAllPosts(){
        return posts;
    },
    findPostById(id:string|null){
        return id ?  posts.find(post => post.id === id) : null
    },
    deletePost(id:string|null){
        for(let i=0; i < posts.length; i++){
            if(posts[i].id === id) {
                posts.splice(i,1);
                return true;
            }
        }
        return false
    },
    createPost(title:string,
    shortDescription:string,
    content:string,
    blogId:string){
        const post = {
            id:Math.random().toString(),
            title:title,
            shortDescription:shortDescription,
            content:content,
            blogId:blogId,
            blogName:blogId
        }

        posts.push(post)
        return post
    },
    updatePost( id:string,
                title: string,
                shortDescription: string,
                content: string,
                blogId: string){
        const post = this.findPostById(id);
        if(post)
        {
            post.title=title
            post.shortDescription=shortDescription
            post.content=content
            post.blogId=blogId

            return true
        }
        return false

    }
}
