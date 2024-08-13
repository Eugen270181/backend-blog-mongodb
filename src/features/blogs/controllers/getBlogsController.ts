import {Request, Response} from 'express'
import {BlogViewModel} from '../../../input-output-types/blogs-types'
import {blogsRepository} from '../blogsRepository'

export const getBlogsController = async (req: Request, res: Response<BlogViewModel[]>) => {
    const foundBlogs = await blogsRepository.findBlogsAndMap()
    res.status(200).send(foundBlogs)

}