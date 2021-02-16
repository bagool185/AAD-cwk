import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.scss']
})
export class AddPrescriptionComponent implements OnInit {

  prescriptionRequestForm: FormGroup;
  medications!: FormArray;

  constructor(private readonly formBuilder: FormBuilder) { 

    this.prescriptionRequestForm = this.formBuilder.group({
      medications: this.formBuilder.array([ this.createItem() ])
    })
  }

  ngOnInit(): void {
    
  }

  private createItem(): FormGroup {
    return this.formBuilder.group({
      name: ''
    });
  }

  addMedication() {
    this.medications = this.prescriptionRequestForm.get('medications') as FormArray;
    this.medications.push(this.createItem());
  }

  remove(index: number) {
    this.medications = this.prescriptionRequestForm.get('medications') as FormArray;
    this.medications.removeAt(index);
  }

  addPrescription() {
    // TODO
  }

  getMedicationsControls() {
    this.medications = this.prescriptionRequestForm.get('medications') as FormArray;
    return this.medications?.controls;
  }
}
