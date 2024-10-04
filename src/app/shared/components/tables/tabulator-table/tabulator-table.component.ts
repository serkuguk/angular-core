import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Tabulator} from 'tabulator-tables';

@Component({
  selector: 'tabulator-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabulator-table.component.html',
  styleUrl: './tabulator-table.component.scss'
})
export class TabulatorTableComponent implements OnInit, AfterViewInit {
  @Input() tableData: any[] = [];
  @Input() columnNames: any[] = [];
  @Input() height: string = '311px';

  @ViewChild('myTabularTable') tableElement?: ElementRef;

  private table!: any;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const tableData = [
      {id: 1, name: "Oli Bob", age: "12", col: "red", dob: ""},
      {id: 2, name: "Mary May", age: "1", col: "blue", dob: "14/05/1982"},
      {id: 3, name: "Christine Lobowski", age: "42", col: "green", dob: "22/05/1982"},
      {id: 4, name: "Brendon Philips", age: "125", col: "orange", dob: "01/08/1980"},
      {id: 5, name: "Margret Marmajuke", age: "16", col: "yellow", dob: "31/01/1999"},
    ];


    this.table = new Tabulator(this.tableElement?.nativeElement, {
      data: tableData,
      layout: 'fitColumns',
      columns: [
        {title: "Name", field: "name", width: 150},
        {title: "Age", field: "age", hozAlign: "left", formatter: "progress"},
        {title: "Favourite Color", field: "col"},
        {title: "Date Of Birth", field: "dob", sorter: "date", hozAlign: "center"},
      ]
    });

  }
}
