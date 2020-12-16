export interface PlantationNames {
    plantationTypeName: string;
    plantationVarietyName: string;
  }

export interface PlantationIds {
    plantationTypeId: string;
    plantationVarietyId: string;
  }

 export interface PlantationView {
   plantationNames : PlantationNames;
   hectares: string;
   estimatedProduction: string;
   age: string;
   numberOfPlants: number;
 }