import {Db, Collection, MongoClient} from "mongodb"
import {BlogDbType} from '../../types/db/blog-db-type'
import {PostDbType} from '../../types/db/post-db-type'
import {SETTINGS} from "../../../settings";




// получение доступа к бд
const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL)
export const dbMongo: Db = client.db(SETTINGS.MONGO_DB);

// получение доступа к коллекциям
export const blogCollection: Collection<BlogDbType> = dbMongo.collection<BlogDbType>(SETTINGS.BLOG_COLLECTION_NAME)

export const postCollection: Collection<PostDbType> = dbMongo.collection<PostDbType>(SETTINGS.POST_COLLECTION_NAME)

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