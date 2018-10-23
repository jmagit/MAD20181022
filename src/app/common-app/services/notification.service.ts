import { Injectable } from '@angular/core';
import { LoggerService } from 'src/indra-core';

export enum NotificationType { error, warn, info }

export class Notification {
  private mensaje: string;
  private tipo: NotificationType;

  constructor(msg: string, tipo: NotificationType = NotificationType.error) {
    this.mensaje = msg;
    this.tipo = tipo;
  }

  public get Mensaje() { return this.mensaje; }
  public set Mensaje(valor: string) { this.mensaje = valor; }
  public get Tipo() { return this.tipo; }
  public set Tipo(valor: NotificationType) { this.tipo = valor; }
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private listado: Array<Notification> = [];

  constructor(private out: LoggerService) { }

  public get Listado() {
    return Object.assign([], this.listado);
  }
  public get HayNotificaciones() {
    return this.listado.length > 0;
  }

  public add(msg: string, tipo: NotificationType = NotificationType.error): void {
    if (!msg) {
      this.out.error('Falta el texto de la notificación.');
      return;
    }
    this.listado.push(new Notification(msg, tipo));
    this.out.warn(`Notificacion: ${msg}`);
  }
  public remove(indice: number): void {
    if (0 <= indice && indice < this.listado.length) {
      this.listado.splice(indice, 1);
    } else {
      this.out.error('Index out of range.');
      return;
    }
  }
  public clear(): void {
    if (this.listado.length) {
      this.listado.splice(0);
    }
  }
}
