import { CommonModule, isPlatformBrowser } from '@angular/common'
import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output, PLATFORM_ID} from '@angular/core'
import { Html5Qrcode } from 'html5-qrcode'

@Component({
  selector: 'scanner-qrcode-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scanner-qrcode.component.html',
  styleUrl: './scanner-qrcode.component.scss'
})
export class ScannerQrCodeComponent implements OnInit, OnDestroy {
  @Output() cpf = new EventEmitter(); // EventEmitter to emit the scanned CPF
  private html5QrCode!: Html5Qrcode;
  private isFrontCamera: boolean = false;  // Controle da câmera (frontal ou traseira)
  private qrCodeElementId: string = "reader";  // ID do elemento do QR Code
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Verifica se é um navegador
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.initializeScanner();  // Inicializa o scanner se estiver no navegador
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.html5QrCode.stop().catch(err => console.error("Erro ao parar o scanner", err)); 
    }
  }

  // Função para inicializar o scanner
  private initializeScanner() {
    if (this.isBrowser) {
      this.html5QrCode = new Html5Qrcode(this.qrCodeElementId);

      // Configurações do scanner
      const config = { fps: 5, qrbox: { width: 450, height: 450 } };

      // Inicia com a câmera traseira (facingMode: "environment")
      this.startScanner("environment", config);
    }
  }

  // Função para iniciar o scanner com a câmera especificada
  private startScanner(facingMode: string, config: any) {
    if (this.isBrowser) {
      this.html5QrCode.start(
        { facingMode: facingMode }, // Câmera escolhida (frontal ou traseira)
        config,
        (decodedText) => {
          this.cpf.emit(decodedText);
        },
        (errorMessage) => {
          console.warn(`Erro na leitura: ${errorMessage}`);
        }
      ).catch(err => console.error("Erro ao iniciar o scanner", err)); 
    }
  }

  // Função para alternar entre a câmera frontal e traseira
  toggleCamera() {
    if (this.isBrowser) {
      const newCamera = this.isFrontCamera ? "environment" : "user";  // Alterna a câmera
      const config = { fps: 5, qrbox: { width: 600, height: 600 } };
  
      // Para o scanner atual e reinicia com a nova câmera
      this.html5QrCode.stop().then(() => {
        this.startScanner(newCamera, config);
        this.isFrontCamera = !this.isFrontCamera;  // Atualiza o estado da câmera
      }).catch(err => console.error("Erro ao alternar a câmera", err)); 
    }
  }
}