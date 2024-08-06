import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { PharmacyRepresentativeResponse } from '../../interfaces/pharmacy_representative/pharmacy-representative-response';
import { StompService } from '../../shared/services/socket/stomp.service';
import { Subscription } from 'rxjs';
import { LaboratoryMemberResponse } from '../../interfaces/laboratory/laboratory-member-response';

@Component({
  selector: 'mapping-component',
  standalone: true,
  imports: [CommonModule],
  providers: [StompService],
  templateUrl: './mapping.component.html',
  styleUrl: './mapping.component.scss'
})
export class MappingComponent implements OnInit, OnDestroy {
  pharmacyRepresentatives: PharmacyRepresentativeResponse[] = [];
  laboratoryMembers: LaboratoryMemberResponse[] = [];
  currentDateTime: string = new Date().toLocaleString();
  private intervalId: any;

  private subscriptions: Subscription[] = [];

  constructor(private stompService: StompService, private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.stompService.pharmacyRepresentative$.subscribe((pharmacyRepresentatives) => {
        this.pharmacyRepresentatives = pharmacyRepresentatives;
      })
    )

    this.subscriptions.push(
      this.stompService.laboratoryMember$.subscribe((laboratoryMembers) => {
        this.laboratoryMembers = laboratoryMembers;
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
