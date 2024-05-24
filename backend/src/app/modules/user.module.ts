import { db } from "../../infra/db/drizzle/config/db";
import { DrizzleUserRepository } from "../../infra/db/drizzle/repositories/drizzle-user.repository";
import { UserController } from "../controllers/user.controller";
import { SearchUserUseCase } from "../use-cases/search-user";

const userRepository = new DrizzleUserRepository(db);

const searchUserUseCase = new SearchUserUseCase(userRepository);

const userController = new UserController(searchUserUseCase);

export { userController, searchUserUseCase, userRepository };
