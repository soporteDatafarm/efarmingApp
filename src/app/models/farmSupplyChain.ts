export class FarmSupplyChain{

    constructor(
        public id: string,
        public startDate: string,
        public endDate: string,
        public potencial: number,
        public bags: number,
        public code: number,
        public address: string,
        public supplierId: string,
        public qualityProfileId: string,
        public supplyChainStatusId: string,
        public departmentId: string,
        public farmId: string
    ){
        
    }
}