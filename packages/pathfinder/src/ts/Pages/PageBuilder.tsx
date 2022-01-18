import { DecisionPage } from "./DecisionPage";
import { LazyNeo4JPage } from "./LazyNeo4jPage";
import { UnknownTypePage } from "./ErrorPages";
import { InfoPage } from "./InfoPage";
import { FactoryPage } from "./FactoryPage";

export type NextIDs = {
    [type: string]: number
};

export function buildPage(pageLabels: string[], pageProperties: any, nextIds: NextIDs) {
    if(pageLabels.indexOf("Decision") >= 0 && nextIds["YES"] !== undefined && nextIds["NO"] !== undefined) {
        return <DecisionPage 
                    name={pageProperties.name}
                    yesComponent={<LazyNeo4JPage id={nextIds["YES"]} type={undefined} />}
                    noComponent={<LazyNeo4JPage id={nextIds["NO"]} type={undefined} />}
                />
    }

    if(pageLabels.indexOf("Info") >= 0) {
        return <InfoPage
                    name={pageProperties.name}
                    nextComponent={nextIds["NEXT"] ? <LazyNeo4JPage id={nextIds["NEXT"]} type={undefined} /> : undefined}/>
    }

    if(pageLabels.indexOf("Factory") >= 0 && nextIds["CREATES"] !== undefined && nextIds["ONCREATED"] !== undefined && nextIds["ONABORTED"] !== undefined) {
        return <FactoryPage
                    typeNodeID={nextIds["CREATES"]}
                    onCreatedComponent={<LazyNeo4JPage id={nextIds["ONCREATED"]} type={undefined} />}
                    onAbortedComponent={<LazyNeo4JPage id={nextIds["ONABORTED"]} type={undefined} />} />
    }

    return <UnknownTypePage />;
}