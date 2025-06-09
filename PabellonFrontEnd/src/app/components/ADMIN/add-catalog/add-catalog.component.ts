import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'src/app/Helpers/BaseService';
import { CatalogRequest } from 'src/app/models/Request/CatalogRequest';
import { AlertService } from 'src/app/services/alert.service';
import { CatalogService } from 'src/app/services/Entities/catalog.service';

@Component({
  selector: 'app-add-catalog',
  templateUrl: './add-catalog.component.html',
  styleUrls: ['./add-catalog.component.css']
})
export class AddCatalogComponent {

  loading: boolean = false
  imageUrl: string | ArrayBuffer | null = null;
  catalogRequest: CatalogRequest = new CatalogRequest()
  fileInputRequired: boolean = false
  catalogId: string | null = null

  constructor(
    private catalogService: CatalogService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.catalogId = this.route.snapshot.paramMap.get('id');

    if (this.catalogId !== null) {
      this.catalogService.getCatalogById(this.catalogId).subscribe(catalog => {
        this.catalogRequest.Name = catalog.name;
        this.imageUrl = this.getImageUrl(catalog.img);
      });
    }

  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) {
        this.catalogRequest.Image = file;
        this.fileInputRequired = false
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  addCatalog(form: NgForm) {
    this.alertService.confirm("Guardar Catalogo", "Estas seguro de guardar este catalogo?").then((result) => {
      if (result) {
        this.catalogRequest.Image.name === "" ? this.fileInputRequired = true : this.fileInputRequired = false

        if (form.invalid) {
          this.markAllAsTouched(form);
          return;
        }

        this.fileInputRequired = false

        if (this.catalogId) {
          this.catalogService.updateCatalog(this.catalogId, this.catalogRequest).subscribe((data) => {
            this.router.navigate(['/admin/catalogo']);
            this.alertService.success("Catalogo Actualizado")
          })
        }
        else {
          this.catalogService.createCatalog(this.catalogRequest).subscribe((data) => {
            this.router.navigate(['/admin/catalogo']);
            this.alertService.success("Catalogo Creado")
          })
        }
      }
    });
  }

  markAllAsTouched(form: NgForm) {
    Object.keys(form.controls).forEach((controlName) => {
      const control = form.controls[controlName];
      control.markAsTouched();  // Marca el campo como tocado
    });
  }

  getImageUrl(imagePath: string): string {
    return `${BaseService.fileUrl}${imagePath}`;
  }
}
