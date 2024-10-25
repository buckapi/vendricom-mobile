import { Component } from '@angular/core';
import { PocketAuthService } from '@app/services/auth-pocketbase.service';
import { GlobalService } from '@app/services/global-service.service';

@Component({
  selector: 'app-jurisprudencias',
  standalone: true,
  imports: [],
  templateUrl: './jurisprudencias.component.html',
  styleUrl: './jurisprudencias.component.css'
})
export class JurisprudenciasComponent {
  constructor (
    public auth: PocketAuthService,
    public global: GlobalService,
  ){}
}
