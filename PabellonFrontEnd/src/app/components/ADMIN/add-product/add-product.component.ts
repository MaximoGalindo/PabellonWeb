import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Catalog } from 'src/app/models/Catalog';
import { Options } from 'src/app/models/Product';
import { ProductRequest } from 'src/app/models/Request/ProductRequest';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  loading: boolean = false

  catalogItems: Catalog[] = []
  optionItems: Options[] = []
  customOptionItems: { selectedOption?: number }[] = [{}];
  imageUrl: string | ArrayBuffer | null = null;
  productRequest: ProductRequest = new ProductRequest()
  fileInputRequired: boolean = false

  ngOnInit() {
    this.catalogItems = [{ id: "1", name: 'Catalogo 1', img: " " }, { id: "1", name: 'Catalogo 2', img: " " }, { id: "1", name: 'Catalogo 3', img: " " },]
    this.optionItems = [new Options(1, "Sin lechuga", 0, false), new Options(2, "Sin Tomate", 0, false), new Options(3, "Medallon Extra", 1200, false)]
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) {
        this.productRequest.image = file;
        this.fileInputRequired = false
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  addOption(): void {
    if (this.customOptionItems.length < this.optionItems.length) {
      this.customOptionItems.push({});
    }
  }

  removeOption(index: number, selectedOptionId: any): void {
    this.customOptionItems.splice(index, 1);
    this.updateSelectedOptions(selectedOptionId);
    if (this.customOptionItems.length === 0) {
      this.customOptionItems.push({});
    }
  }

  updateSelectedOptions(selectedOptionId:any): void {  
    const selectedOption = this.optionItems.find(option => option.id === parseInt(selectedOptionId));
   
    if (selectedOption) {
        selectedOption.isSelected = !selectedOption.isSelected;
        this.optionItems = [...this.optionItems];
    }    
  }

  addProduct(form:NgForm) {
    console.log(this.productRequest);
    this.productRequest.image.name === "" ? this.fileInputRequired = true : this.fileInputRequired = false

    if (form.invalid) {
        this.markAllAsTouched(form);
        return; 
    }

    const optionsIds = this.customOptionItems.map(option => {
      return option.selectedOption ? +option.selectedOption : NaN;
    });

    this.productRequest.optionIds = optionsIds.filter(optionId => !isNaN(optionId));   

    console.log(this.productRequest)
    this.fileInputRequired = false
  } 

  markAllAsTouched(form: NgForm) {
    Object.keys(form.controls).forEach((controlName) => {
        const control = form.controls[controlName];
        control.markAsTouched();  // Marca el campo como tocado
    });
}

}
