import {Request, Response} from 'express'
import {BlogInputModel} from '../../../input-output-types/blogs-types'
import {blogsRepository} from '../blogsRepository'

export const putBlogController = async (req: Request<{id: string}, any, BlogInputModel>, res: Response) => {
    await blogsRepository.updateBlog(req.body,req.params.id)
    res.sendStatus(204)
}