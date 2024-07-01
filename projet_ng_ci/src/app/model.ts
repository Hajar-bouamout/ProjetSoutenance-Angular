import { Subject } from "rxjs";

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
    public decryptedPassword?:string;
    public showPassword?:boolean;

    constructor(id?:string, publicKey?: string, platformName?: string,  platformDescription?: string, creationDate?: Date, updateDate?: Date ,  username?:string ,urlAdress?:string,idUser?: string, decryptedPassword?:string, showPassword?:boolean)  {
        this.id = id;
        this.publicKey = publicKey;
        this.platformName = platformName ;
        this.platformDescription = platformDescription;
        this.creationDate = creationDate;
        this.updateDate = updateDate;
        this.username = username;
        this.urlAdress = urlAdress;
        this.idUser=idUser;
        this.decryptedPassword = decryptedPassword;
        this.showPassword = showPassword;
    }
}

export class Note {
    public id?: string;
    public nom?: string;
    public description?: string;
    public dateAjout?: Date;
    public dateModif?: Date;
    public contenu?: String;
    public idUser?: string;
     public publicKey?: string;
    
    constructor(id?: string, nom?: string, description?: string, dateAjout?: Date,  dateModif?: Date , contenu?: string ,idUser?: string ,publicKey?: string ) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.dateAjout = dateAjout;
        this.dateModif = dateModif;
         this.contenu= contenu;
         this.publicKey=publicKey;
         this.idUser =idUser;

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

    
    // private String id;
    // private String platformName;
    // private String platformDescription;
    // private LocalDate creationDate;
    // private LocalDate updateDate;
    // private String username;
    // private String urlAdress;
    // private String password;


export class CompteResponse{
    public id?: string;
    public platformName?: string;
    public platformDescription?: string;
    public creationDate?: Date;
    public updateDate?: Date;
    public username?: string;
    public urlAdress?: string;
    public password?: string;
    public email?: string;
    public decryptedPassword?:string;
    public showPassword?:boolean;
    

    constructor(id?: string, platformName?: string, platformDescription?: string, creationDate?: Date,  updateDate?: Date, username?: string, urlAdress?: string, password?: string, email?: string, decryptedPassword?:string, showPassword?:boolean) {
        this.id = id;
        this.platformName = platformName;
        this.platformDescription = platformDescription;
        this.creationDate = creationDate;
        this.updateDate = updateDate;
        this.username = username;
        this.urlAdress = urlAdress;
        this.password = password;
        this.email = email;
        this.decryptedPassword = decryptedPassword;
        this.showPassword = showPassword
    
    
    }


}



    



export class CreateCompteRequest{
    public platformName?: string;
    public platformDescription?: string;
    public creationDate?: Date;
    public username?: string;
    public urlAdress?: string;
    public password?: string;
    public userId?: string;
    

    constructor(platformName?: string, platformDescription?: string, creationDate?: Date, username?: string, urlAdress?: string, password?: string, userId?: string) {
        this.platformName = platformName;
        this.platformDescription = platformDescription;
        this.creationDate = creationDate;
        this.username = username;
        this.urlAdress = urlAdress;
        this.password = password;
        this.userId =  userId;
        
    
    }


}

export class PasswordCheckRequest{

public password?: String;

constructor(password?: string){

    this.password = password;
}

}

export class ResetPasswordRequest {


public token?: string;
public newPassword?: string;


constructor(token?: string , newPassword?: string){

    this.token=token;
    this.newPassword=newPassword;
}



}


export class PasswordCheckResponse{

    public isStrong?: Boolean;
    public isVulnerable?: Boolean;
    public message?: String;
    

    constructor(isStrong?: Boolean, isVulnerable?: Boolean, message?: String){
        this.isStrong = isStrong;
        this.isVulnerable = isVulnerable;
        this.message = message;
        
    }
}


export class PasswordGeneratedResponse{

    public password?: string;
    
    constructor(password?: string){
    
        this.password = password;
    }
    
    }

