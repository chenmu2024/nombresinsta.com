export enum NameCategory {
  ALL = 'ALL',
  AESTHETIC = 'AESTHETIC',
  MINIMAL = 'MINIMAL',
  FUNNY = 'FUNNY',
  BUSINESS = 'BUSINESS'
}

export interface GeneratedName {
  id: string;
  name: string;
  category: NameCategory;
  isAvailable?: boolean; // Mock property for UI
}

export interface GeneratorOptions {
  keyword: string;
  category: NameCategory;
  includeNumbers: boolean;
  includePeriods: boolean;
  includeUnderscores: boolean;
}