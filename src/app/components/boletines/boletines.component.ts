import { Component } from '@angular/core';
import { PocketAuthService } from '@app/services/auth-pocketbase.service';
import { GlobalService } from '@app/services/global-service.service';

@Component({
  selector: 'app-boletines',
  standalone: true,
  imports: [],
  templateUrl: './boletines.component.html',
  styleUrl: './boletines.component.css'
})
export class BoletinesComponent {
  constructor (
    public auth: PocketAuthService,
    public global: GlobalService,
  ){}
}
