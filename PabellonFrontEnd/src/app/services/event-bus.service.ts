import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private subject = new BehaviorSubject<{ key: string, data: any } | null>(null);

  constructor() { }

  // Emitir evento con clave y valor
  emitEvent(key: string, data: any) {
    this.subject.next({ key, data }); // Emitimos el objeto con clave-valor
  }

  // Suscribirse a eventos con clave-valor
  onEvent(): Observable<{ key: string, data: any } | null> {
    return this.subject.asObservable();
  }
}
