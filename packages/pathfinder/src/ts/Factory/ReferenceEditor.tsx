import React from "react";
import { AddCircle, Create, Filter, Search, Visibility } from "../../../node_modules/@material-ui/icons/index";
import { CreateFlow } from "./CreateFlow";
import { EditorInterface, SearchResult } from "./EditorInterface";
import { Instance, Reference } from "./Schema";

type ReferenceEditorProps = {
    reference: Reference;
    value: number[];
    editorInterface: EditorInterface
    onChange: (newValue: number[]) => void;
};

type ReferenceEditorQuery = {
    filter: string;
    alwaysIncludedIDs: number[];
}

type ReferenceEditorState = {
    filter: string;
    searchNext: ReferenceEditorQuery | undefined;
    searchInProgress: ReferenceEditorQuery | undefined;
    searchReady: ReferenceEditorQuery | undefined;
    searchResults: SearchResult[];
    creating: boolean;
}

export class ReferenceEditor extends React.Component<ReferenceEditorProps, ReferenceEditorState> {
    constructor(props: ReferenceEditorProps) {
        super(props);

        let initialFilter = "";
        let initialSearch: ReferenceEditorQuery = {
            filter: initialFilter,
            alwaysIncludedIDs: this.props.value
        };

        this.state = {
            filter: initialFilter,
            searchInProgress: initialSearch,
            searchReady: undefined,
            searchNext: undefined,
            searchResults: [],
            creating: false
        };

        this.performSearch(initialSearch);
    }

    setFilter(newFilter: string) {
        this.setWantedQuery({
            filter: newFilter,
            alwaysIncludedIDs: this.props.value
        });
    }

    setWantedQuery(query: ReferenceEditorQuery) {
        if(this.state.searchInProgress) {
            if(this.isDifferentQuery(query, this.state.searchInProgress)) {
                this.setState({
                    searchNext: query,
                    filter: query.filter
                });            
            }
        } else {
            if(this.isDifferentQuery(query, this.state.searchReady)) {
                this.setState({
                    searchInProgress: query,
                    filter: query.filter
                });
                this.performSearch(query);
            }
        }
    }

    isDifferentQuery(newQuery: ReferenceEditorQuery, knownQuery: ReferenceEditorQuery | undefined) {
        if(!knownQuery) {
            return true;
        }

        return newQuery.filter != knownQuery.filter 
            || newQuery.alwaysIncludedIDs.toString() != knownQuery.alwaysIncludedIDs.toString();
    }

    performSearch(query: ReferenceEditorQuery) {
        this.props.editorInterface.search(this.props.reference.targetTypeName, query.alwaysIncludedIDs, query.filter).then((results: SearchResult[]) => {
            this.handleSearchReady(results);
        });
    }

    handleSearchReady(results: SearchResult[]) {
        let nextSearch = this.state.searchNext;

        this.setState({
            searchInProgress: nextSearch,
            searchNext: undefined,
            searchReady: this.state.searchInProgress,
            searchResults: results
        });

        if(nextSearch) {
            this.performSearch(nextSearch);
        }
    }

    toggle(searchResult: SearchResult) {
        if(this.props.value.indexOf(searchResult.id) >= 0) {
            this.setValue( this.props.value.filter(value => value != searchResult.id) );
        } else {
            this.setValue( [ ...this.props.value, searchResult.id ]);
        }
    }

    setValue(ids: number[]) {
        this.props.onChange(ids);
    }

    startCreateFlow() {
        this.setState({
            creating: true
        });
    }

    handleCreateFlowReady(instance: Instance) {
        this.setState({
            creating: false
        });

        this.toggle({
            id: instance.id || 0,
            name: instance.propertyValues.name
        });

        this.setFilter(this.state.filter);
    }

    handleCreateFlowAborted() {
        this.setState({
            creating: false
        });
    }

    render() {
        if(this.state.creating) {
            return <div style={{border: "solid #ddd 2px", padding: "10px", margin: "10px"}}>
                Nested create flow:

                 <CreateFlow
                     typeNodeID={this.props.reference.targetTypeNodeID}
                     editorInterface={this.props.editorInterface}
                     onCreated={(instance: Instance) => this.handleCreateFlowReady(instance)}
                     onAborted={() => this.handleCreateFlowAborted()} />
                </div>
        }


        return (<div>
            <h2>Selecting {this.props.reference.label} (of type {this.props.reference.targetTypeName})</h2>

            <div>
                <Search />
                <input value={this.state.filter} onChange={(event) => this.setFilter(event.target.value)} />
            </div>

            {
                this.state.searchInProgress
            ? <p>Searching...</p>
            : <div>
                <div>{
                        this.state.searchResults.map(
                            (searchResult: SearchResult) =>
                                (<div onClick={() => this.toggle(searchResult)}
                                    style={{cursor: "pointer", background: (this.props.value.indexOf(searchResult.id) >= 0 ? "#8f8" : "#ddd") }}
                                    key={searchResult.id}>
                                        { searchResult.name }
                                </div>)
                        )
                }</div>
            </div> }

            <p>
                <button onClick={() => this.startCreateFlow()}>Not found? Create! <AddCircle /></button>
            </p>

            <p><Visibility /> Note: This input will be saved and visible to others.</p>
        </div>);
    }
}