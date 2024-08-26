import { CommonModule, isPlatformBrowser } from '@angular/common'
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, OnDestroy, Output, PLATFORM_ID, ViewChild } from '@angular/core'
import jsQR from 'jsqr'
import { Subject, timer, takeUntil } from 'rxjs'
import { VIDEO_CONFIG } from '../../../shared/constants/constants'

@Component({
  selector: 'scanner-qrcode-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scanner-qrcode.component.html',
  styleUrl: './scanner-qrcode.component.scss'
})
export class ScannerQrCodeComponent implements AfterViewInit, OnDestroy {
  @Output() cpf = new EventEmitter(); // EventEmitter to emit the scanned CPF
  @ViewChild('videoElement') video!: ElementRef<HTMLVideoElement>; // Reference to the video element
  @ViewChild('canvas', { static: true }) canvas!: ElementRef; // Reference to the canvas element for QR code scanning

  private isBrowser: boolean; // Flag to check if the platform is a browser
  public isCameraActive: boolean = false; // Flag to indicate if the camera is active
  videoStream!: MediaStream; // Stream of the video from the camera
  config = structuredClone(VIDEO_CONFIG); // Configuration for the video stream
  private destroy$ = new Subject<void>(); // Subject to manage component destruction

  result = ''; // Variable to hold the scanned result

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Check if the current platform is a browser
  }

  // Lifecycle hook that is called after the view has been initialized
  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.prepareScanner(); // Prepare the scanner if the platform is a browser
    }
  }

  // Method to switch between front and rear cameras
  changeCamera() {
    let { facingMode } = this.config.video;
    // Toggle the facing mode between 'environment' and 'user'
    this.config.video.facingMode = facingMode === 'environment' ? 'user' : 'environment';
    this.startScanner(); // Restart the scanner with the new camera configuration
  }

  // Method to prepare the scanner by checking for camera availability
  async prepareScanner() {
    const available = await this.checkCamera(); // Check if the camera is available
    if (available && this.isBrowser) {
      await this.startScanner(); // Start the scanner if available
    }
  }

  // Method to start the QR code scanner
  async startScanner() {
    if (this.isBrowser) {
      this.videoStream = await navigator.mediaDevices.getUserMedia(this.config); // Access the camera
      this.video.nativeElement.srcObject = this.videoStream; // Set the video stream to the video element
      this.spyCamera(); // Start capturing frames from the camera
    }
  }

  // Method to continuously capture frames from the camera and scan for QR codes
  spyCamera() {
    if (!this.video.nativeElement) {
      return; // Exit if the video element is not available
    }
  
    const { clientWidth, clientHeight } = this.video.nativeElement; // Get the dimensions of the video element
    this.canvas.nativeElement.width = clientWidth; // Set canvas width
    this.canvas.nativeElement.height = clientHeight; // Set canvas height
  
    const canvas = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D; // Get the canvas context
  
    const captureFrame = () => {
      canvas.drawImage(this.video.nativeElement, 0, 0, clientWidth, clientHeight); // Draw the current video frame onto the canvas
  
      const image = canvas.getImageData(0, 0, clientWidth, clientHeight); // Get image data from the canvas
      const qrcode = jsQR(image.data, image.width, image.height, { inversionAttempts: 'dontInvert' }); // Scan for QR code
  
      if (qrcode) {
        this.cpf.emit(qrcode.data); // Emit the scanned data if a QR code is found
        console.log(qrcode.data); // Log the scanned data
  
        setTimeout(() => {
          timer(800).pipe(takeUntil(this.destroy$)).subscribe(captureFrame); // Continue capturing frames after a delay
        }, 1200);
        return; // Exit if a QR code was found
      }
  
      timer(800).pipe(takeUntil(this.destroy$)).subscribe(captureFrame); // Continue capturing frames every 800ms
    };
  
    captureFrame(); // Start capturing frames
  }

  // Method to check for camera availability and permissions
  async checkCamera() {
    if (this.isBrowser) {
      const cameraPermissions = await navigator.permissions.query({ name: 'camera' } as any); // Query camera permissions
  
      const isOk = cameraPermissions.state !== "denied"; // Check if camera permissions are granted
  
      const hasMediaDevice = 'mediaDevices' in navigator; // Check if media devices are available
      const hasUserMedia = 'getUserMedia' in navigator.mediaDevices; // Check if getUserMedia is supported
  
      if (!hasMediaDevice || (!hasUserMedia && isOk)) {
        alert("I can't access the camera, please check"); // Alert if camera access is denied
      }
  
      return cameraPermissions.state !== "denied"; // Return true if camera access is granted
    }
    return false; // Return false if not a browser
  }  

  // Lifecycle hook that is called when the component is destroyed
  ngOnDestroy() {
    if (this.isBrowser && this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop()); // Stop all video tracks
      this.video = null!; // Nullify the video element reference
    }
  
    this.destroy$.next(); // Emit next value to complete the Subject
    this.destroy$.complete(); // Complete the Subject
  }
}