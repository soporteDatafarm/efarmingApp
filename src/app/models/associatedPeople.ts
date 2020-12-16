export class AssociatedPeople{

    constructor(
        public id: string,
        public userName: string,
        public email: string,
        public password: string,
        public salt: string,
        public firstName: string,
        public lastName: string,
        public fullName: string,
        public isActive: boolean,
        public sensoryProfileAssessments: string,
        public roleName: string,
        public farmId: string
    ){

    }
}