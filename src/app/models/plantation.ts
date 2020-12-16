export class PlantationType{

    constructor(
        public id: string,
        public name: string
    ){

    }
}

export class PlantationStatus{

    constructor(
        public id: string,
        public name: string
    ){

    }
}

export class PlantationVariety{

    constructor(
        public id: string,
        public name: string,
        public plantationTypeId: string
    ){

    }
}

export class Plantation{

    constructor(
        public id: string,
        public hectares: string,
        public treesDistance: string,
        public grooveDistance: string,
        public density: string,
        public estimatedProduction: string,
        public age: string,
        public numberOfPlants: number,
        public numberLot: number,
        public nomLot: string,
        public labLot: string,
        public tipoLot: string,
        public formLot: string,
        public numEjeArbLot: number,
        public municipalityId: string,
        public villageId: string,
        public productivityId: string,
        public plantationStatusId: string,
        public plantationTypeId: string,
        public plantationVarietyId: string
    ){

    }
}
