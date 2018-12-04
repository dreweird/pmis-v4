import { Component, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { MfoService } from '../services/mfo.service';
import { MatDialog } from '@angular/material';
import { AddObjectDialogComponent } from './addObject-dialog.component';
import 'ag-grid-enterprise';

@Component({
  selector: 'anms-bed1',
  templateUrl: './bed1.component.html',
  styleUrls: ['./bed1.component.css']
})
export class Bed1Component implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  gridApi;
  gridColumnApi;
  rowData;
  columnDefs;
  autoGroupColumnDef;
  components;
  rowSelection;

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.mfoService.getMFO().subscribe(data => {
      this.rowData = data;
      console.log(data);
    });
  }

  addObject(params) {
    // console.log(params);
    if (params.colDef.headerName === 'PAP' && params.data !== undefined) {
      const selectedRows = this.gridApi.getSelectedRows();
      console.log(selectedRows);
      const dialogRef = this.dialog.open(AddObjectDialogComponent, {
        data: { data: selectedRows[0], gridApi: this.gridApi }
      });
      return dialogRef.afterClosed();
    }
  }

  constructor(private mfoService: MfoService, private dialog: MatDialog) {
    this.rowSelection = 'single';
    this.columnDefs = [
      // {
      //   headerName: "Group",
      //   cellRenderer: "agGroupCellRenderer",
      //   showRowGroup: true,
      //   pinned: 'left',
      //   field: 'mfo_name'
      // },
      {
        headerName: 'header_main',
        field: 'header_main',
        width: 120,
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'header_program',
        field: 'header_program',
        width: 120,
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'header_mfo',
        field: 'header_mfo',
        width: 120,
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'header_indicator',
        field: 'header_indicator',
        width: 120,
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'header_subindicator',
        field: 'header_subindicator',
        width: 120,
        rowGroup: true,
        hide: true
      },
      {
        headerName: 'mfo_id',
        field: 'mfo_id',
        width: 120,
        rowGroup: true,
        hide: true
      },

      { headerName: 'Description', field: 'name', width: 150, pinned: 'left' },
      { headerName: 'UACS Object Code', field: 'object_id', width: 100 },
      { headerName: 'Original Allotment', field: '', width: 100 },
      { headerName: 'Adjustment', field: '', width: 100 },
      {
        headerName: 'Adjusted Allotment',
        field: '',
        width: 100,
        cellStyle: { color: 'white', 'background-color': '#b23c9a' }
      },
      {
        headerName: 'Jan',
        field: 'jan',
        width: 70,
        editable: params => {
          if (params.node.data) return true;
          else return false;
        },
        onCellValueChanged: function(event) {
          // console.log(event);
          if (isNaN(+event.newValue)) {
            alert('Invalid entry...input numbers only');
            event.newValue = null;
          }
          console.log(event.newValue);
        }
      },
      { headerName: 'Feb', field: '', width: 70 },
      { headerName: 'Mar', field: '', width: 70 },
      {
        headerName: 'Q1',
        field: '',
        width: 70,
        cellStyle: { color: 'white', 'background-color': '#5472d3' }
      },
      { headerName: 'Apr', field: '', width: 70 },
      { headerName: 'May', field: '', width: 70 },
      { headerName: 'Jun', field: '', width: 70 },
      {
        headerName: 'Q2',
        field: '',
        width: 70,
        cellStyle: { color: 'white', 'background-color': '#5472d3' }
      },
      { headerName: 'Jul', field: '', width: 70 },
      { headerName: 'Aug', field: '', width: 70 },
      { headerName: 'Sep', field: '', width: 70 },
      {
        headerName: 'Q3',
        field: '',
        width: 70,
        cellStyle: { color: 'white', 'background-color': '#5472d3' }
      },
      { headerName: 'Oct', field: '', width: 70 },
      { headerName: 'Nov', field: '', width: 70 },
      { headerName: 'Dec', field: '', width: 70 },
      {
        headerName: 'Q4',
        field: '',
        width: 70,
        cellStyle: { color: 'white', 'background-color': '#5472d3' }
      },
      {
        headerName: 'Total Obligations',
        field: '',
        width: 70,
        cellStyle: { color: 'white', 'background-color': '#ef7109' }
      },
      {
        headerName: 'Unobligated',
        field: '',
        width: 70,
        cellStyle: { color: 'white', 'background-color': '#e83525' }
      },
      { headerName: 'Fund Utilization', field: '', width: 70 }
    ];
    this.autoGroupColumnDef = {
      headerName: 'PAP',
      cellRenderer: 'agGroupCellRenderer',
      pinned: 'left',
      width: 300,
      field: 'mfo_name',
      cellRendererParams: {
        suppressCount: true, // turn off the row count
        innerRenderer: 'simpleCellRenderer'
      }
    };
    this.components = { simpleCellRenderer: getSimpleCellRenderer() };
  }

  ngOnInit() {}
}

function getSimpleCellRenderer() {
  function SimpleCellRenderer() {}
  SimpleCellRenderer.prototype.init = function(params) {
    const tempDiv = document.createElement('div');
    // console.log(params.node);
    if (params.node.group && params.node.field === 'mfo_id') {
      // alert(params.node.field);
      tempDiv.innerHTML =
        '<span>' + params.node.allLeafChildren[0].data.mfo_name + '</span>';
    } else if (params.node.group) {
      tempDiv.innerHTML =
        '<span style="font-weight: bold">' + params.value + '</span>';
    } else {
      // console.log(params);
      tempDiv.innerHTML = '<span>' + params.value + '</span>';
    }
    this.eGui = tempDiv.firstChild;
  };
  SimpleCellRenderer.prototype.getGui = function() {
    return this.eGui;
  };
  return SimpleCellRenderer;
}
