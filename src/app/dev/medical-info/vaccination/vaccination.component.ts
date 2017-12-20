import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-vaccination',
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.scss']
})

export class VaccinationComponent {

  displayedColumns = ['select', 'vaccin', 'count', 'date', 'duedate', 'hosname'];

  //서버에서 가져와야할 데이터. 하단에 임시로 넣어둠.
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  selection = new SelectionModel<Element>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  //체크선택된 row
  selectedRow: any;
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }  
}

export interface Element {
  vaccin: string;
  count: number;
  date: string;
  duedate: string;
  hosname: string;
}

const ELEMENT_DATA: Element[] = [
  { vaccin: '광견병주사', count: 1, date: '01/05/2017', duedate: '01/09/2017', hosname:'하니동물병원' },
  { vaccin: '코로나백신', count: 2, date: '01/05/2017', duedate: '01/09/2017', hosname:'하니동물병원' },
  { vaccin: '심장사상충', count: 3, date: '01/05/2017', duedate: '01/09/2017', hosname:'하니동물병원' },
  { vaccin: '광견병주사', count: 1, date: '01/05/2017', duedate: '01/09/2017', hosname:'하니동물병원' } 
];
