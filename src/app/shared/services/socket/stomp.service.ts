import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import { LaboratoryResponse } from '../../../interfaces/laboratory/laboratory-response';
import { ClientResponse } from '../../../interfaces/client/client-response';
import { EntitiesListResponse } from '../../../interfaces/socket/entities-list-response';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StompService implements OnDestroy{
  private client: Client | undefined;
  private clienteSubject = new BehaviorSubject<ClientResponse[]>([]);
  private laboratorioSubject = new BehaviorSubject<LaboratoryResponse[]>([]);

  cliente$ = this.clienteSubject.asObservable();
  laboratorio$ = this.laboratorioSubject.asObservable();

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

              if (data.clients) {
                this.clienteSubject.next(data.clients);
              }

              if (data.laboratories) {
                this.laboratorioSubject.next(data.laboratories);
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
