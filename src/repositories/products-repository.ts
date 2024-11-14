import { v4 as uuidv4 } from 'uuid';

export type ProductType = {
    id: string;
    title: string;
};

let products = [
    { id: '1', title: 'tomato' },
    { id: '2', title: 'orange' },
];

export const productsRepository = {
    async findProducts(title: string | null): Promise<ProductType[]> {
        return title ? products.filter((p) => p.title.includes(title.toString())) : products;
    },
    async createProduct(title: string): Promise<ProductType> {
        const newProduct = { id: uuidv4(), title };
        products.push(newProduct);
        return newProduct;
    },
    async getProductByID(id: string) {
        return products.find((product) => product.id === id);
    },
    async updateProduct(id: string, title: string) {
        const product = products.find((product) => product.id === id);
        if (product) {
            product.title = title;
            return true;
        }
        return false;
    },
    async deleteProduct(id: string) {
        const initialLength = products.length;
        products = products.filter((p) => p.id !== id);
        return products.length < initialLength;
    },
};
