import pageRenderer from "./PageRenderer";

type SearchResult = {
    uri: string;

    label: string;

    featherIcon?: string;
};

export interface IPageController {
    gotoPage(pageID: string): void;

    search(typeName: string, query: string, alwaysIncludeUris: string[]): SearchResult[];

    pushAndCreate(typeName: string, pageID: string): void;

    addLiteralProperty(propertyName: string, value: string): void;

    addReferenceProperty(propertyName: string, uriReference: string): void;

    popAndCommit(): void;
}

class PageController implements IPageController {
    private pageStack: string[] = [""];
    private createIDStack: string[] = [];
    private commitStack: string[] = [];

    gotoPage(pageID: string): void {
        this.pageStack.pop();
        this.pageStack.push(pageID);

        pageRenderer.render(pageID, this);
    }

    search(typeName: string, query: string, alwaysIncludeUris: string[]): SearchResult[] {
        // TODO Persistenz anbinden, richtig suchen

        var results:  SearchResult[] = [];

        if(query) {
            results.push({
                label: query,
                uri: query,
                featherIcon: "box"
            });
        } else {
            results.push({
                label: "Since this is a mock for the search, it will just return what you typed and not query for " + typeName,
                uri: "Nothing",
                featherIcon: "alert-triangle"
            });
        }

        alwaysIncludeUris.forEach(uri => {
            if(uri != query) {
                results.push({
                    label: uri,
                    uri: uri,
                    featherIcon: "box"
                });
            }
        });

        return results;
    }

    pushAndCreate(typeName: string, pageID: string): void {
        this.createIDStack.push(this.generateID(typeName));
        this.pageStack.push("");
        // TODO Creator, creation date
        this.commitStack.push("# Some info about the creator and the creation date here\n");

        this.gotoPage(pageID);
    }

    private generateID(typeName: string): string {
        // TODO geiler
        var shortTypeName = typeName.substring( Math.max(0, Math.max(typeName.lastIndexOf("#"), typeName.lastIndexOf("/"))) );

        return shortTypeName + "#" + new Date().getTime();
    }

    addLiteralProperty(propertyName: string, value: string): void {
        // TODO Persistenzschicht anbinden

        this.commitStack.push(this.commitStack.pop() + this.peekID() + " " + propertyName + " \"" + value + "\"\n");
    }

    addReferenceProperty(propertyName: string, uriReference: string): void {
        // TODO Persistenzschicht anbinden

        this.commitStack.push(this.commitStack.pop() + this.peekID() + " " + propertyName + " <" + uriReference + ">\n");
    }

    private peekID(): string {
        return this.createIDStack[this.createIDStack.length - 1];
    }

    popAndCommit(): void {
        if(this.pageStack.length == 0) {
            throw new Error("Can't pop empty stack");
        }

        // TODO Persistenzschicht anbinden
        window.alert("I would commit\n\n" + this.commitStack.pop());

        this.createIDStack.pop();
        this.pageStack.pop();

        this.gotoPage(this.pageStack[this.pageStack.length - 1]);
    }
}

let pageController: IPageController = new PageController();

export default pageController;