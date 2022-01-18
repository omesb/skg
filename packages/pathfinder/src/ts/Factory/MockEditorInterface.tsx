import { EditorInterface, SearchResult } from "./EditorInterface";
import { Type, Instance } from "./Schema";

export class MockEditorInterface implements EditorInterface {
    async loadType(typeNodeID: number): Promise<Type> {
        return {
            typeNodeID: typeNodeID,
            typeName: "Person",
            properties: [
                {
                    name: "firstname",
                    label: "First name"
                },
                {
                    name: "lastname",
                    label: "Last name"
                }
            ],
            references: [
                {
                    name: "spouse",
                    label: "Spouse",
                    targetTypeName: "Person",
                    targetTypeNodeID: 1
                },
                {
                    name: "friend",
                    label: "Friend",
                    targetTypeName: "Person",
                    targetTypeNodeID: 1
                }
            ]
        }
    }

    async search(typeName: string, alwaysIncludeIDs: number[], filter: string): Promise<SearchResult[]> {
        let searchResults: SearchResult[] = [{
            id: 1,
            name: "Object #1"
        }, {
            id: 2,
            name: "Object #2"
        }, {
            id: 3,
            name: "Object #3"
        }];

        return new Promise((resolve, reject) => {
            window.setTimeout(() => resolve(searchResults), 1000);
        });
    }

    async saveInstance(instance: Instance): Promise<Instance> {
        console.log("saveInstance", instance);

        let newID = 5;
        return {
            ...instance,
            id: newID
        };
    }
}