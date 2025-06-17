import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  DoCheck,
  Output,
  ViewChild,
  ChangeDetectorRef,
  ElementRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { fadeAnimation } from '../../animations';
import { MatSelectChange } from '@angular/material/select';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NgxMaskService } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivePipeModule } from '@shared/pipes/active/active-pipe.module';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-template-table',
  templateUrl: './template-table.component.html',
  styleUrls: ['./template-table.component.scss'],
  animations: [fadeAnimation],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    NgxSkeletonLoaderModule,
    MatPaginatorModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    ActivePipeModule,
    TranslateModule
  ]
})
export class TemplateTableComponent implements OnInit, DoCheck {
  @ViewChild('multipleSelect') multipleSelect!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Table inputs

  @Input() columnsToDisplay: string[] = [];
  @Input() columnsTags: string[] = [];
  @Input() data: any[] = [];
  @Input() skeletonRowNumber: number = 12;
  @Input() showSelectColumn: boolean = true;
  @Input() showActionIcon: boolean = false;
  @Input() showViewIcon: boolean = false;

  //Table output|

  @Output() deleteRegister = new EventEmitter<any>();
  @Output() editRegister = new EventEmitter<any>();
  @Output() seeRegister = new EventEmitter<any>();

  // Two binding of items selected

  @Input() itemsSelected: any[] = [];
  @Output() itemsSelectedChange = new EventEmitter<any[]>();

  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  backupData: any[] = [];
  showSkeleton: boolean = true;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              public maskService: NgxMaskService) {}

  ngOnInit(): void {
    if (this.showSelectColumn) {
      this.columnsTags.unshift('select');
      this.columnsToDisplay.unshift('select');
    }
    this.setData();
    if (this.showActionIcon) {
      this.columnsTags.push('actions');
      this.columnsToDisplay.push('actions');
    }

    if (this.showViewIcon) {
      this.columnsTags.push('view');
      this.columnsToDisplay.push('view');
    }
  }

  ngDoCheck(): void {
    if (this.backupData.length !== this.data.length) {
      this.changeDetectorRef.detectChanges();
      this.setData();
    }
  }

  seeRow(index: number) {
    this.seeRegister.emit(this.data[index]);
  }

  editRow(index: number) {
    this.editRegister.emit(this.data[index]);
  }
  deleteRow(index: number) {
    this.deleteRegister.emit(this.data[index]);
  }

  setData() {
    this.showSkeleton = true;
    let randomSeconds = Math.random() * 2000;

    setTimeout(() => {
      this.dataSource = new MatTableDataSource<any>(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.backupData = this.data.slice();
      // this.dataSource.filterPredicate = this.createFilter();

      this.showSkeleton = false;
    }, randomSeconds);
  }

  // Selection logic

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
    this.itemsSelected.splice(0);

    if (this.selection.selected.length > 0) {
      this.dataSource.data.forEach((item) => {
        this.itemsSelected.push(item);
      });
    }
  }

  updateCheckedList(event: any, element: any, elementIndex: number) {
    console.log('element ', element);
    console.log('elementIndex ', elementIndex);

    if (event.checked) {
      this.itemsSelected.push(element);
    } else {
      this.itemsSelected.splice(elementIndex, 1);
    }
  }

  selectRow(
    checkboxChange: MatCheckboxChange,
    rowElement: any,
    rowIndex: number
  ) {
    console.log('checkboxChange ', checkboxChange);
    console.log('rowElement ', rowElement);
    console.log('rowIndex ', rowIndex);

    if (checkboxChange) {
      // If the item exist in the selected items array
      // I search the item index

      let itemIndex = this.itemsSelected.findIndex((item) => {
        item.id === rowElement.id;
      });

      this.selection.toggle(rowElement);
      this.updateCheckedList(checkboxChange, rowElement, itemIndex);

      // I check the first option of multiselect options

      if (this.data[rowIndex].options) {
        let itemSelectedIndex = this.itemsSelected.findIndex((item) => {
          return item.rowIndex === rowIndex;
        });
        this.itemsSelected[itemSelectedIndex].optionsSelected.push(
          this.itemsSelected[itemSelectedIndex].options[0]
        );
      }
    }

    console.log('this.itemsSelected ', this.itemsSelected);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  getType(variable: any) {
    if (Array.isArray(variable)) {
      return 'array';
    } else {
      return typeof variable;
    }
  }

  selectionChange(
    rowElement: any,
    selectEvent: MatSelectChange,
    rowIndex: number
  ) {
    let event = {
      checked: selectEvent.value.length > 0 ? true : false,
    };

    // First i check if the item exist in the selected
    // Items attay

    let existIndex = this.itemsSelected.findIndex((item) => {
      return item.rowIndex === rowIndex;
    });

    if (selectEvent.value.length === 0 || existIndex === -1) {
      this.selection.toggle(rowElement);
      this.updateCheckedList(event, this.data[rowIndex], rowIndex);
    }

    let itemIndex = this.itemsSelected.findIndex((item) => {
      return item.rowIndex === rowIndex;
    });

    if (itemIndex !== -1) {
      this.itemsSelected[itemIndex].optionsSelected = selectEvent.value;
    }
  }
}
