import { MongoClient } from 'mongodb';
import { ProductType } from './products-repository-db';

const mongoUri = process.env.mongoURI || 'mongodb://0.0.0.0:27017/';

export const client = new MongoClient(mongoUri);

export const collection = client.db('shop').collection<ProductType>('products');


export async function runDb() {
    try {
        // Connect the client to the server
        await client.connect();

        // Establish and verify connection
        await client.db('products').command({ ping: 1 });
        console.log('Connected successfully to mongo server');
    } catch {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
