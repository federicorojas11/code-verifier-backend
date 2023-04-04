import { User } from "../interfaces/user.interface";

export type UserResponse = {
      users: User[];
      totalPages: number;
      currentPage: number;
};
