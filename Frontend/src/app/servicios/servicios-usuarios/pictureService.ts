import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable()
export class PictureService {

    constructor(private http: HttpClient) { }

    public get(url:string){
      console.log(url);
      return this.http.get(url); // GET  
    }
  
    public post(url:string, body){
      console.log(url);
      return this.http.post(url,body); // POST  
    }
}