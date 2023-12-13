import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { NameSw, DataLogin, DataValueEmail, DataOptNumberVale,
         DataOptSend,DataSendEmail, DataSendChangePassword } from '../../../api/variable';
import { AuthService } from 'src/app/guard/auth.service';
import { Router } from '@angular/router';
import { AuthService as Services } from './../../../../services/auth.service';
import { sha256 } from "js-sha256";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

    vs: NameSw = {
        mensaje: '¡Bienvenido!',
        nombre: 'CIAP',
        nombre_completo: 'CENTRO INTELIGENTE DE ADMINISTRACIÓN DE PROYECTOS',
        version: '1.0.0',
        mensaje_ol_c: '¿Has olvidado tu contraseña?',
    };

    dapp: DataLogin = {
        user: null,
        pass: null,
        mail: null,
    };

    dopp: DataValueEmail = {
        mail: null
    };

    otpNum: DataOptNumberVale = {
        num1: null,
        num2: null,
        num3: null,
        num4: null
    }

    dappotp: DataOptSend = {
        idUsuario: null,
        tokenUsuario: null
    }

    dappEmail: DataSendEmail = {
        id_usuario:null,
        nombres: null,
        apellidos:null,
        email: null
    }

    dappResPass:  DataSendChangePassword = {
        id_usuario: null,
        contrasena: null,
        Recontrasena: null
    }


    correo: string = null;
    display: boolean = false;
    fieldTextType: boolean;
    fieldChPw: boolean;
    anima: any ;
    iconClass: string = 'pi';
    msmErr: string;
    DonClass:boolean = true;

 
    otpView:boolean = false; 
    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private rute: Router,
        private server: Services
    ) {}

    ViewPassword(): void {
        this.fieldTextType = !this.fieldTextType;
    }

    ViewPasswordNew(): void {
        this.fieldChPw = !this.fieldChPw;
    }


    onLogin(): void {
        if (this.dapp.user === '' || this.dapp.user === null) {
            alert('debe ingresar usuario');
        } else if (this.dapp.pass === '' || this.dapp.pass === null) {
            alert('debe ingresar contraseña');
        } else {
            if (this.dapp.user.includes('@')) {
                this.dapp.mail = this.dapp.user;
                this.dapp.user = '';

                this.ServicesValueData();
            } else {
                this.dapp.mail = '';

                this.ServicesValueData();
            }
        }
    }

    ServicesValueData(): void {
        this.dapp.pass =  sha256.hex(this.dapp.pass);
        this.server.postData(this.dapp).subscribe((res) => {
            const response = res.response;
            const data = res.data;
            if (response.status === 'ok') {
                var ifl = this.authService.login();
                if (ifl === true) {
                    localStorage.setItem('dataUSer', JSON.stringify(data));
                    this.rute.navigate(['/']);
                } else {
                    alert('La informacion ingresada no es correcta');
                }
            } else {
                alert('La informacion ingresada no es correcta');
            }
        });
    }

    showDialog() {
        this.display = true;
    }

    onBlur(): void {

        console.log('Has dejado de escribir.', this.correo);
        if (this.correo === '' || this.correo === null) {
            this.msmErr = 'El campo no puede ser verificado si esta vacio.'
        }else{
            var evalueCorreo = this.validarCorreo(this.correo);
        }       
        this.AnamacionVerificar(evalueCorreo)
    }


    AnamacionVerificar(e: any): void {
         this.anima = false;
        if (e) {
            this.dopp.mail = this.correo;
            this.server.postDataValCorre(this.dopp).subscribe((res)=>{
                const response = res['response'].status;
                const data = res['data'];

                
                if (response === "ok") {
                    setTimeout(() => {
                        this.anima = true;
                        this.msmErr= null;
                        this.otpView = true;
                    }, 600); 
                    localStorage.setItem('DataOpt', JSON.stringify(data))
                    this.dappEmail = {
                        id_usuario: data.id_usuario,
                        nombres:  data.nombres,
                        apellidos: data.apellidos,
                        email:  data.correo
                    }
                    console.log(this.dappEmail);
                    
                    this.server.postDataSendCorreo(this.dappEmail).subscribe((res)=>{
                        console.log(res);
                        
                    });
                }else{
                    setTimeout(() => {
                        this.anima = false;
                        this.msmErr= "El correo ingresado no es valido.";
                        this.otpView = false;
                    }, 600); 
                }


            });

            
        }else{
            this.msmErr = 'El correo ingresado no posee @, .com, .co, o punto. Favor verifique'
            setTimeout(() => {
                this.anima = 'err';
                setTimeout(() => {
                    this.anima = false;
                    setTimeout(() => {
                        this.anima = null;
                      }, 900); 
                  }, 5000); 
              }, 600); 
        }

    }

    validarCorreo(correo: string): boolean {
        // Expresión regular para validar el formato de un correo electrónico básico
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexCorreo.test(correo);
    }

    validarPassword(password: string){
        const expresion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{7,14}[^'\s]/;
        return expresion.test(password);
    }


    
    onBourNewPass() : void{
        var valueKey = this.validarPassword(this.dappResPass.contrasena)

        if (valueKey) {
                console.log('ok');
                this.ErrPws = "";
        }else{
            this.ErrPws = "La contraseña digitada con cumple con las politicas de seguridad.";
        }
    }


    ErrPws: string;
    ErrPwsR: string;
    ValidarNuevaClave():void {

        if (this.dappResPass.Recontrasena != this.dappResPass.contrasena) {
            this.ErrPwsR = "La verificación debe ser igual a la contraseña ingresada incialmente.";
        }else{
            this.ErrPwsR = ""
            var data = JSON.parse(localStorage.getItem('DataOpt'));
            this.dappResPass = {
                id_usuario: data.id_usuario,
                contrasena: sha256.hex(this.dappResPass.contrasena),
                Recontrasena: ''
            }

            console.log(this.dappResPass);
            
            this.server.postDataChangePass(this.dappResPass).subscribe((res)=>{
                console.log(res);
            })
        }
 
    }

    validarOptDataSend(): void{
            var dataOpt = JSON.parse(localStorage.getItem('DataOpt'));

            this.dappotp = {
                idUsuario : dataOpt.id_usuario,
                tokenUsuario : this.otpNum.num1 + this.otpNum.num2 + this.otpNum.num3 + this.otpNum.num4
            }
            this.server.posDataValueOpt(this.dappotp).subscribe((res)=>{
                    console.log(res);
                    const response = res;

                    if (response['status'] === 'no') {
                            alert(response['mensaje']);
                            this.DonClass = true;
                    }else{
                        alert(response['mensaje']);
                        this.DonClass = false;
                        this.otpView = false;
                    }
            });
            
    }

}