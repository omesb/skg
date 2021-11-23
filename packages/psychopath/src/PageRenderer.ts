import { icons } from "feather-icons";
import { IPageController } from "./PageController";
import pages from "./Pages";
import { BranchPage, InfoPage, InputPage, Page, SelectOrCreatePage, YesNoPage } from "./PageTypes";

interface IPageRenderer {
    render(pageID: string, controller: IPageController): void;
}

class PageRenderer implements IPageRenderer {
    private controller: IPageController;

    render(pageID: string, controller: IPageController): void {
        this.controller = controller;

        const page : Page = pages[pageID];

        this.clear();
        this.addHeading("Page "+pageID);

        if(!page) {
            this.renderNotFound(pageID);
        } else if(page.type == "InfoPage") {
            this.renderInfoPage(page as InfoPage);
        } else if(page.type == "YesNoPage") {
            this.renderYesNoPage(page as YesNoPage);
        } else if(page.type == "BranchPage") {
            this.renderBranchPage(page as BranchPage);
        } else if(page.type == "InputPage") {
            this.renderInputPage(page as InputPage);
        } else if(page.type == "SelectOrCreatePage") {
            this.renderSelectOrCreatePage(page as SelectOrCreatePage);
        }
    }

    private clear(): void {
        this.getLayoutPanel().innerHTML = "";
    }

    private getLayoutPanel(): HTMLElement {
        return document.body;
    }

    private renderNotFound(pageID: string): void {
        this.addLabel("404 Not Found: Page " + pageID);
    }

    private add(element: HTMLElement): void {
        this.getLayoutPanel().appendChild(element);
    }

    private renderInfoPage(page: InfoPage): void {
        this.renderBranchPage({
            type: "BranchPage",
            label: page.label,
            transitions: [{
                label:"Next",
                next: page.next,
                featherIcon: "chevrons-right"
            }]
        });
    }

    private renderYesNoPage(page: YesNoPage): void {
        this.renderBranchPage({
            type: "BranchPage",
            label: page.label,
            transitions: [{
                label:"Yes",
                next: page.yes,
                featherIcon: "thumbs-up"
            },{
                label: "No",
                next: page.no,
                featherIcon: "thumbs-down"
            }]
        });
    }

    private renderBranchPage(page: BranchPage): void {
        this.addLabel(page.label);

        page.transitions.forEach(transition => {
            this.addButton(transition.featherIcon || "alert-circle", transition.label, () => {
                this.controller.gotoPage(transition.next);
            });
        });
    }
    
    private renderInputPage(page: InputPage): void {
        this.addLabel(page.label);
        
        var input = document.createElement("input");
        input.classList.add("Input");
        input.placeholder = "Be creative...";
        this.add(input);

        this.addSaveOrNextButton(
            page.next, () => {
                if(input.value) {
                    this.controller.addLiteralProperty(page.inputPropertyName, input.value);                    
                }
            });
    }

    private renderSelectOrCreatePage(page: SelectOrCreatePage): void {
        this.addLabel(page.label);

        var selectedUris = [];

        var searchIcon = document.createElement("span");
        searchIcon.innerHTML = icons.search.toSvg();

        var searchResults = document.createElement("div");
        searchResults.classList.add("EditorSearchResults");

        var searchInput = document.createElement("input");

        let updateSearch = () => {
            let query = searchInput.value.toLowerCase();
            searchResults.innerHTML = "";

            this.controller.search(page.selectOrCreateType, searchInput.value, selectedUris)
                .forEach((item,index) => {
                
                    var itemCheckbox = document.createElement("input");
                    itemCheckbox.type = "checkbox";
                    itemCheckbox.checked = selectedUris.indexOf(item.uri)>=0;
                    itemCheckbox.onclick = () => {
                        selectedUris = selectedUris.filter(uri => uri != item.uri);
                        if(itemCheckbox.checked) {
                            selectedUris.push(item.uri);
                        }
                    };

                    var itemLabel = document.createElement("label");
                    itemLabel.textContent = item.label;
                    itemLabel.innerHTML = icons[item.featherIcon].toSvg() + " " + itemLabel.innerHTML;
                    itemLabel.onclick = () => {
                        itemCheckbox.click();
                    };

                    var itemEntry = document.createElement("div");
                    itemEntry.appendChild(itemCheckbox);
                    itemEntry.appendChild(itemLabel);

                    searchResults.appendChild(itemEntry);
                });
        }
        searchInput.onkeyup = updateSearch;
        searchInput.onchange = updateSearch;
        updateSearch();

        if(page.selectPropertyName) {
            this.add(searchIcon);
            this.add(searchInput);
            this.add(searchResults);
        }

        if(page.create) {
            this.addButton("plus-circle", "Create", () => {
                this.controller.pushAndCreate(page.selectOrCreateType, page.create);
            });
        }

        this.addSaveOrNextButton(
            page.next, () => {
                selectedUris.forEach(uri => {
                    this.controller.addReferenceProperty(page.selectPropertyName, uri);
                });
            });
    }

    private addHeading(heading: string): void {
        var div = document.createElement("div");
        div.classList.add("Heading");
        div.textContent = heading;
        this.add(div);
    }

    private addLabel(label: string): void {
        var div = document.createElement("div");
        div.classList.add("Label");
        div.textContent = label;
        this.add(div);
    }

    private addSaveOrNextButton(next: string | null, additionalClickHandler: () => void) {
        this.addButton(
            next ? "chevrons-right" : "save",
            next ? "Next" : "Save",
            () => {
                additionalClickHandler();

                if(next) {
                    this.controller.gotoPage(next);
                } else {
                    this.controller.popAndCommit();
                }
            });
    }

    private addButton(featherIcon: string | undefined, label: string, clickHandler: () => void) {
        var button = document.createElement("button");
        button.textContent = label;
        if(featherIcon) {
            button.innerHTML = icons[featherIcon].toSvg() + " " + button.innerHTML;
        }
        button.onclick = clickHandler;

        var div = document.createElement("div");
        div.appendChild(button);
        this.add(div);
    }
}

let pageRenderer = new PageRenderer();

export default pageRenderer;