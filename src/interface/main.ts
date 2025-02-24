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
};

export interface ProductDetail {
    name: string
    accreditation_status : string
    submit_date: string
    responce_date: string
    requested: string
}

export interface ingredientData {
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
    number: number;
    name: string;
    accreditation: string;
    submitted: string;
    response: string;
    status: string;
    isDisable?: boolean;
};