import { Injectable } from '@angular/core';
import { NotificationService } from '../common-app';
import { RESTDAOService } from '../base-code/dao.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModoCRUD } from '../base-code/view-model.service';

@Injectable({
  providedIn: 'root'
})
export class BlogDAOService extends RESTDAOService<any, any> {
  constructor(http: HttpClient) {
    super(http, 'blog', { withCredentials: true });
  }
}

@Injectable({
  providedIn: 'root'
})
export class BlogViewModelService {
  protected modo: ModoCRUD = 'list';
  protected listado: Array<any> = null;
  protected elemento: any = {};
  protected idOriginal = null;
  protected url_list = '/blog';

  constructor(protected notify: NotificationService,
    protected dao: BlogDAOService, protected router: Router) { }

  public get Modo() { return this.modo; }
  public get Listado() { return Object.assign([], this.listado); }
  public get Elemento() { return this.elemento; }

  public list() {
    this.dao.query().subscribe(
      data => {
        this.listado = data;
        this.modo = 'list';
      },
      err => this.notify.add(err.message)
    );
  }

  public add(): void {
    this.elemento = {};
    this.modo = 'add';
  }
  public edit(key: any): void {
    this.dao.get(key).subscribe(
      data => {
        this.elemento = data;
        this.idOriginal = key;
        this.modo = 'edit';
      },
      err => this.notify.add(err.message)
    );
  }
  public view(key: any): void {
    this.dao.get(key).subscribe(
      data => {
        this.elemento = data;
        this.modo = 'view';
      },
      err => this.notify.add(err.message)
    );
  }
  public delete(key: any): void {
    if (!window.confirm('¿Seguro?')) { return; }

    this.dao.remove(key).subscribe(
      data => {
        this.list();
      },
      err => this.notify.add(err.message)
    );
  }

  public cancel(): void {
    this.elemento = {};
    this.idOriginal = null;
    // this.list();
    this.router.navigateByUrl(this.url_list);
  }

  public send() {
    switch (this.modo) {
      case 'add':
        this.dao.add(this.elemento).subscribe(
          data => {
            this.cancel();
          },
          err => this.notify.add(err.message)
        );
        break;
      case 'edit':
        this.dao.change(this.idOriginal, this.elemento).subscribe(
          data => {
            this.cancel();
          },
          err => this.notify.add(err.message)
        );
        break;
      case 'view':
        this.cancel();
        break;
    }
  }
}
