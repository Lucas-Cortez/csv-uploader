import express, { Express } from "express";
import cors from "cors";
import "express-async-errors";

import { router } from "./routes";
import { errorMiddleware } from "../../app/middlewares/error.middleware";

export class App {
  private readonly app: Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config() {
    this.configureParsers();
    this.configureCORS();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureParsers() {
    this.app.use(express.json());
  }

  private configureRoutes() {
    this.app.use("/api", router);
  }

  private configureCORS() {
    this.app.use(cors());
  }

  private configureErrorHandling() {
    this.app.use(errorMiddleware);
  }

  listen(port: number) {
    this.app.listen(port);
  }
}
