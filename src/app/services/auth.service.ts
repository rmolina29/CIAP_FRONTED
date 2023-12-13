import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataLogin, DataValueEmail, DataOptSend, DataSendEmail, DataSendChangePassword } from "../demo/api/variable";
import { environment  as env} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl = env.endPoint; // Reemplaza con la URL de tu backend
  
  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
    })
  };

  constructor(private http: HttpClient) { }


  postData(data: DataLogin): Observable<any> {
    const url = `${this.baseUrl}/auth/login`;
    return this.http.post(url, data, this.httpOptions);
  }

  postDataValCorre(data: DataValueEmail){
      const url = `${this.baseUrl}/auth/email_verificacion`;
      return this.http.post(url, data, this.httpOptions); 
  }

  postDataSendCorreo(data: DataSendEmail){
    const url = `${this.baseUrl}/auth/olvidar_contrasena`;
    return this.http.post(url, data, this.httpOptions); 
}

  posDataValueOpt(data: DataOptSend){
    const url = `${this.baseUrl}/auth/validaToken`;
    return this.http.post(url, data, this.httpOptions); 
  }

  postDataChangePass(data: DataSendChangePassword){
    const url = `${this.baseUrl}auth/cambio_contrasena`;
    return this.http.post(url, data, this.httpOptions); 
  }

}
