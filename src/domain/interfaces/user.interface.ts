import { Kata } from "./katas.interface";

export interface User {
      name: string;
      email: string;
      age: string;
      password?: string;
      katas: string[];
      _id?: string | undefined;
}
