import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../productos.service';
import { Location } from '@angular/common';
import { Producto } from '../Producto';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {

  id: number;
  producto: Producto;
  isInProductos: boolean;
  constructor(private route: ActivatedRoute,
              private productoService: ProductosService,
              private location: Location,
              private router: Router) { }

  ngOnInit() {
    this.isInProductos = this.router.url.match('cart') ? false : true;
    this.route.params.subscribe(
      (params) => {
        this.id = Number(params.id);
        this.producto = this.productoService.getProducto(this.id);
      }
    );
  }

  cancelar() {  this.location.back(); }
}


