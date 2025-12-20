export enum NameCategory {
  ALL = 'ALL',
  AESTHETIC = 'AESTHETIC',
  MINIMAL = 'MINIMAL',
  FUNNY = 'FUNNY',
  BUSINESS = 'BUSINESS'
}

export type Platform = 'instagram' | 'tiktok' | 'twitter' | 'youtube';
export type LengthOption = 'any' | 'short' | 'medium' | 'long';

export interface GeneratedName {
  id: string;
  name: string;
  category: NameCategory;
  isAvailable?: boolean; // Mock property for UI
}

export interface GeneratorOptions {
  keyword: string;
  category: NameCategory;
  platform: Platform;
  includeNumbers: boolean;
  includePeriods: boolean;
  includeUnderscores: boolean;
  lengthPreference: LengthOption;
  customPrefix?: string;
  customSuffix?: string;
}