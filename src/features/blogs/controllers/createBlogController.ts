import {Response, Request} from 'express'
import {BlogInputModel, BlogViewModel} from '../../../input-output-types/blogs-types'
import {blogsRepository} from '../blogsRepository'

export const createBlogController = async (req: Request<any, any, BlogInputModel>, res: Response<BlogViewModel>) => {
    const newBlogId = await blogsRepository.createBlog(req.body)
    const newBlog = await blogsRepository.findBlogAndMap(newBlogId)

    res
        .status(201)
        .json(newBlog)
}