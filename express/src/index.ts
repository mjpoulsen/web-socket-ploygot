import express, { Express, Request, Response } from "express";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req: Request, res: Response) => res.send("Hello World!"));

app.listen(3000, () => console.log(`App running on port 3000.`));
