import { CheckboxFilterOptions, CheckboxFilter } from './CheckboxFilter';
console.log('Import checkbox');

const optionsYear: CheckboxFilterOptions = {
  filterBody: 'filter-type-checkbox-year',
  filterType: 'year',
};

const optionsCategory: CheckboxFilterOptions = {
  filterBody: 'filter-type-checkbox-category',
  filterType: 'category',
};

const checkboxFilterYear = new CheckboxFilter(optionsYear);
const checkboxFilterCategory = new CheckboxFilter(optionsCategory);

checkboxFilterYear.init();
checkboxFilterCategory.init();
