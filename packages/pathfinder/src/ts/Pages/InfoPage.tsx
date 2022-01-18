import { Component, ReactElement, useState } from "react";
import { PageProps } from "./Page";

interface InfoPageProps extends PageProps {
}

export function InfoPage(props: InfoPageProps) {
    return <div>
        <h1>[Info] {props.name}</h1>
    </div>;
}