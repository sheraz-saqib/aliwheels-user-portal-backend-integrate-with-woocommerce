export interface SettingGroup {
  id: string;
  label: string;
  description: string;
  parent_id: string;
  sub_groups: string[];
}

export interface Setting {
  id: string;
  label: string;
  description: string;
  type: string;
  default: string;
  tip: string;
  placeholder: string;
  value: any;
  options?: Record<string, string>;
}
