import { Injectable } from '@angular/core';

@Injectable()
export class authService {

    users = [ 
        { "username": "user1", 
            "password": "pass1", 
            "fullName": "John Doe" }, 
        { "username": "user2", 
            "password": "pass2", 
            "fullName": "Adam Smith" } ]


    auth (username: string, password:string ):boolean {
        var result = false;
        this.users.map(user=>{
            if(user.username == username && 
                user.password == password )
                    result = true;
        });
        return result;
    }

    getFullName(username:string):string{
        var result = '';
        this.users.map(user => {
            if(user.username == username)
                result = user.fullName;
        });
        return result;
    }
}