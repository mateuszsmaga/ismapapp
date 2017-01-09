import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import {init} from '../init.tags';

@Injectable()
export class TagsService extends init{

    constructor(){
        super();
        console.log('TagsService initialized...');
        this.load();
    }



    getTags(){
        var tags = JSON.parse(localStorage.getItem('tags'));
        return tags;
    }
}

//Tag interface
interface tag{
  text: string;
  lat: number;
  lng: number;
}