import {Db, Collection, ObjectId , MongoClient} from "mongodb"
import {BlogDbType} from './blog-db-type'
import {PostDbType} from './post-db-type'
import {SETTINGS} from '../settings'
// получение доступа к бд
const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL)
export const dbMongo: Db = client.db(SETTINGS.MONGO_DB);

// получение доступа к коллекциям
export const blogCollection: Collection<BlogDbType> = dbMongo.collection<BlogDbType>(SETTINGS.BLOG_COLLECTION_NAME)

export const postCollection: Collection<PostDbType> = dbMongo.collection<PostDbType>(SETTINGS.POST_COLLECTION_NAME)

export const clearDB = async () => {
    try {
        await blogCollection.drop()
        await postCollection.drop()
        console.log('drop blog and post collections')
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}
// проверка подключения к бд
export const connectToDB = async () => {
    try {
        await client.connect()
        console.log('connected to db')
        return true
    } catch (e) {
        console.log(e)
        await client.close()
        return false
    }
}