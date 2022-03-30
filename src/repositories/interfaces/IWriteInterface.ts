export interface IWrite<User> {
    createUser(name: string): Promise<number>;
}
