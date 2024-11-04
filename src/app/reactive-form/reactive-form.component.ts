import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'reactive-forms',
  templateUrl: 'reactive-form.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor]
})

export class ReactiveFormComponent implements OnInit {


  cvForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.cvForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      estudios: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.agregarEstudio();
  }

  // Getter para acceder al FormArray de estudios
  get estudios(): FormArray {
    return this.cvForm.get('estudios') as FormArray;
  }

  // Método para crear un grupo de controles para un bloque de estudio
  crearEstudio(): FormGroup {
    return this.fb.group({
      anio: ['', Validators.required],
      nivel: ['', Validators.required],
      establecimiento: ['', Validators.required]
    });
  }

  // Método para agregar un nuevo bloque de estudio al FormArray
  agregarEstudio(): void {
    this.estudios.push(this.crearEstudio());
  }

  // Método para eliminar un bloque de estudio específico
  eliminarEstudio(indice: number): void {
    this.estudios.removeAt(indice);
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.cvForm.valid) {
      console.log(this.cvForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }
}
