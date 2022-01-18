import { EditorInterface, SearchResult } from "../Factory/EditorInterface";
import { MockEditorImpl } from "../Factory/MockEditorImpl";
import { Type, Instance, Property, Reference } from "../Factory/Schema";
import { startSession } from "./Neo4jAccessor";

export class Neo4jEditorImpl implements EditorInterface {
    async loadType(typeNodeID: number): Promise<Type> {
        let session = startSession();

        let type = await session.run("MATCH (n) WHERE ID(n)=$id RETURN n", {id: typeNodeID});
        let properties = await session.run("MATCH (n) -[:HAS]-> (p:Property) WHERE ID(n)=$id RETURN p", {id: typeNodeID});
        let references = await session.run("MATCH (n) -[:HAS]-> (r:Reference) -[:REFERENCES]-> (t:Type) WHERE ID(n)=$id RETURN r,t", {id: typeNodeID});

        session.close();

        return {
            typeNodeID: typeNodeID,
            typeName: type.records[0].get("n").properties.name,
            properties: properties.records.map((record: any) => {
                let p = record.get("p");
                let property: Property = {
                    name: p.properties.name,
                    label: p.properties.label || p.properties.name
                }
                return property;
            }),
            references: references.records.map((record: any) => {
                let r = record.get("r");
                let t = record.get("t");

                let reference: Reference = {
                    name: r.properties.name,
                    label: r.properties.label || r.properties.name,
                    targetTypeName: t.properties.name,
                    targetTypeNodeID: t.identity.toInt()
                };
                return reference;
            })
        };
    }

    async search(typeName: string, alwaysIncludeIDs: number[], filter: string): Promise<SearchResult[]> {
        let session = startSession();
        let result = await session.run("MATCH (n:"+typeName+") WHERE n.name CONTAINS $filter OR ID(n) IN $alwaysIncludeIDs RETURN n", {filter: filter, alwaysIncludeIDs: alwaysIncludeIDs});

        console.log(result);

        let mapped = result.records.map((record: any) => {
            return {
                id: record.get("n").identity.toInt(),
                name: record.get("n").properties.name
            };
        });

        console.log(mapped);

        session.close();

        return mapped;
    }
    
    async saveInstance(instance: Instance): Promise<Instance> {
        let properties: string[] = [];
        for(var key in instance.propertyValues) {
            properties.push(key+": $"+key);
        }

        let match = "";
        let ids: number[] = [];
        let create = "create (n:"+instance.typeName+" {"+properties.join(",")+"})";
        let returnStr = " return id(n) as id";

        for(var key in instance.referenceValues) {
            instance.referenceValues[key].forEach((id) => {
                if(ids.indexOf(id) < 0) {
                    ids.push(id);
                    match = match + "match (n"+id+") where id(n"+id+")="+id+" ";
                    create = create + ", (n) -[:"+key+"]-> (n"+id+")"
                }
            });
        }

        let query = match + create + returnStr;
        console.log(query, instance.propertyValues);

        let session = startSession();
        let result = await session.run(query, instance.propertyValues);

        console.log(result);

        session.close();

        let newId = result.records[0].get("id").toInt();
        let newInstance: Instance = {
            ...instance,
            id: newId
        }

        return newInstance;
    }

}