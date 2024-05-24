import { Request, Response } from "express";
import { SearchUserUseCase } from "../use-cases/search-user";
import { SearchUserDto } from "../dtos/search-user.dto";

export class UserController {
  constructor(private readonly searchUserUseCase: SearchUserUseCase) {}

  async search(req: Request, res: Response) {
    const dto = SearchUserDto.validate({ term: req.query.q });

    const data = await this.searchUserUseCase.execute(dto);

    return res.status(200).json(data);
  }
}
