import { User } from "../../domain/entities/user";

interface ICsvUserInput {
  name: string;
  city: string;
  country: string;
  favorite_sport: string;
}

export class CsvUserFactory {
  static create(user: ICsvUserInput) {
    return User.create({
      name: user.name,
      city: user.city,
      country: user.country,
      favoriteSport: user.favorite_sport,
    });
  }
}
