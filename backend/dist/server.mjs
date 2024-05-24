var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/utils/env.ts
import { z } from "zod";
import "dotenv/config";
var Stage = /* @__PURE__ */ ((Stage2) => {
  Stage2["DEVELOPMENT"] = "development";
  Stage2["PRODUCTION"] = "production";
  return Stage2;
})(Stage || {});
var envSchema = z.object({
  NODE_ENV: z.nativeEnum(Stage).default("development" /* DEVELOPMENT */),
  PORT: z.coerce.number().default(3e3),
  DATABASE_URL: z.string()
});
var env = envSchema.parse(process.env);

// src/infra/http/app.ts
import express from "express";
import cors from "cors";
import "express-async-errors";

// src/infra/http/routes.ts
import { Router as Router3 } from "express";

// src/app/routes/file.routes.ts
import { Router } from "express";
import multer from "multer";

// src/app/controllers/file.controller.ts
var FileController = class {
  constructor(uploadFileUseCase2) {
    this.uploadFileUseCase = uploadFileUseCase2;
  }
  uploadFile(req, res) {
    return __async(this, null, function* () {
      const data = yield this.uploadFileUseCase.execute({ file: req.file });
      return res.status(200).json(data);
    });
  }
};

// src/app/errors/app-error.ts
var AppError = class extends Error {
  constructor({ statusCode, message }) {
    super(message);
    this.statusCode = statusCode;
  }
};

// src/app/services/csv-to-json-converter.service.ts
var CsvToJsonConverterService = class {
  constructor(parser) {
    this.parser = parser;
  }
  convert(csvTextContent, validator) {
    return new Promise((resolve, reject) => {
      try {
        this.parser.parse(csvTextContent, {
          header: true,
          complete: (results) => {
            if (validator)
              validator(results.data);
            resolve(results.data);
          },
          error: (error) => reject(error)
        });
      } catch (error) {
        throw new AppError({
          statusCode: 500,
          message: "An error occurred while parsing the CSV file, the file must contain valid data(name, city, country, favorite_sport)."
        });
      }
    });
  }
};

// src/domain/entities/user.ts
import { randomUUID } from "crypto";
var User = class _User {
  constructor(user) {
    this.userId = user.userId;
    this.name = user.name;
    this.city = user.city;
    this.country = user.country;
    this.favoriteSport = user.favoriteSport;
  }
  static create(user) {
    return new _User(__spreadProps(__spreadValues({}, user), { userId: randomUUID() }));
  }
  static restore(user) {
    return new _User(user);
  }
};

// src/app/factories/csv-user.factory.ts
var CsvUserFactory = class {
  static create(user) {
    return User.create({
      name: user.name,
      city: user.city,
      country: user.country,
      favoriteSport: user.favorite_sport
    });
  }
};

// src/app/dtos/csv-user.dto.ts
import { z as z2 } from "zod";

// src/utils/helpers/validate-schema.ts
function validateSchema(schema) {
  return (data) => {
    const result = schema.safeParse(data);
    if (!result.success)
      throw new AppError({ message: result.error.message, statusCode: 500 });
    return result.data;
  };
}

// src/app/dtos/csv-user.dto.ts
var CsvUsersDto;
((CsvUsersDto2) => {
  CsvUsersDto2.schema = z2.array(
    z2.object({
      name: z2.string(),
      city: z2.string(),
      country: z2.string(),
      favorite_sport: z2.string()
    })
  );
  CsvUsersDto2.validate = validateSchema(CsvUsersDto2.schema);
})(CsvUsersDto || (CsvUsersDto = {}));

// src/app/use-cases/upload-file.ts
var UploadFileUseCase = class {
  constructor(userRepository2, csvToJsonConverterService2) {
    this.userRepository = userRepository2;
    this.csvToJsonConverterService = csvToJsonConverterService2;
  }
  execute(input) {
    return __async(this, null, function* () {
      if (!input.file)
        throw new AppError({ statusCode: 400, message: "File not found" });
      const csvTextContent = input.file.buffer.toString("utf-8");
      const convertedData = yield this.csvToJsonConverterService.convert(
        csvTextContent,
        CsvUsersDto.validate
      );
      const data = convertedData.map((user) => CsvUserFactory.create(user));
      yield this.userRepository.createMany(data);
      return { message: "The file was uploaded successfully." };
    });
  }
};

// src/infra/db/drizzle/config/db.ts
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
var sqlite = new Database(env.DATABASE_URL);
var db = drizzle(sqlite, { logger: env.NODE_ENV === "development" /* DEVELOPMENT */ });

// src/infra/db/drizzle/repositories/drizzle-user.repository.ts
import { like, or } from "drizzle-orm";

// drizzle/schema.ts
import { randomUUID as randomUUID2 } from "crypto";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
var usersTable = sqliteTable("users", {
  userId: text("userId").primaryKey().$defaultFn(() => randomUUID2()),
  name: text("name").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  favoriteSport: text("favoriteSport").notNull()
});

// src/infra/db/drizzle/repositories/drizzle-user.repository.ts
var DrizzleUserRepository = class {
  constructor(db2) {
    this.db = db2;
  }
  createMany(users) {
    return __async(this, null, function* () {
      yield this.db.insert(usersTable).values(users);
    });
  }
  findAll(whereOptions) {
    return __async(this, null, function* () {
      const query = this.db.select().from(usersTable).$dynamic();
      if (whereOptions.term) {
        query.where(
          or(
            like(usersTable.name, `%${whereOptions.term}%`),
            like(usersTable.city, `%${whereOptions.term}%`),
            like(usersTable.country, `%${whereOptions.term}%`),
            like(usersTable.favoriteSport, `%${whereOptions.term}%`)
          )
        );
      }
      const data = yield query;
      return data.map((user) => User.restore(user));
    });
  }
};

// src/app/dtos/search-user.dto.ts
import { z as z3 } from "zod";
var SearchUserDto;
((SearchUserDto2) => {
  SearchUserDto2.schema = z3.object({
    term: z3.string().optional()
  });
  SearchUserDto2.validate = validateSchema(SearchUserDto2.schema);
})(SearchUserDto || (SearchUserDto = {}));

// src/app/controllers/user.controller.ts
var UserController = class {
  constructor(searchUserUseCase2) {
    this.searchUserUseCase = searchUserUseCase2;
  }
  search(req, res) {
    return __async(this, null, function* () {
      const dto = SearchUserDto.validate({ term: req.query.q });
      const data = yield this.searchUserUseCase.execute(dto);
      return res.status(200).json(data);
    });
  }
};

// src/app/use-cases/search-user.ts
var sleep = (delay) => new Promise((res) => setTimeout(res, delay));
var SearchUserUseCase = class {
  constructor(userRepository2) {
    this.userRepository = userRepository2;
  }
  execute(input) {
    return __async(this, null, function* () {
      const data = yield this.userRepository.findAll({ term: input.term });
      yield sleep(2e3);
      return { data };
    });
  }
};

// src/app/modules/user.module.ts
var userRepository = new DrizzleUserRepository(db);
var searchUserUseCase = new SearchUserUseCase(userRepository);
var userController = new UserController(searchUserUseCase);

// src/app/modules/file.module.ts
import Papa from "papaparse";
var csvToJsonConverterService = new CsvToJsonConverterService(Papa);
var uploadFileUseCase = new UploadFileUseCase(userRepository, csvToJsonConverterService);
var fileController = new FileController(uploadFileUseCase);

// src/app/routes/file.routes.ts
var fileRoutes = Router();
var upload = multer({
  storage: multer.memoryStorage(),
  limits: { files: 1 },
  fileFilter(req, file, callback) {
    if (file.mimetype !== "text/csv")
      return callback(new AppError({ message: "Please upload a csv file", statusCode: 500 }));
    callback(null, true);
  }
});
fileRoutes.post("/", upload.single("file"), (req, res) => __async(void 0, null, function* () {
  return fileController.uploadFile(req, res);
}));

// src/app/routes/user.routes.ts
import { Router as Router2 } from "express";
var userRoutes = Router2();
userRoutes.get("/", (req, res) => userController.search(req, res));

// src/infra/http/routes.ts
var router = Router3();
router.use("/files", fileRoutes);
router.use("/users", userRoutes);

// src/app/middlewares/error.middleware.ts
var errorMiddleware = (error, _, response, __) => {
  console.log(error);
  if (error instanceof AppError)
    return response.status(error.statusCode).json({ statusCode: error.statusCode, message: error.message });
  return response.status(500).json({ statusCode: 500, message: "internal server error" });
};

// src/infra/http/app.ts
var App = class {
  constructor() {
    this.app = express();
    this.config();
  }
  config() {
    this.configureParsers();
    this.configureCORS();
    this.configureRoutes();
    this.configureErrorHandling();
  }
  configureParsers() {
    this.app.use(express.json());
  }
  configureRoutes() {
    this.app.use("/api", router);
  }
  configureCORS() {
    this.app.use(cors());
  }
  configureErrorHandling() {
    this.app.use(errorMiddleware);
  }
  listen(port) {
    this.app.listen(port);
  }
};

// src/server.ts
var app = new App();
app.listen(env.PORT);
//# sourceMappingURL=server.mjs.map