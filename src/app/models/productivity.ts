export class Productivity{

    constructor(
        public id: string,
        public totalHectares: string,
        public infrastructureHectares: string,
        public forestProtectedHectares: string,
        public conservationHectares: string,
        public shadingPercentage: string,
        public averageAge: number,
        public averageDensity: string,
        public percentageColombia: number,
        public percentageCaturra: number,
        public percentageCastillo: number,
        public percentageOtra: number,
        public coffeeArea: string,
        public productionPlants: number,
        public productionPercentage: number,
        public productionAreaPercentage: number,
        public productionArea: string,
        public growingPlants: number,
        public growingPercentage: number,
        public growingAreaPercentage: number,
        public growingArea: string,
        public estimatedProduction: number,
        public farmId: string
    ){

    }
}