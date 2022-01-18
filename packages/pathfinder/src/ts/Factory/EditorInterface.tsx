import { Instance, Type } from "./Schema";

export type SearchResult = {
    id: number;
    name: string;
}

export interface EditorInterface {
    loadType(typeNodeID: number): Promise<Type>;

    search(typeName: string, alwaysIncludeIDs: number[], filter: string): Promise<SearchResult[]>;

    saveInstance(instance: Instance): Promise<Instance>;
};