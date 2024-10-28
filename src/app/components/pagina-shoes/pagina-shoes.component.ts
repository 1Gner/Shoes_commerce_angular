import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { TakephotoService } from '../../services/takephoto.service';
import { LightBoxComponent } from "../light-box/light-box.component";
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pagina-shoes',
  standalone: true,
  imports: [CommonModule, CartComponent, LightBoxComponent, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './pagina-shoes.component.html',
  styleUrl: './pagina-shoes.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class PaginaShoesComponent implements OnInit {

  @ViewChild('menu') menu: MatMenu | undefined;

  photoSelected: string = "";

  produtoName: string = "Fall Limited Edition Sneakers"
  photoo: string[] = ["../../../assets/image-product-1.jpg",
    "../../../assets/image-product-2.jpg",
    "../../../assets/image-product-3.jpg",
    "../../../assets/image-product-4.jpg"
  ];
  index: number = 0;
  price: number = 0;
  discount: number = 50;
  realPrice: number = 250;

  number: number = 0;

  show: boolean = true;

  closeLight: boolean = true;

  showOverlay = false;




  constructor(private ProdutosXD: TakephotoService) {
  }


  ngOnInit() {
    this.photoSelected = this.photoo[0];
    this.price = this.realPrice * (this.discount / 100)

    this.ProdutosXD.close$.subscribe((check: boolean) => {
      this.closeLight = check;
      if (this.closeLight == false) {
        this.show = true;
      }

    })


  }
  selectPhoto(index: number) {
    this.photoSelected = this.photoo[index];
    this.index = index;
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

  changePhoto() {
    if (this.index - 1 < 0) {
      this.index = 3
    } else {
      this.index--
    }
    this.photoSelected = this.photoo[this.index];
  }

  changePhotoNext() {
    if (this.index + 1 > 3) {
      this.index = 0;
    } else {
      this.index++
    }
    this.photoSelected = this.photoo[this.index];
  }


  onMenuOpened() {
    this.showOverlay = true;
  
  }

  onMenuClosed() {
    this.showOverlay = false;
  }

  closeMenu() {
      this.menu?.closed.emit();
  }


}
