export class ProjectType{

    constructor(
        public id: string,
        public name: string,
        public description: string
    ){

    }
}

export class Project{

    constructor(
        public projectTypeId: string,
        public farmId: string
    ){

    }
}