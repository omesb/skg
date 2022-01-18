export type Property = {
    name: string;
    label: string;
}

export type Reference = {
    name: string;
    label: string;
    targetTypeNodeID: number;
    targetTypeName: string;
}

export type Type = {
    typeNodeID: number;
    typeName: string;
    properties: Property[];
    references: Reference[];
}

export type ValueMap = {
    [name: string]: string;
}

export type ReferenceMap = {
    [name: string]: number[];
}

export type Instance = {
    id: number | undefined;
    typeNodeID: number;
    typeName: string;
    propertyValues: ValueMap;
    referenceValues: ReferenceMap;
}