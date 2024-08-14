import {Request, Response} from 'express'
import {postsRepository} from '../postsRepository'

export const delPostController = async (req: Request<{id: string}>, res: Response) => {
    await postsRepository.deletePost(req.params.id)
    res.sendStatus(204)
}