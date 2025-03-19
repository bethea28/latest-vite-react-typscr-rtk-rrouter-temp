export interface Geometry {
    type: "Polygon";
    coordinates: number[][][];
  }
  
  export interface Properties {
    "2010": number | null;
    "2011": number | null;
    "2012": number | null;
    "2013": number | null;
    "2014": number | null;
    name: string;
    cartodb_id: number;
    objectid: number;
    web_url: string;
    label_name: string;
    datelastmo: string;
    shape_leng: number;
    shape_area: number;
    total: number | null;
  }
  
 export interface Feature {
    type: "Feature";
    id: number| string;
    properties: Properties;
    geometry: Geometry;
  }
  
  interface CrsProperties {
    name: "urn:ogc:def:crs:OGC:1.3:CRS84";
  }
  
  interface Crs {
    type: "name";
    properties: CrsProperties;
  }
  
  export interface FeatureCollection {
    type: "FeatureCollection";
    crs: Crs;
    features: Feature[];
  }


export interface SelectOption {
  value: string;
  label: string;
  allData?: Feature;
}