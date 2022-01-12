import React from "react";
import { loadPage } from "../GraphDB/Neo4jAccessor";
import { DecisionPage } from "./DecisionPage";
import { Page } from "./Page";

export interface LazyNeo4JPageProps {
    id: number;
}

export interface LazyNeo4JPageState {
    loadedComponent: any; // TODO sane type
}

export class LazyNeo4JPage extends React.Component<LazyNeo4JPageProps, LazyNeo4JPageState> {
    constructor(props: LazyNeo4JPageProps) {
        super(props);
        this.state = {
            loadedComponent: undefined
        };
    }

    componentDidMount() {
        // TODO query graph
        window.setTimeout(() => {
            this.setState({
                loadedComponent: <DecisionPage
                                    name="Want some cookies?"
                                    yesComponent={<div>Here you are! (:) (:) (:) (:) (:)</div>}
                                    noComponent={<LazyNeo4JPage id={2} />} />
            });
        }, 1000);

        loadPage(this.props.id);
    }

    render() {
        if(this.state.loadedComponent) {
            return this.state.loadedComponent;
        }

        return "Loading... (id=" + this.props.id + ")";
    }
}