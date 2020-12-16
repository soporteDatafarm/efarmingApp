export class Farm{

    constructor(
        public id: string,
        public code: string,
        public name: string,
        public currentTechnician: string,
        public longitude: string,
        public latitude: string,
        public elevation: string,
        public densityIndicator: string,
        public plants: number,
        public hectares: number,
        public fertilizerIndicator: string,
        public productivePlants: number,
        public fertilizerBags: number,
        public productivityIndicator: string,
        public estimatedProduction: number,
        public ageIndicator: number,
        public supplyChainId: string,
        public villageId: string,
        public municipalityId: string,
        public departmentId: string,
        public farmStatusId: string,
        public cooperativeId: string,
        public ownershipTypeId: string
    ){

    }
}