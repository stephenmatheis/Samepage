/** (C) 2021 Stephen Matheis */

/** Actions */
import Action_Download from '../Actions/Action_Download.js'

/** Components */
import Component_Table from '../Components/Component_Table.js'
import Component_Container from '../Components/Component_Container.js'
import Component_Toolbar from '../Components/Component_Toolbar.js'
import Component_Button from '../Components/Component_Button.js'
import Component_InfoBox from '../Components/Component_InfoBox.js'
import Component_SearchBox from '../Components/Component_SearchBox.js'

export default function ViewPart_PagedTable(options) {
    const {
        allowNewItem,
        parent,
        data,
        download,
        list,
        path,
        form,
        columns,
        fields,
        checkboxes,
        itemsPerPage,
        nowrap,
        maxlines,
        maxWidth,
        newForm,
        searchPlaceholder,
        onPage
    } = options;

    // Toolbar and Search box container
    const toolBarAndSearchContainer = Component_Container({
        parent,
        justify: 'space-between',
        maxWidth
    });

    toolBarAndSearchContainer.add();

    // Toolbar
    const toolbar = Component_Toolbar({
        parent: toolBarAndSearchContainer,
    });

    toolbar.add();

    /** New Button */
    let newButton;

    if (allowNewItem !== false) {
        newButton = Component_Button({
            color: 'green',
            icon: /*html*/ `
                <svg class="icon">
                    <use href="#icon-plus"></use>
                </svg>
            `,
            parent: toolbar,
            action: (event) => {
                App.route(`${path ? `${path}/` : ''}${form || list}/${newForm || 'NewForm'}`);
            }
        });
        newButton.add();
    }

    /** Download Button */
    if (download !== false) {
        const downloadButton = Component_Button({
            icon: /*html*/ `
                <svg class="icon">
                    <use href="#icon-download"></use>
                </svg>
            `,
            parent: toolbar,
            action() {
                /** Build CSV String */
                const headers = columns.join(',');
                const rows = data.map(item => fields.map(field => `"${item[field]}"`).join(',')).join('\n');
                const csv = `${headers}\n${rows}`;

                Action_Download({
                    fileName: `${App.title.replace(/&/g, '_and_').replace(/\s+/g, '_')}_${list}`.toLowerCase(),
                    csv
                });
            }
        });
    
        downloadButton.add();
    }

    // Display table
    let table = PagedTable({
        data
    });

    /** Run on each page */
    if (onPage) {
        onPage();
    }

    // Search box
    const searchBox = Component_SearchBox({
        placeholder: searchPlaceholder || list,
        parent: toolBarAndSearchContainer,
        action(query) {
            let items = [];
        
            data.forEach(item => {
                fields.forEach(field => {
                    const value = item[field] || '';
                    const caseInsensitiveValue = value.toString().toLowerCase();
        
                    if (typeof item[field] === 'string' && caseInsensitiveValue.includes(query.toLowerCase())) {
                        if (!items.includes(item)) {
                            items.push(item);
                        }
                    }
                });
            });
        
            // Remove table
            table.remove();
        
            table = PagedTable({
                data: items
            });

            // Display new table
            table.add();
        }
    });

    searchBox.add();
    table.add();

    function PagedTable (param) {
        const {
            data
        } = param;
        
        // Page limit
        const limit = itemsPerPage || 20;
        
        // Item count
        const total = data.length;
        
        // Page count
        const pages = Math.ceil(total / limit);
    
        // Counters
        let page = 1;
        let startIndex = 0;
        let endIndex = startIndex + limit;

        // Instatiate pagination bar (but don't add to DOM yet)
        const paginationBar = pages > 1 ? createPaginationBar() : undefined;

        function createPaginationBar() {
            // Pagination container
            const paginationBarContainer = Component_Container({
                parent,
                justify: 'space-between',
                maxWidth
            });

            // Pagination Toolbar
            const paginationBar = Component_Toolbar({
                parent: paginationBarContainer,
            });

            paginationBar.container = paginationBarContainer;
            paginationBar.limit = limit;
            paginationBar.pages = pages;

            // Pagination Info
            const infoBox = Component_InfoBox({
                parent: paginationBarContainer,
                page,
                pages,
                start: startIndex + 1,
                end: endIndex,
                total
            });

            paginationBar.info = infoBox;

            // Previous button
            const previousButton = Component_Button({
                disabled: true,
                color: 'green',
                icon: /*html*/ `
                    <svg class="icon">
                        <use href="#icon-arrow-left"></use>
                    </svg>
                `,
                parent: paginationBar,
                action: (event) => {
                    page--

                    updateInfoBox((start, index) => start - index);

                    /** Run on each page */
                    if (onPage) {
                        onPage();
                    }
                }
            });

            // Next button
            const nextButton = Component_Button({
                color: 'green',
                icon: /*html*/ `
                    <svg class="icon">
                        <use href="#icon-arrow-right"></use>
                    </svg>
                `,
                parent: paginationBar,
                action: (event) => {
                    page++

                    updateInfoBox((start, index) => start + index);

                    /** Run on each page */
                    if (onPage) {
                        onPage();
                    }
                }
            });

            function updateInfoBox(operation) {
                // Remove current table
                table.remove();

                // Increment counters
                startIndex = operation(startIndex, limit);
                endIndex = operation(endIndex, limit);

                // Toggle previous/next button state
                toggleButtonState();

                // Update InfoBox
                infoBox.update({
                    page,
                    start: startIndex + 1,
                    end: endIndex,
                })

                // Select next data set
                const pagedData = data.slice(startIndex, endIndex);

                // Replace table
                table = createTable({
                    pagedData,
                    parent: paginationBarContainer,
                    position: 'beforebegin'
                });

                // Add to DOM
                table.add();
            }

            function toggleButtonState() {
                if (page > 1) {
                    previousButton.enable();
                } else {
                    previousButton.disable();
                }

                if (page === pages) {
                    nextButton.disable();
                } else {
                    nextButton.enable();
                }
            }

            // Register buttons
            paginationBar.buttons = {
                previousButton,
                nextButton
            }

            return paginationBar
        }

        // First dataset
        const pagedData = data.slice(startIndex, endIndex);

        // Keep track of current table
        let table = createTable({
            pagedData,
            parent: toolBarAndSearchContainer,
            position: 'afterend'
        });

        function createTable(options) {
            const {
                pagedData,
                parent,
                position
            } = options;

            const tasksTable = Component_Table({
                list,
                checkboxes,
                parent,
                position,
                table: {
                    columns,
                    fields
                },
                data: pagedData,
                nowrap,
                maxlines,
                maxWidth,
                toolbar: toolbar,
                action: itemId => {
                    App.route(`${form || list}/${itemId}`);
                }
            });

            return tasksTable;
        }

        return {
            add() {
                table.add();

                if (paginationBar) {
                    paginationBar.container.add();
                    paginationBar.add();
                    paginationBar.buttons.previousButton.add();
                    paginationBar.buttons.nextButton.add();
                    paginationBar.info.add();
                }
            },
            remove() {
                table.remove();

                if (paginationBar) {
                    paginationBar.container.remove();
                }
            },
            updateCell(param) {
                table.updateCell(param);
            }
        }
    }

    return {
        getTable() {
            return table;
        }
    }
}
