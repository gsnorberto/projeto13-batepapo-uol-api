import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

let dbCollection

export default {
    connectToDb: (cb) => {
        const mongoClient = new MongoClient(process.env.DATABASE_URL)
        mongoClient.connect()
            .then((mongoClient) => {
                dbCollection = mongoClient.db()
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },
    getDb: () => dbCollection
}