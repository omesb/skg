import { Property } from "./Schema";

type PropertyEditorProps = {
    property: Property;
    value: string;
    onChange: (newValue: string) => void;
};

export function PropertyEditor(props: PropertyEditorProps) {
    return <div>
            <h2>Entering {props.property.label}</h2>

            <input value={props.value} onChange={(event) => { props.onChange(event.target.value) }} />

            <p>Note: This input will be saved and visible to others.</p>
        </div>;
}