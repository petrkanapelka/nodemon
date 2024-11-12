import { v4 as uuidv4 } from 'uuid';

let products = [
    { id: '1', title: 'tomato' },
    { id: '2', title: 'orange' },
];

export const productsRepository = {
    findProducts(title: string | null) {
        return title ? products.filter((p) => p.title.includes(title.toString())) : products;
    },
    createProduct(title: string) {
        const newProduct = { id: uuidv4(), title };
        return products.push(newProduct);
    },
    getProductByID(id: string) {
        return products.find((product) => product.id === id);
    },
    updateProduct(id: string, title: string) {
        const product = products.find((product) => product.id === id);
        if (product) {
            product.title = title;
            return true;
        }
        return false;
    },
    deleteProduct(id: string) {
        const initialLength = products.length;
        products = products.filter((p) => p.id !== id);
        return products.length < initialLength;
    },
};
