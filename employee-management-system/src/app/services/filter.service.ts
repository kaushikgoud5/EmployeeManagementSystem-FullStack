import { EventEmitter, Injectable } from '@angular/core';
import { Filter } from '../models/filter.interface';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }
  FilterEmitter:EventEmitter<Filter>=new EventEmitter();
  onClickFilterEmit(value: Filter) {
    this.FilterEmitter.emit(value);
  }
}
