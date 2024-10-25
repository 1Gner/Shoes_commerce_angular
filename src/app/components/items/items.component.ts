import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { TakephotoService } from '../../services/takephoto.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent {


  photo: string = "";
  sneaker: string = "";
  price: number = 0;
  quantity: number = 0;
  priceT: number = 0;

  constructor(private take: TakephotoService) {

  }

  @Output() remove = new EventEmitter<void>();

  removeItem() {
    this.remove.emit();
  }

  open() {
    this.take.closeOpen();
  }

}
