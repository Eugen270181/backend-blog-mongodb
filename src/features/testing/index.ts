import {Router} from 'express'
import {clearDB} from '../../db/dbMongo'

export const testingRouter = Router()

testingRouter.delete('/all-data', async (req, res) => {
    await clearDB()
    res.send(204)
})