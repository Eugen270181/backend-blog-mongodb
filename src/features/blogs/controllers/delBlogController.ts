import {Request, Response} from 'express'
import {blogsRepository} from '../blogsRepository'

export const delBlogController = async (req: Request<{id: string}>, res: Response) => {
    await blogsRepository.deleteBlog(req.params.id)
    res.sendStatus(204)
}