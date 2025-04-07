
interface TranslationMap {
  [key: string]: string;
}

const translations: TranslationMap = {
  "warehouse.none": "No Warehouse",
  "User": "User",
  "Role": "Role",
  "Permission": "Permission",
  // Add more translations as needed
};

export const t = (key: string): string => {
  return translations[key] || key;
};
