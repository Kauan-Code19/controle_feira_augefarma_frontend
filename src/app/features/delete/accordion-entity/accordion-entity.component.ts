import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PharmacyRepresentativeResponse } from '../../../interfaces/pharmacy_representative/pharmacy-representative-response';
import { PharmacyRepresentativeService } from '../../../shared/services/pharmacyRepresentative/pharmacy-representative.service';
import { LaboratoryMemberResponse } from '../../../interfaces/laboratory/laboratory-member-response';
import { LaboratoryMemberService } from '../../../shared/services/laboratory/laboratory_member/laboratory-member.service';
import { LaboratoryResponse } from '../../../interfaces/laboratory/laboratory-response';
import { LaboratoryService } from '../../../shared/services/laboratory/laboratory.service';

@Component({
  selector: 'accordion-entity-component',
  standalone: true,
  imports: [CommonModule],
  providers: [PharmacyRepresentativeService, LaboratoryMemberService, LaboratoryService],
  templateUrl: './accordion-entity.component.html',
  styleUrl: './accordion-entity.component.scss'
})
export class AccordionEntityComponent {
  // Input property to receive results of pharmacy representatives
  @Input() results: (LaboratoryMemberResponse | PharmacyRepresentativeResponse | LaboratoryResponse)[] = [];
  private laboratoryMember: LaboratoryMemberResponse | undefined
  private PharmacyRepresentative: PharmacyRepresentativeResponse | undefined
  private laboratory: LaboratoryResponse | undefined

  // Constructor to inject the PharmacyRepresentativeService
  constructor
  (
    private pharmacyRepresentativeService: PharmacyRepresentativeService,
    private laboratoryMemberService: LaboratoryMemberService,
    private laboratoryService: LaboratoryService
  ) {}

  isPharmacyRepresentative(result: any): result is PharmacyRepresentativeResponse {
    return 'cnpj' in result && 'corporateReason' in result;
  }

  isLaboratoryMember(result: any): result is LaboratoryMemberResponse {
    return 'laboratory' in result;
  }

  isLaboratory(result: any): result is LaboratoryResponse {
    return 'corporateReason' in result;
  }

  delete(id: number, entity: LaboratoryMemberResponse | PharmacyRepresentativeResponse | LaboratoryResponse): void {
    // Verifica se o entity é um representante de farmácia
    if (this.isPharmacyRepresentative(entity)) {
      this.pharmacyRepresentativeService.deletePharmacyRepresentative(id).subscribe({
        next: () => {
          this.removeEntityFromResults(id);
        },
      });
    }
  
    // Verifica se o entity é um membro de laboratório
    if (this.isLaboratoryMember(entity)) {
      this.laboratoryMemberService.deleteLaboratoryMember(id).subscribe({
        next: () => {
          this.removeEntityFromResults(id);
        },
      });
    }
  
    // Verifica se o entity é um laboratório
    if (this.isLaboratory(entity)) {
      this.laboratoryService.deleteLaboratory(id).subscribe({
        next: () => {
          this.removeEntityFromResults(id);
        },
      });
    }
  }
  
  // Método para remover a entidade deletada dos resultados
  removeEntityFromResults(id: number): void {
    this.results = this.results.filter(result => result.id !== id);
  }
}
