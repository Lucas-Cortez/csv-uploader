import { IUseCase } from "../../core/contracts/use-case";
import { UserRepository } from "../../domain/repositories/user.repository";

type SearchUserInput = { term?: string };
type SearchUserOutput = { data: any[] };

export class SearchUserUseCase implements IUseCase<SearchUserInput, SearchUserOutput> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: SearchUserInput): Promise<SearchUserOutput> {
    const data = await this.userRepository.findAll({ term: input.term });

    return { data };
  }
}
