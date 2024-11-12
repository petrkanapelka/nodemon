import { Request, Response, Router } from 'express';
import { productsRepository } from '../repositories/products-repository';

export const productsRouter = Router({});

productsRouter.get('/', (req: Request, res: Response) => {
    const { title } = req.query;
    const foundProducts = productsRepository.findProducts(title ? title.toString() : null);
    res.send(foundProducts);
});

productsRouter.post('/', (req: Request, res: Response) => {
    const newProduct = productsRepository.createProduct(req.body.title);
    res.status(201).json(newProduct);
});

productsRouter.get('/:id', (req: Request, res: Response) => {
    const product = productsRepository.getProductByID(req.params.id);
    product ? res.json(product) : res.sendStatus(404);
});

productsRouter.put('/:id', (req: Request, res: Response) => {
    const isProductUpdated = productsRepository.updateProduct(req.params.id, req.body.title);
    if (isProductUpdated) {
        const product = productsRepository.findProducts(req.params.id);
        res.json(product);
    } else {
        res.sendStatus(404);
    }
});

productsRouter.delete('/:id', (req: Request, res: Response) => {
    const isProductDeleted = productsRepository.deleteProduct(req.params.id);
    if (isProductDeleted) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});
