import {PostDbType} from '../../db/post-db-type'
import {PostInputModel, PostViewModel} from '../../input-output-types/posts-types'
import {postCollection} from "../../db/dbMongo"
import {ObjectId, WithId} from "mongodb"
import {blogsRepository} from '../blogs/blogsRepository'


export const postsRepository = {
    async createPost(post: PostInputModel) {
        const newPost: PostDbType = {
            ...post,
            blogName: (await blogsRepository.findBlogById(post.blogId))!.name,
            createdAt: new Date().toISOString()
        }
        const result = await postCollection.insertOne(newPost);
        return result.insertedId.toString() // return _id -objectId
    },
    async findPostById(id: string) {
        return postCollection.findOne({ _id: new ObjectId(id) });
    },
    async findPostAndMap(id: string) {
        const post = ( await postCollection.findOne({ _id: new ObjectId(id) }) )! // ! используем этот метод если проверили существование
        return this.map(post)
    },
    async findPostsAndMap() {
        const posts = await postCollection.find({}).toArray()
        return posts.map(p => this.map(p))
    },
    async deletePost(id: string) {
        const result = await postCollection.deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
    },
    async updatePost(post: PostInputModel, id: string) {
        const blog = ( await blogsRepository.findBlogById(post.blogId) )!
        const result = await postCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...post,  blogName:blog.name} }
        );
        return result.modifiedCount > 0;
    },
    map(post:WithId<PostDbType>):PostViewModel{
        const { _id, ...postForOutput } = post;//деструктуризация
        return {id:post._id.toString(),...postForOutput}
    },
}