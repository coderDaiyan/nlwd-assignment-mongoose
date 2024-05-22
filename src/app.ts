import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import orderRouter from './app/modules/Orders/order.route';
import productRouter from './app/modules/Products/product.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
