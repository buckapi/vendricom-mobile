import { Injectable, OnDestroy } from '@angular/core';
import PocketBase from 'pocketbase';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RealtimeSpecialistsService implements OnDestroy {
  private pb: PocketBase;
  private specialistsSubject = new BehaviorSubject<any[]>([]);

  // Esta es la propiedad que expondrá el Observable para que los componentes puedan suscribirse a ella
  public documents$: Observable<any[]> =
    this.specialistsSubject.asObservable();

  constructor() {
    this.pb = new PocketBase('https://db.buckapi.com:8090');
    this.subscribeToSpecialists();
    this.subscribeToDocuments();
  }

  private async subscribeToSpecialists() {
    // (Opcional) Autenticación
    await this.pb
      .collection('users')
      .authWithPassword('admin@email.com', 'admin1234');

    // Suscribirse a cambios en cualquier registro de la colección 'camiwaSpecialists'
    this.pb.collection('vendricomDocuments').subscribe('*', (e) => {
      this.handleRealtimeEvent(e);
    });

    // Inicializar la lista de especialistas
    this.updateDocumentsList();
  }
  private async subscribeToDocuments  () {
    // (Opcional) Autenticación
    await this.pb
      .collection('users')
      .authWithPassword('admin@email.com', 'admin1234');

    // Suscribirse a cambios en cualquier registro de la colección 'camiwaSpecialists'
    this.pb.collection('vendricomDocuments').subscribe('*', (e) => {
      this.handleRealtimeEvent(e);
    });

    // Inicializar la lista de especialistas
    this.updateDocumentsList();
  }

  private handleRealtimeEvent(event: any) {
    // Aquí puedes manejar las acciones 'create', 'update' y 'delete'
    console.log(event.action);
    console.log(event.record);

    // Actualizar la lista de especialistas
    this.updateDocumentsList();
  }

  private async updateDocumentsList() {
    // Obtener la lista actualizada de especialistas
    const records = await this.pb
      .collection('vendricomDocuments')
      .getFullList(200 /* cantidad máxima de registros */, {
        sort: '-created', // Ordenar por fecha de creación
      });
    this.specialistsSubject.next(records);
  }

  ngOnDestroy() {
    // Desuscribirse cuando el servicio se destruye
    this.pb.collection('vendricomDocuments').unsubscribe('*');
  }
}
