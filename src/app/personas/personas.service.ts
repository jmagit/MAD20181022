import { Injectable } from '@angular/core';
import { NotificationService } from '../common-app';

export type ModoCRUD = 'list' | 'add' | 'edit' | 'view' | 'delete';

@Injectable({
  providedIn: 'root'
})
export class PersonasViewModelService {
  protected modo: ModoCRUD = 'list';
  protected listado: Array<any> = null;
  protected elemento: any = {};
  protected idOriginal = null;
  protected pk = 'id';

  constructor(private notify: NotificationService) { }

  public get Modo() { return this.modo; }
  public get Listado() { return Object.assign([], this.listado); }
  public get Elemento() { return this.elemento; }

  public list() {
    if (!this.listado) {
      this.listado = [
        { id: 1, nombre: 'Carmelo', apellidos: 'Coton', edad: 18 },
        { id: 2, nombre: 'Pepito', apellidos: 'Grillo', edad: 155},
        { id: 3, nombre: 'Pedro', apellidos: 'Pica Piedra', edad: 50},
        { id: 4, nombre: 'Pablo', apellidos: 'Marmol', edad: 45},
      ];
    }
    this.modo = 'list';
  }

  public add(): void {
    this.elemento = {};
    this.modo = 'add';
  }
  public edit(key: any): void {
    // tslint:disable-next-line:triple-equals
    const rslt = this.listado.find(item => item[this.pk] == key);
    if (rslt) {
      this.elemento = Object.assign({}, rslt);
      this.idOriginal = key;
      this.modo = 'edit';
    } else {
      this.notify.add('Elemento no encontrados.');
    }
  }
  public view(key: any): void {
    // tslint:disable-next-line:triple-equals
    const rslt = this.listado.find(item => item[this.pk] == key);
    if (rslt) {
      this.elemento = Object.assign({}, rslt);
      this.modo = 'view';
    } else {
      this.notify.add('Elemento no encontrados.');
    }
  }
  public delete(key: any): void {
    if (!window.confirm('¿Seguro?')) { return; }

    // tslint:disable-next-line:triple-equals
    const index = this.listado.findIndex(item => item[this.pk] == key);
    if (index >= 0) {
      this.listado.splice(index, 1);
      this.list();
    } else {
      this.notify.add('Elemento no encontrados.');
    }
  }

  public cancel(): void {
    this.elemento = {};
    this.idOriginal = null;
    this.list();
  }

  public send() {
    switch (this.modo) {
      case 'add':
        this.listado.push(this.elemento);
        this.cancel();
        break;
      case 'edit':
        // tslint:disable-next-line:triple-equals
        const index = this.listado.findIndex(item => item[this.pk] == this.idOriginal);
        if (index >= 0) {
          this.listado[index] = this.elemento;
          this.cancel();
        } else {
          this.notify.add('Elemento no encontrados.');
        }
        break;
      case 'view':
        this.cancel();
        break;
    }
  }
}
