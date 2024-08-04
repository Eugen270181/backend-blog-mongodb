import {Request, Response} from 'express'
import {PostViewModel} from '../../../input-output-types/posts-types'
import {postsRepository} from '../postsRepository'

export const getPostsController = (req: Request, res: Response<PostViewModel[]>) => {
    const foundPosts = postsRepository.findPostsAndMap()
    res.status(200).send(foundPosts)
}