export interface IQuestion {
  id: string;
  text: string;
}


export type OrgChartNode = {
  id: number;
  label: string;
  children?: OrgChartNode[];
};