import { Component, ReactElement, useState } from "react";
import { SkipNext } from "../../../node_modules/@material-ui/icons/index";
import { PageProps } from "./Page";

interface InfoPageProps extends PageProps {
    nextComponent: any
}

export function InfoPage(props: InfoPageProps) {
    let [decision, setDecision] = useState<undefined | "next">(undefined);

    if(decision == "next") {
        return props.nextComponent;
    }

    return <div>
        <h1>[Info] {props.name}</h1>

        {props.nextComponent ? 
            <button onClick={() => setDecision("next")}><SkipNext /></button>
            : ""}
    </div>;
}