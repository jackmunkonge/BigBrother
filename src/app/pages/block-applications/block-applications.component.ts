import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../app.breadcrumb.service';
import { Product } from '../../demo/domain/product';
import { ProductService } from '../../demo/service/productservice';

@Component({
  templateUrl: './block-applications.component.html',
  styleUrls: ['./block-applications.component.scss']
})
export class BlockApplicationsComponent implements OnInit {

  products: Product[];

  constructor(private appService: AppService, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Block Applications'}
    ]);
  }

  ngOnInit() {
    this.productService.getProductsSmall().then(data => this.products = data);
  }
}
