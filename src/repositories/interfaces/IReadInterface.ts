export interface IRead<User> {
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<object>;
}
