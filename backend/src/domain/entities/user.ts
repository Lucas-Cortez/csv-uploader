import { randomUUID } from "crypto";

export interface IUser {
  userId: string;
  name: string;
  city: string;
  country: string;
  favoriteSport: string;
}

export class User implements IUser {
  userId: string;
  name: string;
  city: string;
  country: string;
  favoriteSport: string;

  protected constructor(user: IUser) {
    this.userId = user.userId;
    this.name = user.name;
    this.city = user.city;
    this.country = user.country;
    this.favoriteSport = user.favoriteSport;
  }

  static create(user: Omit<IUser, "userId">) {
    return new User({ ...user, userId: randomUUID() });
  }

  static restore(user: IUser) {
    return new User(user);
  }
}
