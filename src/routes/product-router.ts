import express, { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

let products = [
    { id: '1', title: 'tomato' },
    { id: '2', title: 'orange' },
];

const findProductById = (id: string) => products.find((product) => product.id === id);

export const productsRouter = Router({});

productsRouter.get('/', (req: Request, res: Response) => {
    const { title } = req.query;
    const filteredProducts = title ? products.filter((p) => p.title.includes(title.toString())) : products;
    res.json(filteredProducts);
});

productsRouter.post('/', (req: Request, res: Response) => {
    const newProduct = { id: uuidv4(), title: req.body.title };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

productsRouter.get('/:id', (req: Request, res: Response) => {
    const product = findProductById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.sendStatus(404);
    }
});

productsRouter.put('/:id', (req: Request, res: Response) => {
    const product = findProductById(req.params.id);
    if (product) {
        product.title = req.body.title;
        res.json(product);
    } else {
        res.sendStatus(404);
    }
});

productsRouter.delete('/:id', (req: Request, res: Response) => {
    const productId = req.params.id;
    const productExists = products.some((p) => p.id === productId);
    if (productExists) {
        products = products.filter((p) => p.id !== productId);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});
