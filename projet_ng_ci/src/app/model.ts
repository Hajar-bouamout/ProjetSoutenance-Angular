export class Utilisateur {
    public id?: string;
    public email?: string;
    public passwordValue?: string;
    public username?: string;
    public birthdate?: Date;
    
    constructor(id?: string, email?: string, passwordValue?: string,  username?: string, birthdate?: Date) {
        this.id = id;
        this.email = email;
        this.passwordValue = passwordValue;
        this.username = username;
        this.birthdate = birthdate;
    
    }

 
}


export class Compte {
    public id?: string;
    public publicKey?: string;
    public platformName?: string;
    public platformDescription?: string;
    public creationDate?: Date;
    public updateDate?: Date;

    public username?: string;
    public urlAdress?: string;
    public idUser?:string;

    constructor(id?:string, publicKey?: string, platformName?: string,  platformDescription?: string, creationDate?: Date, updateDate?: Date ,  username?:string ,urlAdress?:string,idUser?: string)  {
        this.id = id;
        this.publicKey = publicKey;
        this.platformName = platformName ;
        this.platformDescription = platformDescription;
        this.creationDate = creationDate;
        this.updateDate = updateDate;
        this.username = username;
        this.urlAdress = urlAdress;
        this.idUser=idUser;
    }
}

export class Note {
    public id?: string;
    public nom?: string;
    public description?: string;
    public dateAjout?: Date;
    public dateModif?: Date;
    
    constructor(id?: string, nom?: string, description?: string, dateAjout?: Date,  dateModif?: Date) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.dateAjout = dateAjout;
        this.dateModif = dateModif;
    
    }

 
}


export class Password {
    public id?: string;
    public idUser?: string;
    public passwordValue?: string;
    public dateAjout?: Date;
    public dateModif?: Date;
    
    constructor(id?: string, idUser?: string, passwordValue?: string, dateAjout?: Date,  dateModif?: Date) {
        this.id = id;
        this.idUser = idUser;
        this.passwordValue = passwordValue;
        this.dateAjout = dateAjout;
        this.dateModif = dateModif;
    
    }

 
}