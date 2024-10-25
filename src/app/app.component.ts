import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID,Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { HttpClient,  } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ScriptLoaderService } from './services/script-loader.service';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { HeaderComponent } from "./components/ui/header/header.component";
import { GlobalService } from './services/global-service.service';
import { BookingComponent } from './components/booking/booking.component';
// import { PocketbaseService } from './services/pocketbase.service';
import { bootstrapApplication } from '@angular/platform-browser';
import { LoginComponent } from './components/login/login.component';
import { PocketAuthService } from './services/auth-pocketbase.service';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { DetailDocumentsComponent } from './components/detail-documents/detail-documents.component';
import { NormativasComponent } from './components/normativas/normativas.component';
import { ModelosComponent } from './components/modelos/modelos.component';
import { BoletinesComponent } from './components/boletines/boletines.component';
import { JurisprudenciasComponent } from './components/jurisprudencias/jurisprudencias.component';
import { CapacitacionesComponent } from './components/capacitaciones/capacitaciones.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ChatComponent,
    HomeComponent,
    ProfileComponent,
    FooterComponent,
    HeaderComponent,
    BookingComponent,
    LoginComponent,
    HomeUserComponent,
    DetailDocumentsComponent,
    NormativasComponent,
    ModelosComponent,
    BoletinesComponent,
    JurisprudenciasComponent,
    CapacitacionesComponent
  

],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isButtonClicked: boolean = false;
  constructor( @Inject(PLATFORM_ID) private platformId: Object,
  private scriptLoader: ScriptLoaderService,
  public auth:PocketAuthService,
  // public pocketbase: PocketbaseService,
  public global: GlobalService) {}
  onMenuClick() {
    this.isButtonClicked = !this.isButtonClicked; // Cambia el estado entre true y false
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scriptLoader
        .loadScripts([
          'assets/js/bootstrap.min.js',
          'assets/js/jquery.min.js',
          'assets/js/swiper-bundle.min.js',
          'assets/js/carousel.js',
          'assets/js/init.js',
          'assets/js/main.js',
          'assets/js/multiple-modal.js',
        ])
        .then((data) => {
          console.log('Todos los scripts se han cargado correctamente', data);
        })
        .catch((error) => console.error('Error al cargar los scripts', error));
    }
  }
}
