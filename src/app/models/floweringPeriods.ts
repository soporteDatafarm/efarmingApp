export class FloweringPeriodsQualification{

    constructor(
        public id: string,
        public name: string
    ){

    }
}

export class FloweringPeriod{

    constructor(
        public id: string,
        public startDate: string,
        public startDateFormated: string,
        public floweringPeriodQualificationId: string,
        public plantationId: string
    ){

    }
}