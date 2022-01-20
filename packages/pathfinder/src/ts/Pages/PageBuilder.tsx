import { LazyNeo4JPage } from "./LazyNeo4jPage";
import { UnknownTypePage } from "./ErrorPages";
import { FactoryPage } from "./FactoryPage";
import { NavigationPage } from "./NavigationPage";

export type Edge = {
    type: string;
    targetNodeID: number;
    name: string | undefined;
}

export type NextIDs = {
    [type: string]: number
};

export function buildPage(pageLabels: string[], pageProperties: any, edges: Edge[], nextIds: NextIDs) {
    if(pageLabels.indexOf("Decision") >= 0 || pageLabels.indexOf("Info") >= 0 || pageLabels.indexOf("Navigation") >= 0) {
        return <NavigationPage
                    name={pageProperties.name}
                    image={pageProperties.image}
                    link={pageProperties.link}
                    edges={edges} />
    }

    if(pageLabels.indexOf("Factory") >= 0 && nextIds["CREATES"] !== undefined && nextIds["ONCREATED"] !== undefined && nextIds["ONABORTED"] !== undefined) {
        return <FactoryPage
                    typeNodeID={nextIds["CREATES"]}
                    onCreatedComponent={<LazyNeo4JPage id={nextIds["ONCREATED"]} type={undefined} />}
                    onAbortedComponent={<LazyNeo4JPage id={nextIds["ONABORTED"]} type={undefined} />} />
    }

    return <UnknownTypePage />;
}