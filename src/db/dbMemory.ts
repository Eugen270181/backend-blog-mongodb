import {BlogDbType} from './blog-db-type'
import {PostDbType} from './post-db-type'

export type DBType = { // типизация базы данных (что мы будем в ней хранить)
    blogs: BlogDbType[]
    posts: PostDbType[]
    // some: any[]
}
export type ReadonlyDBType = { // тип для dataset
    blogs: Readonly<BlogDbType[]>
    posts: Readonly<PostDbType[]>
    // some: any[]
}

export const dbMongo: DBType = { // создаём базу данных (пока это просто переменная)
    blogs: [],
    posts: [],
    // some: []
}

// функция для быстрой очистки/заполнения базы данных для тестов
export const setDB = (dataset?: Partial<ReadonlyDBType>) => {
    if (!dataset) { // если в функцию ничего не передано - то очищаем базу данных
        dbMongo.blogs = []
        dbMongo.posts = []
        // db.some = []
        return
    }

    // если что-то передано - то заменяем старые значения новыми,
    // не ссылки - а глубокое копирование, чтобы не изменять dataset
    dbMongo.blogs = dataset.blogs?.map(b => ({...b})) || dbMongo.blogs
    dbMongo.posts = dataset.posts?.map(p => ({...p})) || dbMongo.posts
    // db.some = dataset.some?.map(s => ({...s})) || db.some
}