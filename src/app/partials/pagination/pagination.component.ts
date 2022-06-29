import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  constructor() { }
  @Input() maxNumber:number;
  @Input() totalItems:number;
  @Input() currentPage:number;
  @Input() perPage:number;
  @Output() pageChange = new EventEmitter;
  buttonCnt:Array<number>;
  totalPage:number;
  ngOnInit(): void {
    this.totalPage = this.totalItems/this.perPage
    let len = this.maxNumber < this.totalPage ? this.maxNumber : this.totalPage
    this.buttonCnt = new Array(len).fill(0)
  }
   onPageChange(page) {
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);

   }

   onPreviouse() {
    if(this.currentPage<=1){
      return
    }
    this.currentPage--;
    this.pageChange.emit(this.currentPage);

   }
   onNext() {
    if(this.currentPage>=this.totalPage){
      return
    }
    this.currentPage++;
    this.pageChange.emit(this.currentPage);
   }
}
