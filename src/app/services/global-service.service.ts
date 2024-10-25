import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
export interface Document {

  id: number,
  fatherId:string,
  categories:string [],
  temas:string [],
  files:string [],
  images: string[]; // O el tipo adecuado para las imágenes
  issue: string,
  serial: string,
  receiver: string,
  subject: string,
  entity: string,
  status: string,

}
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private _activateRoute = 'home';
  documentSelected: Document = {
    id: 0,
    fatherId:'',
    categories: [],
    temas: [],
    files: [],
    issue: '',
    images: [],
    serial: '',
    receiver: '',
    subject: '',
    entity: '',
    status: '',
  };
  activeRoute="login";
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  get activateRoute(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('activateRoute') || this._activateRoute;
    }
    return this._activateRoute;
  }

  setRoute(route: string) {
    if (isPlatformBrowser(this.platformId)) {
      const isLoggedin = localStorage.getItem('isLoggedin') === 'true';
  
      if (route === 'profile') {
        route = isLoggedin ? 'profile' : 'login';
      }
  
      this._activateRoute = route;
      localStorage.setItem('activateRoute', route);
    } else {
      this._activateRoute = route;
    }
  } 

   /*  setRoute(route:string){
    this.activeRoute=route;
  } */

  viewDocuments(document:any){
    this.documentSelected=document;
    this.activeRoute="detail-documents";
  }

  previewCard: {
    id: string;
    region: string;
    municipality: string[];
    code: string;
    title: string;
    address: string;
    status: string;
    description: string;
    typeProperty: string;
    bedrooms: string;
    livinromm: string;
    kitchen: string;
    bathroom: string;
    parking: string;
    stratum: string;
    area: string;
    canon: string;
    phone: string;
    images: string[];
  } = {
    id: '',
    region: '',
    municipality: [],
    code: '',
    title: '',
    address: '',
    status: '',
    description: '',
    typeProperty: '',
    bedrooms: '',
    livinromm: '',
    kitchen: '',
    bathroom: '',
    parking: '',
    stratum: '',
    area: '',
    canon: '',
    phone: '',
    images: [],
  };
  
}
