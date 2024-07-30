import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ClientResponse } from '../../interfaces/client/client-response';
import { LaboratoryResponse } from '../../interfaces/laboratory/laboratory-response';
import { StompService } from '../../shared/services/socket/stomp.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mapping-component',
  standalone: true,
  imports: [CommonModule],
  providers: [StompService],
  templateUrl: './mapping.component.html',
  styleUrl: './mapping.component.scss'
})
export class MappingComponent implements OnInit, OnDestroy {
  clients: ClientResponse[] = [];
  laboratories: LaboratoryResponse[] = [];
  currentDateTime: string = new Date().toLocaleString();
  private intervalId: any;

  private subscriptions: Subscription[] = [];

  constructor(private stompService: StompService, private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.stompService.cliente$.subscribe((clients) => {
        this.clients = clients;
      })
    )

    this.subscriptions.push(
      this.stompService.laboratorio$.subscribe((laboratories) => {
        this.laboratories = laboratories;
      })
    );

    // Atualiza a data/hora atual a cada segundo
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.updateDateTime();
      }, 1000);
    });
  }

  private updateDateTime(): void {
    this.currentDateTime = new Date().toLocaleString();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}
