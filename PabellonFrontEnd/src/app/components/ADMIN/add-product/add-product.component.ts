import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Catalog } from 'src/app/models/Catalog';
import { Options } from 'src/app/models/Options';
import { ProductRequest } from 'src/app/models/Request/ProductRequest';
import { CatalogService } from 'src/app/services/Entities/catalog.service';
import { OptionsService } from 'src/app/services/Entities/options.service';
import { ProductService } from 'src/app/services/Entities/product.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  loading: boolean = false

  catalogItems: Catalog[] = []
  optionItems: Options[] = []
  customOptionItems: { selectedOption?: number, previousSelection?: number }[] = [{}];
  imageUrl: string | ArrayBuffer | null = null;
  productRequest: ProductRequest = new ProductRequest()
  fileInputRequired: boolean = false
  productId: string | null = null

  constructor(
    private optionService: OptionsService,
    private productService: ProductService,
    private catalogServices: CatalogService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    // Obtener ID del producto si lo hay
    this.productId = this.route.snapshot.paramMap.get('id');

    // Ejecutar en paralelo: opciones y catálogos
    forkJoin({
      options: this.optionService.getAllOptions(),
      catalogs: this.catalogServices.getCatalosName()
    }).subscribe(({ options, catalogs }) => {
      this.optionItems = options;
      this.catalogItems = catalogs;

      // Solo si es edición, cargar el producto
      if (this.productId) {
        this.productService.getProductById(parseInt(this.productId)).subscribe(product => {
          this.productRequest.Name = product.name;
          this.productRequest.Price = product.price;
          this.productRequest.Description = product.description;
          this.productRequest.CatalogId = product.catalogId;
          this.imageUrl = product.image;
          this.productRequest.Image = this.base64ToFile(product.image);

          if (product.options.length > 0) {
            this.customOptionItems = product.options.map(option => ({ selectedOption: option.id, previousSelection: option.id }));
          }
        });
      }
    });
  }

  private base64ToFile(base64: string): File {
    const arr = base64.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    // Generar nombre genérico: ejemplo imagen_20250801.jpg
    const extension = mime.split('/')[1]; // ej. "jpeg", "png"
    const filename = `imagen_${Date.now()}.${extension}`;

    return new File([u8arr], filename, { type: mime });
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) {
        this.productRequest.Image = file;
        this.fileInputRequired = false
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  trackByOptionId(index: number, option: Options): number {
    return option.id;
  }

  addOption(): void {
    if (this.customOptionItems.length < this.optionItems.length) {
      this.customOptionItems.push({});
    }
  }

  removeOption(index: number): void {
    const customOption = this.customOptionItems[index];

    // Liberar la opción seleccionada antes de eliminar
    if (customOption.selectedOption) {
      this.updateOptionSelection(customOption.selectedOption, false);
    }

    // Remover el elemento del array
    this.customOptionItems.splice(index, 1);

    // Asegurar que siempre haya al menos un elemento
    if (this.customOptionItems.length === 0) {
      this.customOptionItems.push({ selectedOption: undefined, previousSelection: undefined });
    }
  }

  updateSelectedOptions(event: Event, customOptionIndex: number): void {
    const target = event.target as HTMLSelectElement;
    const selectedOptionId = target.value ? parseInt(target.value) : undefined;
    const customOption = this.customOptionItems[customOptionIndex];

    // Liberar la selección anterior si existe
    if (customOption.previousSelection) {
      this.updateOptionSelection(customOption.previousSelection, false);
    }

    // Marcar la nueva selección como ocupada
    if (selectedOptionId) {
      this.updateOptionSelection(selectedOptionId, true);
      customOption.selectedOption = selectedOptionId;
      customOption.previousSelection = selectedOptionId;
    } else {
      customOption.selectedOption = undefined;
      customOption.previousSelection = undefined;
    }

  }

  private updateOptionSelection(optionId: number, isSelected: boolean): void {
    const option = this.optionItems.find(opt => opt.id === optionId);
    if (option) {
      option.isSelected = isSelected;
    }
  }


  addProduct(form: NgForm) {
    this.alertService.confirm("Guardar Producto", "Estas seguro de guardar este producto?").then((result) => {
      if (result) {
        this.productRequest.Image.name === "" ? this.fileInputRequired = true : this.fileInputRequired = false

        if (form.invalid) {
          this.markAllAsTouched(form);
          return;
        }

        const optionsIds = this.customOptionItems.map(option => {
          return option.selectedOption ? +option.selectedOption : NaN;
        });

        this.productRequest.OptionIds = optionsIds.filter(optionId => !isNaN(optionId));

        this.fileInputRequired = false

        if (this.productId) {
          this.productService.updateProduct(parseInt(this.productId), this.productRequest).subscribe((data) => {
            this.router.navigate(['/admin/productos']);
            this.alertService.success("Producto Actualizado")
          })
        }
        else {
          this.productService.createProduct(this.productRequest).subscribe((data) => {
            this.router.navigate(['/admin/productos']);
            this.alertService.success("Producto Creado")
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

}
