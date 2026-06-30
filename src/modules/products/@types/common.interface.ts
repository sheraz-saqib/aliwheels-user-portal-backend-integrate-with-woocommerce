export interface MetaData {
  id?: number;
  key: string;
  value: any;
}

export interface Image {
  id?: number;
  date_created?: string;
  date_created_gmt?: string;
  date_modified?: string;
  date_modified_gmt?: string;
  src: string;
  name?: string;
  alt?: string;
}

export interface Dimensions {
  length?: string;
  width?: string;
  height?: string;
}
