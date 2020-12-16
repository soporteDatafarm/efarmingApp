export class AssignedFarm{

    constructor(
        public id: string,
        public code: string,
        public name: string,
        public farmer: string,
        public departmentId: string,
        public municipalityId: string,
        public villageId: string,
        public selected: boolean
    ){

    }
}