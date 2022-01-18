import { buildPage, NextIDs } from "../Pages/PageBuilder";
import { NotFoundPage } from "../Pages/ErrorPages";

export async function loadPage(id: number) {
    let neo4j = require('neo4j-driver');

    let driver = neo4j.driver(
        'neo4j://localhost:7687/',
        neo4j.auth.basic('neo4j', 'yolo')
    );

    let session = driver.session({
        // database: 'DB'
    });

    console.log("Loading page "+id);

    let pageInfo = await session.run("match (start) WHERE id(start)=$id return start", {id:id});

    if(pageInfo.records.length > 0) {
        let pageLabels = pageInfo.records[0].get("start").labels;

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