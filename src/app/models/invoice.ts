export class Invoice{
    
    constructor(
        public id: string,
        public invoiceNumber: number,
        public identification: number,
        public value: number,
        public dateInvoice: string,
        public ubication: number,
        public hold: number,
        public cash: number,
        public weight: number,
        public baseKg: number,
        public coffeeTypeId: string,
        public date: string,
        public formatedDate: string,
        public inputDateformated: string,
        public farmId: string
    ){

    }
}

export class GroupedInvoice{

    constructor(
        public year: number,
        public totalKg: number,
        public totalValue: number,
        public averageValue: number,
        public farmId: string
    ){

    }
}