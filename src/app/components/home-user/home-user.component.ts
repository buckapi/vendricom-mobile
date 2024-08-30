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
  name: string;
  id: string;
  fatherId: string;
}
@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [FooterComponent, CommonModule],
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css'
})
export class HomeUserComponent {
  specialists: any[] = [];
  documents: any []=[];
  private subscription: Subscription = new Subscription();
  constructor(private realtimeSpecialistsService: RealtimeSpecialistsService,
    public auth: PocketAuthService,
    public global:GlobalService
  ) {}
  ngOnInit(): void {
    this.realtimeSpecialistsService.documents$.subscribe((data) => {
      this.documents = data;
  
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
