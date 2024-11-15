import { v4 as uuidv4 } from 'uuid';
import { collection, ProductType } from '../repositories/db';
import { productsRepository } from '../repositories/products-repository-db';

export const productsService = {
    async findProducts(title: string | null | undefined): Promise<ProductType[]> {
        return productsRepository.findProducts(title);
    },

    async getProductByID(id: string) {
        return productsRepository.findProducts(id);
    },

    async createProduct(title: string): Promise<ProductType> {
        const newProduct = { id: uuidv4(), title };
        const createadProduct = await productsRepository.createProduct(newProduct);
        return createadProduct;
    },

    async updateProduct(id: string, title: string) {
        return await productsRepository.updateProduct(id, title);
    },

    async deleteProduct(id: string) {
        return await productsRepository.deleteProduct(id);
    },
};
