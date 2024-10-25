import { Component } from '@angular/core';
import { PocketAuthService } from '@app/services/auth-pocketbase.service';
import { GlobalService } from '@app/services/global-service.service';

@Component({
  selector: 'app-capacitaciones',
  standalone: true,
  imports: [],
  templateUrl: './capacitaciones.component.html',
  styleUrl: './capacitaciones.component.css'
})
export class CapacitacionesComponent {
  constructor (
    public auth: PocketAuthService,
    public global: GlobalService,
  ){}
}
