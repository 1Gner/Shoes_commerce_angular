import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


interface Produto {
  photo: string,
  price: number,
  quantity: number
}

@Injectable({
  providedIn: 'root'
})





export class TakephotoService {

  constructor() { }


  private produtos = new Map<string, Produto>();
  private produtos$ = new BehaviorSubject<Map<string, Produto>>(this.produtos);

  private quantidade = new BehaviorSubject<number>(0);
  quantidade$ = this.quantidade.asObservable();

  private close = new BehaviorSubject<boolean>(true);
  close$ = this.close.asObservable();




  addProduto(Produto: string, photo: string, price: number, quantity: number) {
    this.produtos.set(Produto, { photo, price, quantity });
    this.produtos$.next(this.produtos);
    this.getQuantity();
  }


  removeProduto(Produto: string) {
    const produto = this.produtos.get(Produto);
    if (produto) {
      this.produtos.delete(Produto);
    }
    this.getQuantity();
  }

  getQuantity(){
    this.produtos$.subscribe(pro => {
      let numQuantity = 0;
      pro.forEach((produt,chave) => {
         numQuantity += produt.quantity
      })
      this.quantidade.next(numQuantity);
    })
  }



  getProdutos() {
    return this.produtos$.asObservable();
  }


  closeOpen(){
    if(this.close.getValue()){
      this.close.next(false)
    }else{
      this.close.next(true)
    }
  }


}
