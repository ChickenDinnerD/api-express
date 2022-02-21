export interface IRead<T> {
    findAll(): Promise<object[]>;
    findOne(id: string): Promise<object[]>;
}
