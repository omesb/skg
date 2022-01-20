import {  useState } from "react";
import { SkipNext, ThumbDown, ThumbUp } from "../../../node_modules/@material-ui/icons/index";
import { LazyNeo4JPage } from "./LazyNeo4jPage";
import { PageProps } from "./Page";
import { Edge } from "./PageBuilder";

interface NavigationPageProps extends PageProps {
    link: string | undefined;
    image: string | undefined;
    edges: Edge[];
}

export function NavigationPage(props: NavigationPageProps) {
    let [navigatedPageID, navigateToPageID] = useState<undefined | number>(undefined);

    if(navigatedPageID !== undefined) {
        return <LazyNeo4JPage id={navigatedPageID} type={undefined} />
    }

    let buildEdgeComponent = (edge: Edge) => {
        let defaultTexts: any = {
            "YES": "Yes",
            "NO": "No",
            "NEXT": "Next",
            "LINK": "Link"
        };

        let icons: any = {
            "YES": <ThumbUp />,
            "NO": <ThumbDown />,
            "NEXT": <SkipNext />,
            "LINK": <SkipNext />
        }

        return <button onClick={() => navigateToPageID(edge.targetNodeID)} style={{display:"block"}}>
            {icons[edge.type] || ""} 
            {edge.name || defaultTexts[edge.type]}
        </button>;
    };

    return <div>
        <h1>{props.name}</h1>

        { props.image ? <div><img src={props.image} style={{maxWidth:"100%"}} /></div> : "" }

        { props.link ? <div><a target="_blank" href={props.link}>{props.link}</a></div> : "" }

        <div>
            { props.edges.map(buildEdgeComponent) }
        </div>
    </div>;
}