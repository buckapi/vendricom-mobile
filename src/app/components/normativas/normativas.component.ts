import { Component } from '@angular/core';
import { PocketAuthService } from '@app/services/auth-pocketbase.service';
import { GlobalService } from '@app/services/global-service.service';

@Component({
  selector: 'app-normativas',
  standalone: true,
  imports: [],
  templateUrl: './normativas.component.html',
  styleUrl: './normativas.component.css'
})
export class NormativasComponent {
constructor (
  public auth: PocketAuthService,
  public global: GlobalService,
){}
}
