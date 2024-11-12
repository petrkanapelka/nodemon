import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

// Create Express app
const app = express();
const port = process.env.PORT || 5000;

// Mock data
let products = [
    { id: '1', title: 'tomato' },
    { id: '2', title: 'orange' },
];
let addresses = [
    { id: '1', value: 'Nezalejnasti 12' },
    { id: '2', value: 'Selickaga 11' },
];

// Middleware
app.use(express.json());

// Utility functions
const findProductById = (id: string) => products.find((product) => product.id === id);
const findAddressById = (id: string) => addresses.find((address) => address.id === id);

// Routes
app.get('/products', (req: Request, res: Response) => {
    const { title } = req.query;
    const filteredProducts = title
        ? products.filter((p) => p.title.includes(title.toString()))
        : products;
    res.json(filteredProducts);
});

app.post('/products', (req: Request, res: Response) => {
    const newProduct = { id: uuidv4(), title: req.body.title };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.get('/products/:id', (req: Request, res: Response) => {
    const product = findProductById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.sendStatus(404);
    }
});

app.put('/products/:id', (req: Request, res: Response) => {
    const product = findProductById(req.params.id);
    if (product) {
        product.title = req.body.title;
        res.json(product);
    } else {
        res.sendStatus(404);
    }
});

app.delete('/products/:id', (req: Request, res: Response) => {
    const productId = req.params.id;
    const productExists = products.some((p) => p.id === productId);
    if (productExists) {
        products = products.filter((p) => p.id !== productId);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

app.get('/addresses', (req: Request, res: Response) => {
    res.json(addresses);
});

app.get('/addresses/:id', (req: Request, res: Response) => {
    const address = findAddressById(req.params.id);
    if (address) {
        res.json(address);
    } else {
        res.sendStatus(404);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
