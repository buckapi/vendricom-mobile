import { Injectable, OnDestroy } from '@angular/core';
import PocketBase from 'pocketbase';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RealtimeSpecialistsService implements OnDestroy {
  private pb: PocketBase;

  // Definir BehaviorSubjects y Observables específicos
  private documentsSubject = new BehaviorSubject<any[]>([]);
  public documents$: Observable<any[]> = this.documentsSubject.asObservable();

  private repositoriosSubject = new BehaviorSubject<any[]>([]);
  public repositorios$: Observable<any[]> = this.repositoriosSubject.asObservable();

  // Puedes agregar más BehaviorSubjects y Observables si es necesario
  // private anotherCollectionSubject = new BehaviorSubject<any[]>([]);
  // public anotherCollection$: Observable<any[]> = this.anotherCollectionSubject.asObservable();

  constructor() {
    this.pb = new PocketBase('https://db.buckapi.com:8090');
    this.subscribeToCollections();
  }

  private async subscribeToCollections() {
    // (Opcional) Autenticación
    await this.pb
      .collection('users')
      .authWithPassword('admin@email.com', 'admin1234');

    // Suscribirse a las colecciones específicas
    this.pb.collection('vendricomDocuments').subscribe('*', (e) => {
      this.handleRealtimeEvent(e, 'documents');
    });
    this.pb.collection('vendricomRepositorios').subscribe('*', (e) => {
      this.handleRealtimeEvent(e, 'repositorios');
    });


    // Inicializar las listas
    this.updateDocumentsList();
    this.updateRepositorios();
  }

 
  private handleRealtimeEvent(event: any, collectionName: string) {
    console.log(`Evento en ${collectionName}: ${event.action}`);
    console.log(event.record);

    // Actualizar la lista de la colección correspondiente
    this.updateDocumentsList();
    this.updateRepositorios();
  }

  private async updateDocumentsList() {
    const records = await this.pb
    .collection('vendricomDocuments')
    .getFullList(200 /* cantidad máxima de registros */, {
      sort: '-created', // Ordenar por fecha de creación
    });
  this.documentsSubject.next(records);
  }

  private async updateRepositorios() {
    // Obtener la lista actualizada de especialistas
    const records = await this.pb
      .collection('vendricomRepositorios')
      .getFullList(200 /* cantidad máxima de registros */, {
        sort: '-created', // Ordenar por fecha de creación
      });
    this.repositoriosSubject.next(records);
  }

  ngOnDestroy() {
    // Desuscribirse de las colecciones cuando el servicio se destruye
    this.pb.collection('vendricomDocuments').unsubscribe('*');
    this.pb.collection('vendricomRepositorios').unsubscribe('*');
    // Desuscribirse de otras colecciones si es necesario
  }

}
