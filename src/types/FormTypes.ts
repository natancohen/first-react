export interface FormData {
  name_of_unity: string;
  date: string;
  text: string;
  unitActivityType: string;
  activityType: string;
  category: string;
  eventSeverity: string;
  eventOutcome: string;
  damageType: string;
  categorySubOptions: string;
  subCategoryOptions: string;
  location: string;
  locationDescription: string;
  weather: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  recommendations: string;
  casualties: Array<{
    severity: string;
    count: number;
  }>;
}

export interface FormErrors {
  [key: string]: string;
}

export interface SelectOption {
  value: string;
  label: string;
}