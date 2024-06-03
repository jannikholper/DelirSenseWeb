export class SubHeader extends HTMLElement
{
    constructor() {
        super();
    }

    connectedCallback() {
        console.log("Custom element added to page.");
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }

    adoptedCallback() {
        console.log("Custom element moved to new page.");
    }
}

customElements.define("sub-header", SubHeader);