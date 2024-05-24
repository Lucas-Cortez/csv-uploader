"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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
var import_zod = require("zod");
var import_config = require("dotenv/config");
var Stage = /* @__PURE__ */ ((Stage2) => {
  Stage2["DEVELOPMENT"] = "development";
  Stage2["PRODUCTION"] = "production";
  return Stage2;
})(Stage || {});
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.nativeEnum(Stage).default("development" /* DEVELOPMENT */),
  PORT: import_zod.z.coerce.number().default(3e3),
  DATABASE_URL: import_zod.z.string()
});
var env = envSchema.parse(process.env);

// src/infra/http/app.ts
var import_express4 = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_express_async_errors = require("express-async-errors");

// src/infra/http/routes.ts
var import_express3 = require("express");

// src/app/routes/file.routes.ts
var import_express = require("express");
var import_multer = __toESM(require("multer"));

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
var import_crypto = require("crypto");
var User = class _User {
  constructor(user) {
    this.userId = user.userId;
    this.name = user.name;
    this.city = user.city;
    this.country = user.country;
    this.favoriteSport = user.favoriteSport;
  }
  static create(user) {
    return new _User(__spreadProps(__spreadValues({}, user), { userId: (0, import_crypto.randomUUID)() }));
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
var import_zod2 = require("zod");

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
  CsvUsersDto2.schema = import_zod2.z.array(
    import_zod2.z.object({
      name: import_zod2.z.string(),
      city: import_zod2.z.string(),
      country: import_zod2.z.string(),
      favorite_sport: import_zod2.z.string()
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
var import_better_sqlite3 = require("drizzle-orm/better-sqlite3");
var import_better_sqlite32 = __toESM(require("better-sqlite3"));
var sqlite = new import_better_sqlite32.default(env.DATABASE_URL);
var db = (0, import_better_sqlite3.drizzle)(sqlite, { logger: env.NODE_ENV === "development" /* DEVELOPMENT */ });

// src/infra/db/drizzle/repositories/drizzle-user.repository.ts
var import_drizzle_orm = require("drizzle-orm");

// drizzle/schema.ts
var import_crypto2 = require("crypto");
var import_sqlite_core = require("drizzle-orm/sqlite-core");
var usersTable = (0, import_sqlite_core.sqliteTable)("users", {
  userId: (0, import_sqlite_core.text)("userId").primaryKey().$defaultFn(() => (0, import_crypto2.randomUUID)()),
  name: (0, import_sqlite_core.text)("name").notNull(),
  city: (0, import_sqlite_core.text)("city").notNull(),
  country: (0, import_sqlite_core.text)("country").notNull(),
  favoriteSport: (0, import_sqlite_core.text)("favoriteSport").notNull()
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
          (0, import_drizzle_orm.or)(
            (0, import_drizzle_orm.like)(usersTable.name, `%${whereOptions.term}%`),
            (0, import_drizzle_orm.like)(usersTable.city, `%${whereOptions.term}%`),
            (0, import_drizzle_orm.like)(usersTable.country, `%${whereOptions.term}%`),
            (0, import_drizzle_orm.like)(usersTable.favoriteSport, `%${whereOptions.term}%`)
          )
        );
      }
      const data = yield query;
      return data.map((user) => User.restore(user));
    });
  }
};

// src/app/dtos/search-user.dto.ts
var import_zod3 = require("zod");
var SearchUserDto;
((SearchUserDto2) => {
  SearchUserDto2.schema = import_zod3.z.object({
    term: import_zod3.z.string().optional()
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
var import_papaparse = __toESM(require("papaparse"));
var csvToJsonConverterService = new CsvToJsonConverterService(import_papaparse.default);
var uploadFileUseCase = new UploadFileUseCase(userRepository, csvToJsonConverterService);
var fileController = new FileController(uploadFileUseCase);

// src/app/routes/file.routes.ts
var fileRoutes = (0, import_express.Router)();
var upload = (0, import_multer.default)({
  storage: import_multer.default.memoryStorage(),
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
var import_express2 = require("express");
var userRoutes = (0, import_express2.Router)();
userRoutes.get("/", (req, res) => userController.search(req, res));

// src/infra/http/routes.ts
var router = (0, import_express3.Router)();
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
    this.app = (0, import_express4.default)();
    this.config();
  }
  config() {
    this.configureParsers();
    this.configureCORS();
    this.configureRoutes();
    this.configureErrorHandling();
  }
  configureParsers() {
    this.app.use(import_express4.default.json());
  }
  configureRoutes() {
    this.app.use("/api", router);
  }
  configureCORS() {
    this.app.use((0, import_cors.default)());
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
//# sourceMappingURL=server.js.map