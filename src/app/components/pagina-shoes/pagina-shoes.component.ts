import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { TakephotoService } from '../../services/takephoto.service';
import { LightBoxComponent } from "../light-box/light-box.component";

@Component({
  selector: 'app-pagina-shoes',
  standalone: true,
  imports: [CommonModule, CartComponent, LightBoxComponent],
  templateUrl: './pagina-shoes.component.html',
  styleUrl: './pagina-shoes.component.scss'
})
export class PaginaShoesComponent implements OnInit {


  photoSelected: string = "";
  produtoName: string = "Fall Limited Edition Sneakers"
  photo1: string = "../../../assets/image-product-1.jpg";
  photo2: string = "../../../assets/image-product-2.jpg";
  photo3: string = "../../../assets/image-product-3.jpg";
  photo4: string = "../../../assets/image-product-4.jpg";

  price: number = 0;
  discount: number = 50;
  realPrice: number = 250;

  number: number = 0;

  show: boolean = true;

  closeLight:boolean = true;



  constructor(private ProdutosXD: TakephotoService,) {
  }


  ngOnInit() {
    this.photoSelected = this.photo1;
    this.price = this.realPrice * (this.discount / 100)

    this.ProdutosXD.close$.subscribe((check:boolean) => {
      this.closeLight = check;
      if(this.closeLight == false){
        this.show = true;
      }
      
    })
    

  }

  selectPhoto(photo: string) {
    this.photoSelected = photo;
  }

  addNumber() {
    this.number++
  }

  decNumber() {
    if (this.number > 0) {
      this.number--
    }


  }


  showCart() {
    if (this.show) {
      this.show = false;
    } else {
      this.show = true;
    }
  }


  sendCart() {
    if (this.number > 0) {
      this.ProdutosXD.addProduto(this.produtoName, this.photoSelected, this.price, this.number)
    }
  }


}
