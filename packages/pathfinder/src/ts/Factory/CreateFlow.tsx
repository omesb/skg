import React from "react";
import { Cancel, CloudUpload, Save, SkipNext, SkipPrevious } from "../../../node_modules/@material-ui/icons/index";
import { EditorInterface } from "./EditorInterface";
import { PropertyEditor } from "./PropertyEditor";
import { ReferenceEditor } from "./ReferenceEditor";
import { Instance, Type, Property, Reference, ValueMap } from "./Schema";

type CreateFlowProps = {
    typeNodeID: number;
    editorInterface: EditorInterface
    onCreated: (instance: Instance) => void;
    onAborted: () => void;
};

type CreateFlowStatus = "loading_schema" | "editing" | "creating" | "created" | "aborted";

type CreateFlowState = {
    status: CreateFlowStatus;
    type: Type | undefined;
    instance: Instance | undefined;
    pageIndex: number;
}

export class CreateFlow extends React.Component<CreateFlowProps, CreateFlowState> {
    constructor(props: CreateFlowProps) {
        super(props);
        this.state = {
            status: "loading_schema",
            type: undefined,
            instance: undefined,
            pageIndex: 0
        };
    }

    componentDidMount() {
        this.props.editorInterface.loadType(this.props.typeNodeID).then(type => {
            this.handleTypeLoaded(type);
        });
    }

    handleTypeLoaded(type: Type) {
        this.setState({
            type: type,
            instance: {
                id: undefined,
                propertyValues: {
                    "created": new Date().toISOString()
                },
                referenceValues: {
                    "INSTANCEOF": [type.typeNodeID]
                },
                typeName: type.typeName,
                typeNodeID: type.typeNodeID
            },
            status: "editing"
        });
    }

    setPropertyValue(name: string, value: string) {
        if(!this.state.instance) {
            return;
        }

        let update: any = {};
        update[name] = value;

        let newInstance: Instance = {
            ...this.state.instance,
            propertyValues: {
                ...this.state.instance?.propertyValues,
                ...update
            }
        };

        this.setState({
            instance: newInstance
        });
    }

    setReferenceValue(name: string, value: number[]) {
        if(!this.state.instance) {
            return;
        }

        let update: any = {};
        update[name] = value;

        let newInstance: Instance = {
            ...this.state.instance,
            referenceValues: {
                ...this.state.instance?.referenceValues,
                ...update
            }
        };

        this.setState({
            instance: newInstance
        });
    }

    prevPage() {
        if(this.state.pageIndex > 0) {
            this.setState({
                pageIndex: this.state.pageIndex - 1
            });
        }
    }

    nextPage() {
        if(this.state.pageIndex < this.getLastPage()) {
            this.setState({
                pageIndex: this.state.pageIndex + 1
            });
        }
    }

    getLastPage() {
        if(!this.state.type) {
            return 0;
        }

        let lastPage = this.state.type.properties.length + this.state.type.references.length;
        return lastPage;
    }

    abort() {
        this.setState({
            status: "aborted"
        });

        this.props.onAborted();
    }

    save() {
        if(!this.state.instance) {
            return;
        }

        this.setState({
            status: "creating"
        });

        this.props.editorInterface.saveInstance(this.state.instance).then((newInstance: Instance) => {
            this.handleSaved(newInstance);
        });
    }

    handleSaved(instance: Instance) {
        this.setState({
            status: "created",
            instance: instance
        });

        this.props.onCreated(instance);
    }

    render() {
        if(this.state.status == "loading_schema") {
            return <div>Loading schema...</div>
        } else if(this.state.status == "editing") {
            return this.renderEditing();
        } else if(this.state.status == "creating") {
            return <div>Creating...</div>;
        } else if(this.state.status == "created") {
            return <div>Created!</div>;
        } else if(this.state.status == "aborted") {
            return <div>Aborted!</div>;
        }
    }

    renderEditing() {
        return <div>
            <h1>Creating a { this.state.type?.typeName }</h1>

            { this.renderPageIndexComponent() }

            <div>
                <button onClick={() => this.abort()}><Cancel /></button>
                <button onClick={() => this.prevPage()}><SkipPrevious /></button>
                <button onClick={() => this.nextPage()}><SkipNext /></button>
            </div>
        </div>;
    }

    renderPageIndexComponent() {
        if(!this.state.type) {
            throw new Error("Missing type");
        }

        if(!this.state.instance) {
            throw new Error("Missing instance");
        }

        if(this.state.pageIndex < this.state.type.properties.length) {
            let property: Property = this.state.type.properties[this.state.pageIndex];

            let value = this.state.instance.propertyValues[property.name] || "";            
            let setValue = (newValue: string) => {
                this.setPropertyValue(property.name, newValue);
            };

            return <PropertyEditor property={property} value={value} onChange={setValue} key={property.name} />

        } else if(this.state.pageIndex < this.state.type.properties.length + this.state.type.references.length) {
            let reference: Reference = this.state.type.references[this.state.pageIndex - this.state.type.properties.length];

            let value = this.state.instance.referenceValues[reference.name] || [];
            let setValue = (newValue: number[]) => {
                this.setReferenceValue(reference.name, newValue);
            }

            return <ReferenceEditor reference={reference} value={value} editorInterface={this.props.editorInterface} onChange={setValue} key={reference.name} />
       } else {
           return <div>
               You're done...<br/><br/>

                <button onClick={() => this.save()}><CloudUpload /> Save!</button>

                <br/><br/>
           </div>
       }
    }
}