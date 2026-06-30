export interface DataResource {
  slug: string;
  description: string;
}

export interface Continent {
  code: string;
  name: string;
  countries: Country[];
}

export interface Country {
  code: string;
  name: string;
  states: CountryState[];
}

export interface CountryState {
  code: string;
  name: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}
