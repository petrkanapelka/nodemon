import { v4 as uuidv4 } from 'uuid';
import { client } from './db';
import { WithId } from 'mongodb';

export type ProductType = {
    id: string;
    title: string;
};

export const productsRepository = {
    async findProducts(title: string | null): Promise<ProductType[]> {
        const collection = client.db('shop').collection<ProductType>('products');

        let products: WithId<ProductType>[];

        if (title) {
            products = await collection.find({ title: { $regex: title } }).toArray();
        } else {
            products = await collection.find().toArray();
        }

        return products.map(({ _id, ...rest }) => ({ ...rest } as ProductType));
    },

    async createProduct(title: string): Promise<ProductType> {
        const newProduct = { id: uuidv4(), title };
        const result = await client.db('shop').collection<ProductType>('products').insertOne(newProduct);
        return newProduct;
    },

    async getProductByID(id: string) {
        const collection = client.db('shop').collection<ProductType>('products');
        const product = await collection.findOne({ id });
        if (product) {
            return product;
        } else {
            return null;
        }
    },

    async updateProduct(id: string, title: string) {
        const result = await client
            .db('shop')
            .collection<ProductType>('products')
            .updateOne({ id }, { $set: { title } });
        return result.matchedCount === 1;
    },

    async deleteProduct(id: string) {
        const result = await client.db('shop').collection<ProductType>('products').deleteOne({ id });
        return result.deletedCount === 1;
    },
};
