import { Request, Response, Router } from 'express';
import { productsRepository, ProductType } from '../repositories/products-repository-db';
import { handleValidationErrors } from '../middleware/validation';
import { validateProductTitle } from '../validation/productValidation';

export const productsRouter = Router({});
productsRouter.get('/', async (req: Request, res: Response) => {
    const { title } = req.query;
    const foundProducts: ProductType[] = await productsRepository.findProducts(title ? title.toString() : null);
    res.send(foundProducts);
});

productsRouter.post('/', validateProductTitle, handleValidationErrors, async (req: Request, res: Response) => {
    const newProduct = await productsRepository.createProduct(req.body.title);
    res.status(201).send(newProduct);
});

productsRouter.get('/:id', async (req: Request, res: Response) => {
    const product = await productsRepository.getProductByID(req.params.id);
    product ? res.json(product) : res.sendStatus(404);
});

productsRouter.put('/:id', validateProductTitle, handleValidationErrors, async (req: Request, res: Response) => {
    const isProductUpdated = await productsRepository.updateProduct(req.params.id, req.body.title);
    if (isProductUpdated) {
        const product = productsRepository.findProducts(req.params.id);
        res.json(product);
    } else {
        res.sendStatus(404);
    }
});

productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const isProductDeleted = await productsRepository.deleteProduct(req.params.id);
    if (isProductDeleted) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});
