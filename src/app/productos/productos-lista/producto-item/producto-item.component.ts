import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../producto';
import { ProductosListaComponent } from '../productos-lista.component';

@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.component.html',
  styleUrls: ['./producto-item.component.css']
})
export class ProductoItemComponent implements OnInit {
  
  isInProductos = true;

  @Input() producto: Producto;
  @Output() productDeleter = new EventEmitter;
  @Output() cartAdder = new EventEmitter;
  @Output() detailHandler = new EventEmitter;
  
  constructor(private productosLista: ProductosListaComponent) { }
  
  ngOnInit()          {  this.isInProductos = this.productosLista.isInProductos; }
  addToCart()         { this.cartAdder.emit(this.producto);  }
  borrarProducto()    {  this.productDeleter.emit(this.producto);  }
  detalleProducto()   {  this.detailHandler.emit(this.producto);  }
  


}