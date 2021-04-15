/* (C) 2019 Stephen Matheis */

/* Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_DataTable(param) {
    const {
        headers,
        columns,
        buttons,
        data,
        onRowClick,
        parent,
        position
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <!-- <table class='table table-sm w-100 animated fadeIn'> -->
            <table class='table table-sm w-100 table-striped table-bordered animated fadeIn'>
                <thead>
                    ${buildHeader()}
                </thead>    
            </table>
        `,
        style: /*css*/ `
            #id tr {
                cursor: pointer;
            }

            /** Toolbar */
            #id_wrapper .datatable-toolbar {
                padding: 0px 15px;
                margin: 0px 0px 15px 0px;
                width: 100%;
                display: flex;
                justify-content: space-between;
            }

            /** Toolbar */
            #id_wrapper .datatable-toolbar .cell {
                display: flex;
                align-items: center;
            }

            #id_wrapper .datatable-toolbar .dataTables_length label,
            #id_wrapper .datatable-toolbar .dataTables_filter label {
                margin: 0px;
            }

            #id_wrapper .datatable-toolbar .dt-button {
                background: ${App.primaryColor};
                border: none;
                outline: none;
                border-radius: 4px;
                margin: 0px 10px 0px 0px;
                font-size: 1em;
                font-weight: 400;
            }

            #id_wrapper .datatable-toolbar .dt-button span {
                color: white;
            }

            /** Pagination */
            #id_wrapper .page-item .page-link {
                color: unset;
            }

            #id_wrapper .page-item .page-link:focus {
                box-shadow: none;
            }

            #id_wrapper .page-item.active .page-link {
                color: white;
                background: ${App.primaryColor};;
                border: ${App.primaryColor};;
            }

            /** Form control */
            #id_wrapper .form-control:focus {
                box-shadow: none;
                outline: none;
                border-color: ${App.primaryColor};
            }

            /** Table */
            #id_wrapper table.dataTable {
                border-collapse: collapse !important;
            }

            .table-bordered {
                border: 1px solid rgb(${App.primaryColorRGB}, .30);
            }

            /** Headers */
            #id_wrapper .table-bordered thead td, .table-bordered thead th {
                border-bottom-width: 0px;
            }
            
            #id_wrapper .table thead th {
                border-bottom: 1px solid rgb(${App.primaryColorRGB}, .30);
            }

            /** Rows */
            #id_wrapper .table-striped tbody tr:nth-of-type(odd) {
                background-color: rgb(${App.primaryColorRGB}, .15);
            }

            /** Cells */
            #id_wrapper .table-bordered td, .table-bordered th {
                border: 1px solid rgb(${App.primaryColorRGB}, .30);
            }

            /** Sorting */
            #id_wrapper .sorting_asc::before,
            #id_wrapper .sorting_asc::after,
            #id_wrapper .sorting_desc::before,
            #id_wrapper .sorting_desc::after {
                color: ${App.primaryColor}
            }
        `,
        parent,
        position,
        events: [
            {
                selector: `#id`,
                event: 'click',
                listener(event) {
                    
                }
            }
        ],
        onAdd() {
            setData({
                columns,
                data,
                onRowClick,
            });
        }
    });

    function buildHeader() {
        let html = /*html*/ `
            <tr>
        `;

        headers.forEach(item => {
            html += /*html*/ `
                <th>${item}</th>
            `;
        });

        html += /*html*/ `
            </tr>
        `
        return html;
    }

    function setData(param) {
        const {
            columns,
            data,
            onRowClick,
        } = param;

        console.log(data);

        const tableId = `#${component.get().id}`;

        /** Create table. */
        $(tableId)
        .DataTable({
            dom: `
                <'row'
                    <'datatable-toolbar'
                        <'cell left'
                            Bl
                        >
                        <'cell right'
                            f
                        >
                    >
                >
                <'row'
                    <'col-md-12't>
                >
                <'row'
                    <'col-md-12'ip>
                >
            `,
            processing: true,
            responsive: true,
            pageLength: 25,
            select: true,
            // order: [[2, 'asc']],
            columns,
            buttons: buttons || []
        })
        .on('click', 'tr', function(rowData) { 
            // NOTE: ***** DO NOT Change this to arrow function! - 20210310
            // it messes up the 'this' reference like discussed earlier this week.
            rowData = $(tableId).DataTable().row(this).data();

            if (rowData && onRowClick) {
                onRowClick({
                    row: this,
                    item: rowData
                });
            }
        });

        /** Clear table data. */
        $(tableId).DataTable().rows().remove().draw()

        /** Load and draw data. */
        $(tableId).DataTable().rows.add(data).draw()

        /** Adjusts the column widths when render is complete. */
        $(tableId).DataTable().columns.adjust().draw()
    }

    component.updateRow = (param) => {
        const {
            row,
            data
        } = param;

        $(`#${component.get().id}`).DataTable().row(row).data(data).draw();
    }

    return component;
}