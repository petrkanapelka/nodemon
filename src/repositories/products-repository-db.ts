import { v4 as uuidv4 } from 'uuid';
import { collection } from './db';

export type ProductType = {
    id: string;
    title: string;
};

export const productsRepository = {
    async findProducts(title: string | null | undefined): Promise<ProductType[]> {
        const filter: any = {};

        if (title) {
            filter.title = { $regex: title };
        }

        return collection.find(filter).toArray();
    },

    async createProduct(title: string): Promise<ProductType> {
        const newProduct = { id: uuidv4(), title };
        const result = await collection.insertOne(newProduct);
        return newProduct;
    },

    async getProductByID(id: string) {
        const product = await collection.findOne({ id });
        if (product) {
            return product;
        } else {
            return null;
        }
    },

    async updateProduct(id: string, title: string) {
        const result = await collection.updateOne({ id }, { $set: { title } });
        return result.matchedCount === 1;
    },

    async deleteProduct(id: string) {
        const result = await collection.deleteOne({ id });
        return result.deletedCount === 1;
    },
};