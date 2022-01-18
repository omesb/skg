import { DecisionPage } from "./DecisionPage";
import { LazyNeo4JPage } from "./LazyNeo4jPage";
import { NotFoundPage, UnknownTypePage } from "./ErrorPages";
import { InfoPage } from "./InfoPage";

export type NextIDs = {
    [type: string]: number
};

export function buildPage(pageLabels: string[], pageProperties: any, nextIds: NextIDs) {
    if(pageLabels.indexOf("Decision") >= 0 && nextIds["YES"] && nextIds["NO"]) {
        return <DecisionPage 
                    name={pageProperties.name}
                    yesComponent={<LazyNeo4JPage id={nextIds["YES"]} />}
                    noComponent={<LazyNeo4JPage id={nextIds["NO"]} />}
                />
    }

    if(pageLabels.indexOf("Info") >= 0) {
        return <InfoPage
                    name={pageProperties.name} />
    }

    return <UnknownTypePage />;
}