import PocketBase from 'pocketbase';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

import { Observable, from } from 'rxjs';

import { UserInterface } from '@app/interfaces/user-interface'; // Asegúrate de que la ruta sea correcta
import { GlobalService } from '@app/services/global-service.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PocketAuthService {
  private pb: PocketBase;

  constructor(public global: GlobalService) {
    this.pb = new PocketBase('https://db.buckapi.com:8090');
  }
  async saveRepositorios(repositoriosData: any): Promise<any> {
    try {
      const record = await this.pb
        .collection('vendricomRepositorios')
        .create(repositoriosData);
      console.log('repositorio guardada exitosamente:', record);

      return record; // Si necesitas devolver el registro creado
    } catch (error) {
      console.error('Error al guardar la repositorio:', error);
      throw error; // Puedes lanzar el error para manejarlo en otro lugar
    }
  }
  async saveCategor(categoryData: any): Promise<any> {
    try {
      const record = await this.pb
        .collection('vendricomDocuments')
        .create(categoryData);
      console.log('documento guardada exitosamente:', record);

      return record; // Si necesitas devolver el registro creado
    } catch (error) {
      console.error('Error al guardar la documento:', error);
      throw error; // Puedes lanzar el error para manejarlo en otro lugar
    }
  }

  async saveSpecialty(specialtyData: any): Promise<any> {
    try {
      const record = await this.pb
        .collection('vendricomNormativas')
        .create(specialtyData);
      console.log('normativa guardada exitosamente:', record);
      // this.global.getSpecialties();
      return record; // Si necesitas devolver el registro creado
    } catch (error) {
      console.error('Error al guardar la normativa:', error);
      throw error; // Puedes lanzar el error para manejarlo en otro lugar
    }
  }
  isLogin() {
    return localStorage.getItem('isLoggedin');
  }

  registerUser(
    email: string,
    password: string,
    type: string,
    name: string
  ): Observable<any> {
    const userData = {
      email: email,
      password: password,
      passwordConfirm: password,
      type: type,
      username: name,
      name: name,
    };

    // Crear usuario y luego crear el registro en camiwaTravelers
    return from(
      this.pb
        .collection('users')
        .create(userData)
        .then((user) => {
          const data = {
            name: name,
            address: '', // Agrega los campos correspondientes aquí
            phone: '', // Agrega los campos correspondientes aquí
            userId: user.id, // Utiliza el ID del usuario recién creado
            status: 'pending', // Opcional, establece el estado del cliente
            images: {}, // Agrega los campos correspondientes aquí
          };
          return this.pb.collection('vendricomClients').create(data);
        })
    );
  }

  onlyRegisterUser(
    email: string,
    password: string,
    type: string,
    name: string
  ): Observable<any> {
    const userData = {
      email: email,
      password: password,
      passwordConfirm: password,
      type: type,
      username: name,
      name: name,
    };

    // Crear usuario y devolver el observable con el usuario creado
    return from(
      this.pb
        .collection('users')
        .create(userData)
        .then((user) => {
          // No se necesita crear ningún registro adicional en camiwaTravelers aquí
          return user; // Devolver los datos del usuario creado
        })
    );
  }

  loginUser(email: string, password: string): Observable<any> {
    return from(this.pb.collection('users').authWithPassword(email, password));
  }

  logoutUser(): Observable<any> {
    // Limpiar la autenticación almacenada
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('dist');
    localStorage.removeItem('userId');
    localStorage.removeItem('type');
    localStorage.removeItem('clientCard');
    localStorage.removeItem('clientFicha');
    this.pb.authStore.clear();
    this.global.setRoute('home');
    // this.virtualRouter.routerActive = "home";
    return new Observable<any>((observer) => {
      observer.next(); // Indicar que la operación de cierre de sesión ha completado
      observer.complete();
    });
  }

  setToken(token: any): void {
    localStorage.setItem('accessToken', token);
  }

  setUser(user: UserInterface): void {
    let user_string = JSON.stringify(user);
    let type = JSON.stringify(user.type);
    localStorage.setItem('currentUser', user_string);
    localStorage.setItem('type', type);
  }
}
