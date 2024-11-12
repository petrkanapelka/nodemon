import express, { Request, Response } from 'express';

// create express app
const app = express();

const port = process.env.PORT || 5000;

const products = [{ title: 'tomato' }, { title: 'orange' }];
const addresses = [{ value: 'Nezalejnasti 12' }, { value: 'Selickaga 11' }];

app.get('/products', (req: Request, res: Response) => {
    res.send(products);
});

app.get('/addresses', (req: Request, res: Response) => {
    res.send(addresses);
});

// start app
app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`);
});
