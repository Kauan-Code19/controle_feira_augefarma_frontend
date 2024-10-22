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
      // Initialize the STOMP client with configuration
      this.client = new Client({
        brokerURL: environment.brokerURL, // URL for the STOMP broker
        connectHeaders: {}, // Headers for connection
        reconnectDelay: 5000, // Delay before reconnecting
        heartbeatIncoming: 4000, // Incoming heartbeat interval
        heartbeatOutgoing: 4000, // Outgoing heartbeat interval
        onConnect: (frame) => {
          // Publish a message to get initial data on connection
          this.client!.publish({ destination: '/app/get-initial-data', body: '' });

          // Subscribe to the '/topic/realtime' for updates
          this.client!.subscribe('/topic/realtime', (message: Message) => {
            try {
              const data: EntitiesListResponse = JSON.parse(message.body); // Parse the incoming message

              // Update pharmacy representatives if data is present
              if (data.pharmacyRepresentatives) {
                this.pharmacyRepresentativeSubject.next(data.pharmacyRepresentatives);
              }

              // Update laboratory members if data is present
              if (data.laboratoryMembers) {
                this.laboratoryMemberSubject.next(data.laboratoryMembers);
              }
            } catch (error) {
              console.error('Error parsing message body:', error, message.body); // Log any parsing errors
            }
          });
        },

        onStompError: (error) => {
          console.error('STOMP error: ', error); // Log STOMP errors
        },
        
        onWebSocketClose: (event) => {
          console.log('WebSocket closed: ', event); // Log when WebSocket closes
        }
      });

      this.client.activate(); // Activate the STOMP client
    }
  }

  ngOnDestroy() {
    // Deactivate the STOMP client if it is connected
    if (this.client && this.client.connected) {
      this.client.deactivate();
    }
  }
}