import { useState } from "react";
import { CreateFlow } from "../Factory/CreateFlow";
import { Neo4jEditorImpl } from "../GraphDB/Neo4jEditorImpl";

interface FactoryPageProps {
    typeNodeID: number;
    onCreatedComponent: any; // TODO sane type
    onAbortedComponent: any; // TODO sane type
}

export function FactoryPage(props: FactoryPageProps) {
    let [state, setState] = useState<"creating" | "created" | "aborted">("creating");

    if(state == "created") {
        return props.onCreatedComponent;
    }
    if(state == "aborted") {
        return props.onAbortedComponent;
    }

    return <CreateFlow
                typeNodeID={props.typeNodeID}
                editorInterface={new Neo4jEditorImpl()}
                onCreated={() => setState("created")}
                onAborted={() => setState("aborted")}
                />;
}