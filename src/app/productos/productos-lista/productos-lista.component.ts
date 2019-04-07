import { Producto } from '../producto';
import { ProductosService } from '../productos.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos-lista',
  templateUrl: './productos-lista.component.html',
  styleUrls: ['./productos-lista.component.css']
})
export class ProductosListaComponent implements OnInit {
  productos: Producto[];
  carrito: Producto[];
  carritoTemp: Producto[] = [];
  totalCarrito: number;
  contCarrito: number;
  isInProductos: boolean;

  private subscript: Subscription;
  private subscriptCart: Subscription;

  constructor(private productosService: ProductosService,
              private activatedRoute: ActivatedRoute,
              private router: Router ) { }

  ngOnInit() {
    this.productos = this.productosService.getProductos();
    this.carrito = this.productosService.getCart();
    this.carritoTemp = [];
    this.totalCarrito = 0;
    this.contCarrito = 0;
    this.isInProductos = true;

    if (this.router.url.match('productos')) {
      this.isInProductos = true;
    } else {
      this.isInProductos = false;
      this.subscriptCart = this.productosService.cambiaProducto.
      subscribe((arregloProductos: Producto[]) => { this.carrito = arregloProductos; });
    }
    this.totalCarrito = this.productosService.getTotal();
  }

  addToCarrito(producto) {
    const pos = this.carritoTemp.findIndex(pro => pro.id == producto.id);
    if (pos < 0 ) {
      this.carritoTemp.push(Object.assign({}, producto));
      this.contCarrito++;
    } else{
      if(this.carritoTemp.length > 0) {
        this.contCarrito--;
        this.carritoTemp.splice(pos, 1);
      }
    }
  }

  sendToCart(){
    if(this.carritoTemp.length > 0){
      this.carritoTemp.forEach(p => {
       if (!this.productosService.addToCart(this.productosService.getProducto(p.id))) {
       }
      });
      this.totalCarrito = this.carritoTemp.length;
    }
  }

  detalleProducto(producto) {
    this.router.navigate([producto.id], {relativeTo: this.activatedRoute});
  }

  borrarProducto(producto) {
    this.productosService.borrarProducto(producto.id);
    this.totalCarrito = this.productosService.getTotal();
  }
}