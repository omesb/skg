export type PageID = string;

export type Page = InfoPage | YesNoPage | BranchPage | SelectOrCreatePage | InputPage;

export type InfoPage = { // Just display the label with a next button
	type: "InfoPage";
	label: string;
	next: PageID;
}

export type YesNoPage = { // Offer a yes / no choice
	type: "YesNoPage";
	label: string;
	yes: PageID;
	no: PageID;
}

export type PageTransition = {
	label: string;
	next: PageID;
	featherIcon?: string;
};

export type BranchPage = { // Offer a selection between multiple transitions
	type: "BranchPage";
	label: string;
	transitions: PageTransition[];
};

export type SelectOrCreatePage = { // Select or create something...
	type: "SelectOrCreatePage";
    label: string;
    selectOrCreateType: string; // Query for that type
	selectPropertyName?: string; // Create properties with that property name when something is selected
	create?: PageID; // When, the user wants to create something, go on with that page, return to this page, when there is no next page (stack)
	next?: PageID; // or go ahead
};

export type InputPage = {
	type: "InputPage";
	label: string;
	inputPropertyName: string; // Input text for that property
	next?: PageID;
};

export type Pages = {
    [pageID: string]: Page
};