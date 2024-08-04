import {BlogDbType} from '../../db/blog-db-type'
import {db} from '../../db/db'
import {BlogInputModel, BlogViewModel} from '../../input-output-types/blogs-types'

export const blogsRepository = {
    createBlog(blog: BlogInputModel) {
        const newBlog: BlogDbType = {
            id: new Date().toISOString() + Math.random(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
        }
        db.blogs = [...db.blogs, newBlog]
        return newBlog.id
    },
    findBlogById(id: string) {
        return db.blogs.find(b => b.id === id)
    },
    findBlogAndMap(id: string) {
        const blog = this.findBlogById(id)! // ! используем этот метод если проверили существование
        return this.map(blog)
    },
    findBlogsAndMap() {
        return db.blogs.map(b => this.map(b))
    },
    deleteBlog(id: string) {
        db.blogs= db.blogs.filter(b => !(b.id === id))
    },
    updateBlog(blog: BlogInputModel, id: string) {
        db.blogs = db.blogs.map(b => b.id === id ? {...b, ...blog} : b)
    },
    map(blog: BlogDbType) {
        const blogForOutput: BlogViewModel = {
            id: blog.id,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            name: blog.name,
        }
        return blogForOutput
    },
}