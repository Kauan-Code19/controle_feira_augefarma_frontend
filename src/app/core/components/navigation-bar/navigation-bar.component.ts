import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { NgOptimizedImage } from '@angular/common'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { EventSegment } from '../../../shared/enums/event-segment'

@Component({
  selector: 'navigation-bar-component',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, RouterModule],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  EventSegment = EventSegment

  constructor(private router: Router) {}

  // Logout function to remove token and redirect to login page
  logout(): void {
    // Remove token and token expiration from sessionStorage
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("tokenExpiration")

    // Redirect to login page
    this.router.navigate(['/login'])
  }

  // Check if the current page is the login page
  isLoginPage(): boolean {
    return this.router.url === '/login'
  }

  // Check if the mapping page is active
  isMappingActive(): boolean {
    return this.router.url.startsWith('/mapping')
  }

  // Check if the register page is active
  isRegisterActive(): boolean {
    return this.router.url.startsWith('/register')
  }

  // Check if the register page is active
  isDeleteActive(): boolean {
    return this.router.url.startsWith('/delete')
  }

  // Check if the checking page is active
  isCheckingActive(): boolean {
    return this.router.url.startsWith('/checking')
  }

  // Check if the generate badge page is active
  isGenerateBadgeActive(): boolean {
    return this.router.url.startsWith('/generate-badge')
  }
}
