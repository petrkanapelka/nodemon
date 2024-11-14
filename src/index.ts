import express, { NextFunction, Request, Response } from 'express';
import { productsRouter } from './routes/product-router';
import { addressesRouter } from './routes/addresses-router';
import { countRequestMiddleware, requestCount } from './middleware/request-counter';
import { runDb } from './repositories/db';

// Create Express app
export const app = express();
const port = process.env.PORT || 5000;

app.use(countRequestMiddleware);
app.use(express.json());
app.use('/products', productsRouter);
app.use('/addresses', addressesRouter);

app.get('/counter', (req: Request, res: Response) => {
    res.json({ requestCount });
});

const startApp = async () => {
    await runDb();
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
};

startApp();

// Start the server
