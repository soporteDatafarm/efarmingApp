export class ContactLocation{

    constructor(
        public id: number,
        public name: string
    ){

    }
}

export class ContactName{

    constructor(
        public name: string
    ){

    }
}

export class ContactTopic{

    constructor(
        public id: number,
        public name: string
    ){

    }
}

export class ContactType{

    constructor(
        public id: number,
        public name: string
    ){

    }
}

export class Contact{

    constructor(
        public id: number,
        public name: string,
        public date: string,
        public comment: string,
        public actionType: string,
        public topics: string,
        public userId: string,
        public contactTypeId: number,
        public contactLocation: string,
        public farmId: string
    ){

    }
}