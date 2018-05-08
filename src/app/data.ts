import { Component, Inject } from '@angular/core';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';

export class Data {
    public data:any=[]

    constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService) {
     
    }

    saveInSession(key, val): void {
        console.log('recieved= key:' + key + 'value:' + val);
        this.storage.set(key, val);
        this.data[key]= this.storage.get(key);
    }

    getFromSession(key): void {
        console.log('recieved= key:' + key);
        this.data[key]= this.storage.get(key);
        console.log(this.data);
    }
}
