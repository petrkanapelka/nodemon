import express, { NextFunction, Request, Response } from 'express';

export let requestCount = 0;

export const countRequestMiddleware = (req: Request, res: Response, next: NextFunction) => {
    requestCount++;
    next();
};