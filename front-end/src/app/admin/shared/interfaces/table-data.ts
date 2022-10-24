import { TableTitle } from './table-title';

export interface TableData {
  tableKeys: TableTitle[];
  tableData?: any;
  route?: string;
  pagination?: any;
  sort?: any;
  sortDirection: 'asc' | 'desc' | '';
  activeSort?: any;
}
