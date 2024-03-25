export interface BusinessData {
  siren: string;
  nom_complet: string;
  date_creation: string;
  date_fermeture: string;
  dirigeants: Dirigeant[];
  modified?: boolean;
}
export interface Dirigeant {
  nom: string;
  prenoms: string;
  annee_de_naissance: string;
  date_de_naissance: string;
  qualite: string;
}

export interface APIError {
  message: string;
}

export interface APIResponse {
  results: BusinessData[];
  total_pages: number;
  total_results: number;
  page: number;
  per_page: number;
  //   entreprises: BusinessData[];
}
