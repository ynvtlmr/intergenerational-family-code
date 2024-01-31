export type OrgChartNode = {
  id: number;
  label: string;
  children?: OrgChartNode[];
};
