import { Request, Response, Router } from 'express';

let addresses = [
    { id: '1', value: 'Nezalejnasti 12' },
    { id: '2', value: 'Selickaga 11' },
];

const findAddressById = (id: string) => addresses.find((address) => address.id === id);

// Routes

export const addressesRouter = Router({});

addressesRouter.get('/', (req: Request, res: Response) => {
    res.json(addresses);
});

addressesRouter.get('/:id', (req: Request, res: Response) => {
    const address = findAddressById(req.params.id);
    if (address) {
        res.json(address);
    } else {
        res.sendStatus(404);
    }
});
