import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent {
  searchQuery: string = '';
  filterType: string = 'All';

  @Output() searchQueryChange = new EventEmitter<string>();
  @Output() filterTypeChange = new EventEmitter<string>();

  onFilterChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.filterTypeChange.emit(selectElement.value);
  }

  onSearch(query: string): void {
    this.searchQueryChange.emit(query);
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.onSearch(input.value);
  }
}
