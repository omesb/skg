import { buildPage, NextIDs } from "../Pages/PageBuilder";
import { NotFoundPage } from "../Pages/ErrorPages";

let neo4j = require('neo4j-driver');

let driver = neo4j.driver(
    'neo4j://localhost:7687/',
    neo4j.auth.basic('neo4j', 'yolo')
);

export function startSession() {
    return driver.session({
        // database: 'DB'
    });
}

export async function loadPage(id: number | undefined, type: string | undefined) {
    let session = startSession();

    console.log("Loading page "+id);

    let pageInfo =
        (id ? await session.run("match (start) WHERE id(start)=$id return start", {id:id})
            : await session.run("match (start:" + type + ") return start", {}));

    if(pageInfo.records.length > 0) {
        let pageLabels = pageInfo.records[0].get("start").labels;
        id = pageInfo.records[0].get("start").identity.toInt();

        let pageProperties = pageInfo.records[0].get("start").properties;

        let nextIds: NextIDs  = {};
        let pageNext = await session.run("match (start) -[edge]-> (target) WHERE id(start)=$id return edge", {id:id});    
        pageNext.records.forEach((record: any) => {
            let type: string = record.get("edge").type;
            let endId: number = record.get("edge").end.toInt();
            nextIds[type] = endId;
        });

        session.close();

        console.log("Loaded. Labels:", pageLabels, "Properties:", pageProperties, "Next IDs:", nextIds);
        return buildPage(pageLabels, pageProperties, nextIds);
    } else {
        session.close();

        return <NotFoundPage />;
    }
}