import {Response, Request, NextFunction} from 'express'
import {validationResult,ValidationError} from 'express-validator'
import {FieldNamesType, OutputErrorsType, errorsMessagesType} from '../input-output-types/output-errors-type'

export const inputCheckErrorsMiddleware = (req: Request, res: Response<OutputErrorsType>, next: NextFunction) => {
    const e = validationResult(req)
    if (!e.isEmpty()) {
        const result = e.formatWith((error: ValidationError):errorsMessagesType => (
            {message: error.msg, field: (error.type==='field'?error.path:'unknown') as FieldNamesType})).
            array({onlyFirstError: true});
        res.status(400).send({errorsMessages:result})
        return
    }

    next()
}