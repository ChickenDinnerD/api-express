export interface IWrite<T> {
    createUser(name: string): Promise<[number, number]>;
}
