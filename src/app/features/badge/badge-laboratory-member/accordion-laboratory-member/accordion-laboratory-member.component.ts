import { Component, Input } from '@angular/core'
import { LaboratoryMemberResponse } from '../../../../interfaces/laboratory/laboratory-member-response'
import { CommonModule } from '@angular/common'
import { LaboratoryMemberService } from '../../../../shared/services/laboratory/laboratory_member/laboratory-member.service'

@Component({
  selector: 'accordion-laboratory-member-component',
  standalone: true,
  imports: [CommonModule],
  providers: [LaboratoryMemberService],
  templateUrl: './accordion-laboratory-member.component.html',
  styleUrl: './accordion-laboratory-member.component.scss'
})
export class AccordionLaboratoryMemberComponent {
  @Input() results: LaboratoryMemberResponse[] = [] // Input property to receive an array of LaboratoryMemberResponse

  constructor(private laboratoryMemberService: LaboratoryMemberService) {} // Constructor that injects the LaboratoryMemberService

  // Method to download the laboratory member badge as a PDF
  download(id: number): void {
    this.laboratoryMemberService.generateLaboratoryMemberBadge(id).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' }) // Create a Blob object from the response
        const url = window.URL.createObjectURL(blob) // Create a URL for the Blob
        const a = document.createElement('a') // Create an anchor element
        a.href = url // Set the URL as the href of the anchor
        a.download = `laboratory_member_${id}_badge.pdf` // Set the filename for the download
        a.click() // Programmatically click the anchor to trigger the download
        window.URL.revokeObjectURL(url) // Revoke the object URL to free up memory
      },
    )
  }
}
