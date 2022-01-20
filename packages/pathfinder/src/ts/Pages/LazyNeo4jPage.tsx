import React from "react";
import ClimbingBoxLoader from "../../../node_modules/react-spinners/ClimbingBoxLoader";
import { loadPage } from "../GraphDB/Neo4jAccessor";

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

        return <div style={{marginLeft:"50px", marginTop:"50px", opacity: 0.2}}>
            <ClimbingBoxLoader />
        </div>
    }
}