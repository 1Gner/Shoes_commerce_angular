import { Component } from '@angular/core';
import { TakephotoService } from '../../services/takephoto.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-light-box',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './light-box.component.html',
  styleUrl: './light-box.component.scss'
})
export class LightBoxComponent {

  
  photoSelected: string = "../../../assets/image-product-1.jpg";
  index:number = 0;
  produtoName: string = "Fall Limited Edition Sneakers"
  
 
  photoo:string [] = ["../../../assets/image-product-1.jpg",
    "../../../assets/image-product-2.jpg",
    "../../../assets/image-product-3.jpg",
    "../../../assets/image-product-4.jpg"
  ];


  constructor(private take:TakephotoService){
    
  }

  selectPhoto(index: number) {
    this.photoSelected = this.photoo[index];
    this.index = index;
  }

  close(){
    this.take.closeOpen();
  }

  changePhoto(){
    if(this.index - 1 < 0){
      this.index = 3
    }else{
      this.index --
    }
    this.photoSelected = this.photoo[this.index];
  }

  changePhotoNext(){
    if(this.index + 1 > 3){
      this.index = 0;
    }else{
      this.index ++
    }
    this.photoSelected = this.photoo[this.index];
  }
}
