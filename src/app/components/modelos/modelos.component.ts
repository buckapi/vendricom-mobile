import { Component } from '@angular/core';
import { PocketAuthService } from '@app/services/auth-pocketbase.service';
import { GlobalService } from '@app/services/global-service.service';

@Component({
  selector: 'app-modelos',
  standalone: true,
  imports: [],
  templateUrl: './modelos.component.html',
  styleUrl: './modelos.component.css'
})
export class ModelosComponent {
  constructor (
    public auth: PocketAuthService,
    public global: GlobalService,
  ){}
}
