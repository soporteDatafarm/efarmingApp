export class FamilyMember{

    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public fullName: string,
        public age: string,
        public identification: string,
        public education: string,
        public phoneNumber: string,
        public relationship: string,
        public maritalStatus: string,
        public isOwner: boolean,
        public farmId: string,
    ){

    }
}