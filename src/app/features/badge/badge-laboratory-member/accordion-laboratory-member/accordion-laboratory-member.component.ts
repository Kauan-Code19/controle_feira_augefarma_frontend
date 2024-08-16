import { Component, Input } from '@angular/core';
import { LaboratoryMemberResponse } from '../../../../interfaces/laboratory/laboratory-member-response';
import { CommonModule } from '@angular/common';
import { LaboratoryMemberService } from '../../../../shared/services/laboratory/laboratory_member/laboratory-member.service';

@Component({
  selector: 'accordion-laboratory-member-component',
  standalone: true,
  imports: [CommonModule],
  providers: [LaboratoryMemberService],
  templateUrl: './accordion-laboratory-member.component.html',
  styleUrl: './accordion-laboratory-member.component.scss'
})
export class AccordionLaboratoryMemberComponent {
  @Input() results: LaboratoryMemberResponse[] = [];

  constructor(private laboratoryMemberService: LaboratoryMemberService) {}

  download(id: number): void {
    this.laboratoryMemberService.generateLaboratoryMemberBadge(id).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `laboratory_member_${id}_badge.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
    )
  }
}
