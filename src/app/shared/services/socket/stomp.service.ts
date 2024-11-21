import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core'
import { Client, Message } from '@stomp/stompjs'
import { BehaviorSubject } from 'rxjs'
import { PharmacyRepresentativeResponse } from '../../../interfaces/pharmacy_representative/pharmacy-representative-response'
import { EntitiesListResponse } from '../../../interfaces/socket/entities-list-response'
import { isPlatformBrowser } from '@angular/common'
import { LaboratoryMemberResponse } from '../../../interfaces/laboratory/laboratory-member-response'
import { environment } from '../../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class StompService implements OnDestroy {
  private client: Client | undefined; // STOMP client instance
  private pharmacyRepresentativeSubject = new BehaviorSubject<PharmacyRepresentativeResponse[]>([]); // BehaviorSubject for pharmacy representatives
  private laboratoryMemberSubject = new BehaviorSubject<LaboratoryMemberResponse[]>([]); // BehaviorSubject for laboratory members

  // Observable streams for pharmacy representatives and laboratory members
  pharmacyRepresentative$ = this.pharmacyRepresentativeSubject.asObservable();
  laboratoryMember$ = this.laboratoryMemberSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Check if running in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.initializeStompClient();
    }
  }

  private initializeStompClient() {
    this.client = new Client({
      brokerURL: environment.brokerURL,
      connectHeaders: {},
      reconnectDelay: 5000,
      heartbeatIncoming: 50000,
      heartbeatOutgoing: 50000,
      onConnect: () => {
        // Primeiro, inscreva-se no tópico para ouvir a resposta
        this.client!.subscribe('/topic/realtime', (message: Message) => {
          try {
            const data: EntitiesListResponse = JSON.parse(message.body);

            // Verifica e atribui os dados iniciais
            if (data.pharmacyRepresentatives) {
              this.pharmacyRepresentativeSubject.next(data.pharmacyRepresentatives);
            }
            if (data.laboratoryMembers) {
              this.laboratoryMemberSubject.next(data.laboratoryMembers);
            }
          } catch (error) {
            console.error('Erro ao processar mensagem:', error, message.body);
          }
        });

        // Depois de se inscrever, solicite os dados iniciais
        this.client!.publish({ destination: '/app/get-initial-data', body: '' });
      },
      onStompError: (error) => {
        console.error('Erro STOMP:', error);
      },
      onWebSocketClose: (event) => {
        console.log('WebSocket fechado:', event);
      }
    });

    this.client.activate();
  }

  ngOnDestroy() {
    if (this.client && this.client.connected) {
      this.client.deactivate();
    }
  }
}