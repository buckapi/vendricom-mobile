import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from '../ui/footer/footer.component';
import { RealtimeSpecialistsService } from '@app/services/realtime-specialists.service';

// import { PocketbaseService } from '@app/services/pocketbase.service';
import { CommonModule } from '@angular/common';
import { GlobalService } from '@app/services/global-service.service';
import { PocketAuthService } from '@app/services/auth-pocketbase.service';
interface Specialty {
  name: string;
  id: string;
  fatherId: string;
}
interface documents {
/*   name: string;
 *//*   id: string;
 */  fatherId: string;
  id: string; 
  categories: any[];
  temas: any[];
  files: string[];
  issue: string;
  image: string;
  serial: string;
  receiver: string;
  subject: string;
  entity: string;
  status: string;
}

@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [FooterComponent, CommonModule],
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css'
})
export class HomeUserComponent implements OnInit, OnDestroy{
  specialists: any[] = [];
  documents: any []=[];
  publicidades: any []=[];
  repositorios: any []=[];
  docummentSelected: documents = {
    fatherId:'',
    id:'',
    categories: [],
    temas: [],
    files: [],
    issue: '',
    image: '',
    serial: '',
    receiver: '',
    subject: '',
    entity: '',
    status: '',
    

  };
  years: number[] = [];

  data = {
    categories: [] as any[],
    temas: [] as any[],
    files: [] as string[],
    issue: '',
    image: '',
    serial: '',
    receiver: '',
    subject: '',
    entity: '',
    status: '',
  };
  currentIndex = 0; // Para el slider
  intervalId: any; // Para el setInterval del slider
  private subscription: Subscription = new Subscription();
  constructor(private realtimeSpecialistsService: RealtimeSpecialistsService,
    public auth: PocketAuthService,
    public global:GlobalService
  ) {}
  ngOnInit(): void {
    // Agregar la suscripción de documents$ al objeto Subscription
    this.subscription.add(
      this.realtimeSpecialistsService.documents$.subscribe(
        (data) => {
          this.documents = data;
        },
        (error) => {
          console.error('Error al suscribirse a documents$', error);
        }
      )
    );

    // Agregar la suscripción de repositorios$ al objeto Subscription
    this.realtimeSpecialistsService.repositorios$.subscribe(
      (data) => {
        this.repositorios = data;
      },
      (error) => {
        console.error('Error al suscribirse a repositorios$', error);
      }
    );
    this.realtimeSpecialistsService.publicidades$.subscribe(
      (data) => {
        this.publicidades = data;
      },
      (error) => {
        console.error('Error al suscribirse a publicidades$', error);
      }
    );
    
  }
   // Iniciar el slider
   startSlider() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.publicidades.length;
    }, 3000); // Cambia cada 3 segundos
  }
  setPreview(documents:any){
    
    this.global.setRoute('detail-documents');

  }

  ngOnDestroy(): void {
    // Limpiar el intervalo del slider
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    // Desuscribir todas las suscripciones activas
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  shareOnWhatsApp() {
    
    const message = `¡Hola! Bienvenid@ a VENDRICOM, estas interesado en esta promoción:\n\n` +
                  `**Nombre:** ${this.global.previewCard.title}\n` +
                    `**Descripción:** ${this.global.previewCard.description}\n\n` ;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.whatsapp.com/send?phone&text=${encodedMessage}`;
    window.open(url, '_blank');
  }
}
