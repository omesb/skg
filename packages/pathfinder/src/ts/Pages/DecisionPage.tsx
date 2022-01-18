import { Component, ReactElement, useState } from "react";
import { PageProps } from "./Page";

interface DecisionPageProps extends PageProps {
    yesComponent: any; // TODO sane type
    noComponent: any; // TODO sane type
}

export function DecisionPage(props: DecisionPageProps) {
    let [decision, setDecision] = useState<undefined | "yes" | "no">(undefined);

    let yes = () => {
        setDecision("yes");
    };
    let no = () => {
        setDecision("no");
    };

    if(decision == "yes") {
        return props.yesComponent;
    }
    if(decision == "no") {
        return props.noComponent;
    }

    return <div>
        <h1>[Decision] {props.name}</h1>

        Yes or No?

        <button onClick={yes}>Yes</button>
        <button onClick={no}>No</button>
    </div>;
}