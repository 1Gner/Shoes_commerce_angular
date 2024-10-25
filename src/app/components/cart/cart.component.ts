import { CommonModule } from '@angular/common';
import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ItemsComponent } from '../items/items.component';
import { TakephotoService } from '../../services/takephoto.service';


interface Produto {
  photo: string,
  price: number,
  quantity: number
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})



export class CartComponent implements OnInit {
  empty:boolean = false

  productComponentMap = new Map<string, ComponentRef<ItemsComponent>>();

  @ViewChild('container', { read: ViewContainerRef, static: false }) container!: ViewContainerRef;
  constructor( private ProdutosXD:TakephotoService){}


 ngOnInit(){
  this.ProdutosXD.getProdutos().subscribe(produtos => {
    produtos.forEach((produto,chave) =>{
      this.addCompononent(chave,produto);
    })
  })


  this.ProdutosXD.quantidade$.subscribe((num:number) => {
    if(num > 0){
      this.empty = false;
    }else{
      this.empty = true;
    }
  })

 }


 removeItem(produto:string){
  const component = this.productComponentMap.get(produto);
  if(component){
    component.destroy();
    this.ProdutosXD.removeProduto(produto);
    this.productComponentMap.delete(produto);
  }
 }




  addCompononent(produto:string ,object:Produto){
    
    if(this.container){
      if(!this.productComponentMap.get(produto)){
      const componentRef = this.container.createComponent(ItemsComponent)
      componentRef.instance.photo = object.photo
      componentRef.instance.price = object.price
      componentRef.instance.priceT = object.price * object.quantity;
      componentRef.instance.quantity = object.quantity;
      componentRef.instance.sneaker = produto;

      componentRef.instance.remove.subscribe(() => this.removeItem(produto));


      this.productComponentMap.set(produto,componentRef)

      }else{

        const componetRef = this.productComponentMap.get(produto)
        if(componetRef){
        componetRef.instance.quantity = object.quantity
        componetRef.instance.priceT =  object.price * object.quantity;
        
        }
      }

    }
  }
}
