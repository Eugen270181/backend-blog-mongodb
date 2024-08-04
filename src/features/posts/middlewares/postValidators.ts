import {body} from 'express-validator'
import {inputCheckErrorsMiddleware} from '../../../global-middlewares/inputCheckErrorsMiddleware'
import {blogsRepository} from '../../blogs/blogsRepository'
import {NextFunction, Request, Response} from 'express'
import {postsRepository} from '../postsRepository'

// title: string // max 30
// shortDescription: string // max 100
// content: string // max 1000
// blogId: string // valid

export const titleValidator = body('title').isString().withMessage('not string')
    .trim().isLength({min: 1, max: 30}).withMessage('more then 30 or 0')
export const shortDescriptionValidator = body('shortDescription').isString().withMessage('not string')
    .trim().isLength({min: 1, max: 100}).withMessage('more then 100 or 0')
export const contentValidator = body('content').isString().withMessage('not string')
    .trim().isLength({min: 1, max: 1000}).withMessage('more then 1000 or 0')
export const blogIdValidator = body('blogId').isString().withMessage('not string')
    .trim().custom(blogId => {
        const blog = blogsRepository.findBlogById(blogId)
        // console.log(blog)
        return !!blog
    }).withMessage('no blog')

export const findPostValidator = (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const foundPost = postsRepository.findPostById(req.params.id)
    if (!foundPost) {

        res
            .status(404)
            .json({})
        return
    }

    next()
}


export const postValidators = [
    titleValidator,
    shortDescriptionValidator,
    contentValidator,
    blogIdValidator,

    inputCheckErrorsMiddleware,
]