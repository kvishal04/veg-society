import { JSX } from "react";

export type TableColumn = {
  name: string;
  keys: string[];
  sortable?: boolean;
  className?: string;
  rowclassName?: string;
  customBodyRender?: (row: any) => JSX.Element;
};


export type TableConfig = {
    tableClassName: string;
    tHeadClassName: string;
    tBodyClassName: string;
    trClassName: {
      class: (row: any) => string;
    };
    thClassName: string;
    thIconClassName: string;
    tdClassname: string;
    showItemQuantity: number;
    columns: TableColumn[];
    rows: {
      className: string;
    };
    emptyState: {
      text: () => string;
    };
    sort_by?: string;
    sort_dir?: string;

};

export interface ProductDetail {
    name: string
    accreditation_status : string
    submit_date: string
    responce_date: string
    requested: string
}

export interface IIngredientData {
    Number: number;
    Ingredient: string;
    AlternativeNames: string[];
    Vegetarian: number;
    Vegan: number;
    PlantBased: number;
    DateAdded: string;
    isDisable?: boolean;
    notExisted?: boolean
}

export interface ProductData  {
    id: number;
    product_name: string;
    requested_accreditation: string;
    submitted_on: string;
    response_date: string;
    accreditation_status: string;
    isDisable?: boolean;
};

export interface IproductCraeteData {
  product_name: string;
  requested_accreditation: string;
  notes: string;
};
export interface  IdashboardSummary {
    vegetarian: number,
    vegan: number,
    plant_based: number,
    accredited: number,
    pending: number,
    rejected: number
}
export interface  IproductTable {
  data: ProductData[];
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
  sort_dir: string;
  sort_by: string;
  search: string,
  requested_accreditation: string,
  accreditation_status: string,
};

interface PieData { 
  name: string; 
  value: number; 
  color: string;
}

// Use type instead of interface for an array type
export type IchartData = PieData[];


export interface ProductNotes {
  data : { created_at: string, added_by: string, note: string }[]
  
}

export interface IdashboardFilterData { 
  sort_by: string,
  sort_dir: 'asc' | 'desc',
  search: string,
  requested_accreditation: string,
  accreditation_status: string,
  per_page: number,
  page: number
}