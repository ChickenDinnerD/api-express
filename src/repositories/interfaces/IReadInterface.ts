export interface IRead<User> {
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<any>;
}
