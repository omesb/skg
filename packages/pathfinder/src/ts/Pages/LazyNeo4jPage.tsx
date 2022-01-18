import React from "react";
import { Result } from "../../../node_modules/neo4j-driver/types/index";
import { loadPage } from "../GraphDB/Neo4jAccessor";
import { DecisionPage } from "./DecisionPage";
import { Page } from "./Page";

type LazyNeo4JPageProps = {
    id: number | undefined;
    type: string | undefined;
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
        loadPage(this.props.id, this.props.type).then(component => {
            this.setState({
                loadedComponent: component
            });
        });
    }

    render() {
        if(this.state.loadedComponent) {
            return this.state.loadedComponent;
        }

        return <div>
            <h1>[LazyNeo4jPage]</h1>

            Loading page with id={this.props.id} / type={this.props.type}
        </div>
    }
}