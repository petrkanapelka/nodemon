import express, { Request, Response } from 'express';
import { v4 } from 'uuid';

// create express app
const app = express();

const port = process.env.PORT || 5000;

let products = [
    { id: '1', title: 'tomato' },
    { id: '2', title: 'orange' },
];
let addresses = [
    { id: '1', value: 'Nezalejnasti 12' },
    { id: '2', value: 'Selickaga 11' },
];

app.use(express.json());

app.get('/products', (req: Request, res: Response) => {
    if (req.query.title) {
        const title = req.query.title.toString();
        res.send(products.filter((p) => p.title.includes(title)));
    } else {
        res.send(products);
    }
});

app.post('/products', (req: Request, res: Response) => {
    const newProduct = { id: v4(), title: req.body.title };
    products.push(newProduct);
    res.status(201).send(newProduct);
});

app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    let product = products.find((product) => product.id === id);
    if (product) {
        res.send(product);
    } else {
        res.send(404);
    }
});

app.put('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    let product = products.find((product) => product.id === id);
    if (product) {
        product.title = req.body.title;
        res.send(product);
    } else {
        res.send(404);
    }
});

app.delete('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const product = products.find((p) => p.id === id);
    if (product) {
        products = products.filter((product) => product.id !== id);
        res.send(products);
        res.send(204);
    } else {
        res.send(404);
    }
});

app.get('/addresses', (req: Request, res: Response) => {
    res.send(addresses);
});

app.get('/addresses/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    let address = addresses.find((address) => address.id === id);
    if (address) {
        res.send(address);
    } else {
        res.send(404);
    }
});

// start app
app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`);
});
