import { User } from "../entity/User";

export class UserDto {
    id: number;
    email: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(user: User) {
        const { id, email, username, createdAt, updatedAt } = user;
        this.id = id;
        this.email = email;
        this.username = username;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}