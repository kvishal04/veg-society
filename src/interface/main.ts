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

// export interface ProductDetail {
//     name: string
//     accreditation_status : string
//     submit_date: string
//     responce_date: string
//     requested: string
// }

export interface ProductDetail {
  id: number;
  product_name: string;
  requested_accreditation: string;
  current_accreditation: string;
  accreditation_status: string;
  ready_for_accreditation: boolean;
  submitted_on: string;
  response_date: string | null;
  vegetarianStatus: number,
  veganStatus: number,
  plantBasedStatus: number
}

export interface IIngredientData {
    id: number;
    ingredient_name: string;
    alternate_names: {  
      id: number,
      ingredient_id: number,
      alternate_name: string
    }[],
    vegetarian: number;
    vegan: number;
    plant_based: number;
    date_added: string;
    is_verified?: boolean;
    isDisable?: boolean;
    notExisted?: boolean
}

export interface IIngredientTable {
  IngredientTableData: IIngredientData[];
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
  sort_dir: string;
  sort_by: string;
  search: string,
  requested_accreditation: string,
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


export type ProductNotesArray  = { created_at: string, added_by: string, note: string }[];
  

export interface IdashboardFilterData { 
  sort_by: string,
  sort_dir: string,
  search: string,
  requested_accreditation: string,
  accreditation_status: string,
  per_page: number,
  page: number
}

export interface IIngredientilterData { 
  sort_by: string,
  sort_dir: string,
  search: string,
  requested_accreditation: string,
  product_id: string
  per_page: number,
  page: number
}

export interface ProductNotes {
  data: { created_at: string; added_by: string; note: string }[];
}
