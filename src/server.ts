import express from "express";
import { categoriesRoutes } from "./routes/categories.routes";

const app = express();

app.use(express.json());

app.use("/categories", categoriesRoutes); // << puting the path here for no understandable reason

app.listen(3333, () => console.log("Server is running!!!"));