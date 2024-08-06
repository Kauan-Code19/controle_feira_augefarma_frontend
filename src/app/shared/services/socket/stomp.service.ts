import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import { PharmacyRepresentativeResponse } from '../../../interfaces/pharmacy_representative/pharmacy-representative-response';
import { EntitiesListResponse } from '../../../interfaces/socket/entities-list-response';
import { isPlatformBrowser } from '@angular/common';
import { LaboratoryMemberResponse } from '../../../interfaces/laboratory/laboratory-member-response';

@Injectable({
  providedIn: 'root'
})
export class StompService implements OnDestroy{
  private client: Client | undefined;
  private pharmacyRepresentativeSubject = new BehaviorSubject<PharmacyRepresentativeResponse[]>([]);
  private laboratoryMemberSubject = new BehaviorSubject<LaboratoryMemberResponse[]>([]);

  pharmacyRepresentative$ = this.pharmacyRepresentativeSubject.asObservable();
  laboratoryMember$ = this.laboratoryMemberSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Executar apenas no lado do cliente
      this.client = new Client({
        brokerURL: 'ws://localhost:8080/realtime',
        connectHeaders: {},
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: (frame) => {
          console.log('Connected: ' + frame);

          this.client!.publish({ destination: '/app/get-initial-data', body: '' });

          this.client!.subscribe('/topic/realtime', (message: Message) => {

            try {
              const data: EntitiesListResponse = JSON.parse(message.body);

              if (data.pharmacyRepresentatives) {
                this.pharmacyRepresentativeSubject.next(data.pharmacyRepresentatives);
              }

              if (data.laboratoryMembers) {
                this.laboratoryMemberSubject.next(data.laboratoryMembers);
              }
            } catch (error) {
              console.error('Error parsing message body:', error, message.body);
            }
          });
        },

        onStompError: (error) => {
          console.error('STOMP error: ', error);
        },
        
        onWebSocketClose: (event) => {
          console.log('WebSocket closed: ', event);
        }
      });

      // Ativa o cliente STOMP
      this.client.activate();
    }
  }

  ngOnDestroy() {
    // Desconecta-se quando o componente é destruído
    if (this.client && this.client.connected) {
      this.client.deactivate();
    }
  }
}
