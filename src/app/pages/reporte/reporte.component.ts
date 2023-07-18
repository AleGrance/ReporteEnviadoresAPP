import { Component, OnInit } from '@angular/core';
import { Api48hsService } from 'src/app/services/api-48hs.service';
import { ApiTicketsService } from 'src/app/services/api-tickets.service';
import { map } from 'rxjs/operators';
import { ApiNoasistidosService } from 'src/app/services/api-noasistidos.service';
import { ApiSucursales48hsService } from 'src/app/services/api-sucursales48hs.service';
// Icons
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
})
export class ReporteComponent implements OnInit {
  constructor(
    public apiTickets: ApiTicketsService,
    public apiNoAsistidos: ApiNoasistidosService,
    public api48Hs: Api48hsService,
    public apiSucursales48Hs: ApiSucursales48hsService
  ) {}

  // Icons
  faRefresh = faRefresh;

  public cantTickets: any = [];
  public cantNoAsistidos: any = [];
  public cant48hs: any = [];
  public cantSucursales48hs: any = [];

  ngOnInit(): void {}

  getTickets() {
    // Se muestra el spinner al hacer click en el btn
    let cant_tickets = document.getElementById('cant_tickets');
    cant_tickets?.insertAdjacentHTML('afterbegin', `<div class="spinner-border spinner-border-sm" role="status">
    <span class="visually-hidden"></span>
  </div>`);

    // Tickets
    this.apiTickets
      .get('ticketsNotificados')
      .pipe(
        map((data) => {
          this.cantTickets = data;
          // Se reemplaza el spinner por el dato obtenido
          cant_tickets?.replaceChildren(this.cantTickets);
        })
      )
      .subscribe();
  }

  getNoAsistidos() {
    // Se muestra el spinner al hacer click en el btn
    let cant_noasistidos = document.getElementById('cant_noasistidos');
    cant_noasistidos?.insertAdjacentHTML('afterbegin', `<div class="spinner-border spinner-border-sm" role="status">
    <span class="visually-hidden"></span>
  </div>`);

    // No Asistidos
    this.apiNoAsistidos
      .get('turnosNoAsistidosNotificados')
      .pipe(
        map((data) => {
          this.cantNoAsistidos = data;
          //console.log(this.cantNoAsistidos);
          // Se reemplaza el spinner por el dato obtenido
          cant_noasistidos?.replaceChildren(this.cantNoAsistidos);
        })
      )
      .subscribe();
  }

  get48Hs() {
    // Se muestra el spinner al hacer click en el btn
    let cant_48hs = document.getElementById('cant_48hs');
    cant_48hs?.insertAdjacentHTML('afterbegin', `<div class="spinner-border spinner-border-sm" role="status">
    <span class="visually-hidden"></span>
  </div>`);

    // 48hs
    this.api48Hs
      .get('turnos48Notificados')
      .pipe(
        map((data) => {
          this.cant48hs = data;
          //console.log(this.cant48hs);
          // Se reemplaza el spinner por el dato obtenido
          cant_48hs?.replaceChildren(this.cant48hs);
        })
      )
      .subscribe();
  }

  getSucursales48Hs() {
    // Se muestra el spinner al hacer click en el btn
    let cant_sucursales48hs = document.getElementById('cant_sucursales48hs');
    cant_sucursales48hs?.insertAdjacentHTML('afterbegin', `<div class="spinner-border spinner-border-sm" role="status">
    <span class="visually-hidden"></span>
  </div>`);

    // Sucursales Sucursales 48hs
    this.apiSucursales48Hs
      .get('turnosSucursales48hsNotificados')
      .pipe(
        map((data) => {
          this.cantSucursales48hs = data;
          //console.log(this.cantSucursales48hs);
          // Se reemplaza el spinner por el dato obtenido
          cant_sucursales48hs?.replaceChildren(this.cantSucursales48hs);
        })
      )
      .subscribe();
  }
}
