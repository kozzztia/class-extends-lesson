




class User {
    constructor(name) {

        if (!name || typeof name !== 'string') {
            alert('Incorrect name');
            return;
        }
        this.name = name;
        this.role = 'user';
        this.password = this.#generatePassword();
    }
    #generatePassword(length = 10) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~<>?';
        let password = '';
    
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
    
        return password;
    }
    login() {
        console.log(`${this.role} - ${this.name} login`)
    }
    logout() {
        console.log(`${this.role} - ${this.name} logout`)
    }
    get getName() {
        return this.name;
    }
    get getRole() {
        return this.role;
    }
    set changeName(value) {
        if (!value || typeof value !== 'string') {
            alert('Incorrect name');
        } else {
            this.name = value;
        }
    }
    set changePassword(value) {
        if (!value || value.length < 6) {
            alert('Password should be at least 6 characters long');
        } else {
            this.password = value;
        }
    }
}


class Admin extends User {
    constructor(name) {
        super(name);
        this.role = 'admin';
    }
    addUser(){
        console.log('addUser')
    }
    removeUser(){
        console.log("removeUser")
    }
    changeUserRole(){
        console.log("changeUserRole")
    }
    getAllUsers(){
        console.log("getAllUsers")
    }
    removeAllUsers(){
        console.log('removeAllUsers')
    }
}

const user1 = new User("Petro");
console.log(user1); 
user1.logout()

const admin1 = new Admin("Ivan");
console.log(admin1);
admin1.login();