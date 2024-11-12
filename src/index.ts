import express, { NextFunction, Request, Response } from 'express';
import { productsRouter } from './routes/product-router';
import { addressesRouter } from './routes/addresses-router';

// Create Express app
export const app = express();
const port = process.env.PORT || 5000;

let count = 0;

const counterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    count++;
    next();
};

app.use(counterMiddleware);
app.use(express.json());
app.use('/products', productsRouter);
app.use('/addresses', addressesRouter);

app.get('/counter', (req: Request, res: Response) => {
    res.json({ count });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
