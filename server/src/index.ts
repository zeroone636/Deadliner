import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: "Здарова кент!",
  })
});

app.listen(PORT, () => {
    console.log(`Start server on: http://localhost:${PORT}`)
});