import {BlogInputModel} from './blogs-types'
import {PostInputModel} from './posts-types'

export type FieldNamesType = keyof BlogInputModel | keyof PostInputModel
// const f: FieldsType = 'some' // error
export type errorsMessagesType = {message: string, field: FieldNamesType}
export type OutputErrorsType = {
    errorsMessages: errorsMessagesType[]
}