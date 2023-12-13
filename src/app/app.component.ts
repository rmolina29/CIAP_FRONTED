import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './guard/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    
    constructor(private authService: AuthService, private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
            // // Verificar el contador de ventanas al cargar el componente
            // const windowCount = this.authService.getWindowCount();
            // if (windowCount > 3) {
            // // Puedes cerrar la ventana actual o realizar alguna acción
            // // Aquí simplemente redirigimos al usuario a una página de error
            // window.location.href = '/error';
            // }
    }


}
