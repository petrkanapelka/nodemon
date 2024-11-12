import express from 'express';
import { productsRouter } from './routes/product-router';
import { addressesRouter } from './routes/addresses-router';

// Create Express app
export const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/products', productsRouter);
app.use('/addresses', addressesRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
