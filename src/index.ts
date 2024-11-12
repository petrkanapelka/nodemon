import express, { Request, Response } from 'express';

// create express app
const app = express();

const port = process.env.PORT || 5000;

const products = [{ title: 'tomato' }, { title: 'orange' }];
const addresses = [{ value: 'Nezalejnasti 12' }, { value: 'Selickaga 11' }];

app.get('/products', (req: Request, res: Response) => {
    res.send(products);
});

app.get('/products:productSearchTitle', (req: Request, res: Response) => {
    const productSearchTitle = req.params.productSearchTitle;
    let product = products.find((product) => product.title === productSearchTitle);
    res.send(product);
});

app.get('/addresses', (req: Request, res: Response) => {
    res.send(addresses);
});

// start app
app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`);
});
