export class Fertilizer{
    //farmerIdentification posible string
    constructor(
        public id: string,
        public invoiceNumber: number,
        public farmerIdentification: number,
        public ubication: number,
        public date: string,
        public value: number,
        public hold: number,
        public cashRegister: number,
        public unitPrice: number,
        public quantity: number,
        public name: string,
        public formatedDate: string,
        public inputDateFormated: string,
        public farmId: string
    ){

    }
}

export class GroupedFertilizer{

    constructor(
        public year: number,
        public quantity: number,
        public totalValue: number,
        public averagePrice: number,
        public farmId: string
    ){

    }
}