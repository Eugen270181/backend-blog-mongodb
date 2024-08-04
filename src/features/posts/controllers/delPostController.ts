import {Request, Response} from 'express'
import {postsRepository} from '../postsRepository'

export const delPostController = (req: Request<{id: string}>, res: Response) => {
    postsRepository.deletePost(req.params.id)
    res.send(204)
}