export function loadPage(id: number): void {
    let neo4j = require('neo4j-driver');

    let driver = neo4j.driver(
        'neo4j://localhost:7687/',
        neo4j.auth.basic('neo4j', 'yolo')
    );

    let session = driver.session({
        // database: 'DB'
    });

    session
        .run('match (start) -[edge]-> (target) WHERE id(start)=$id return edge, target', {
            id: id
        })
        .subscribe({
            onKeys: (keys: any) => {
                console.log("keys:" + keys)
            },
            onNext: (record: any) => {
                console.log(record);
                console.log(record.get("edge").type+" leads to "+record.get("target").identity.toInt());
            },
            onCompleted: () => {
                console.log("Ready");
                session.close() // returns a Promise
            },
            onError: (error: any) => {
                console.log(error)
            }
        });
}