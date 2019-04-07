import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {
  cambiaProducto = new Subject<Producto[]>();
  cart: Producto[] = [ ];
  private lastID = 0;

   productos: Producto[] = [
     new Producto(this.lastID++, 'platano', 'frutas MEX', 'frutas', 25, 120),
     new Producto(this.lastID++, 'manzana', 'frutas MEX', 'frutas', 34, 120),
     new Producto(this.lastID++, 'naranja', 'frutas MEX', 'frutas', 25, 130),
     new Producto(this.lastID++, 'papaya', 'frutas MEX', 'frutas', 40, 60),
     new Producto(this.lastID++, 'zanahoria', 'verduras MEX', 'verduras', 30, 140),
     new Producto(this.lastID++, 'papa', 'verduras MEX', 'verduras', 40, 150),
     new Producto(this.lastID++, 'tomate', 'verduras MEX', 'verduras', 35, 110),
     new Producto(this.lastID++, 'brocoli', 'verduras MEX', 'verduras', 30, 50),
   ];


  constructor() {   }

  getNextID(): number { return this.lastID; }

  getProductos(): Producto[] {  return this.productos.slice();  }

  getCart(): Producto[] {  return this.cart.slice(); }

  getProducto(id: number): Producto {
    const pos = this.productos.findIndex(p => p.id === id);
    return Object.assign({}, this.productos[pos]);
  }

  addToCart(producto: Producto): boolean {
    const pos = this.cart.findIndex(p => p.nombre === producto.nombre);
    if (pos < 0) {
      this.cart.push(Object.assign({}, producto));
      this.notificarCambiosCart();
      return true;
    }
    return false;
  }

  getTotal(): number {
    let suma = 0;
    this.cart.forEach(item => suma += item.precio);
    return suma;
  }

  notificarCambios() {  this.cambiaProducto.next(this.productos.slice()); }
  notificarCambiosCart() { this.cambiaProducto.next(this.cart.slice());  }

  borrarProducto(id: number): boolean {
    const pos = this.cart.findIndex(p => p.id == id);
    if (pos >= 0) {
      this.cart.splice(pos, 1);
      this.notificarCambiosCart();
      return true;
    }
    return false;
  }
}
