import { Component, OnInit } from '@angular/core';
import { Api48hsService } from 'src/app/services/api-48hs.service';
import { ApiTicketsService } from 'src/app/services/api-tickets.service';
import { catchError, map, timeout } from 'rxjs/operators';
import { ApiNoasistidosService } from 'src/app/services/api-noasistidos.service';
import { ApiSucursales48hsService } from 'src/app/services/api-sucursales48hs.service';
// Icons
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
// Format
import { CurrencyPipe, registerLocaleData, DatePipe } from '@angular/common';
import localeEsPy from '@angular/common/locales/es-PY';
// Para usar ngmodel
import { FormControl } from '@angular/forms';

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
  ) {
    registerLocaleData(localeEsPy);
  }

  // Icons
  faRefresh = faRefresh;
  faFileExcel = faFileExcel;

  public cantTickets: any = [];
  public cantNoAsistidos: any = [];
  public cant48hs: any = [];
  public cantSucursales48hs: any = [];

  // Fecha
  public pipe = new DatePipe('en-US');

  // Fecha
  public hoy = new Date();
  public hoyFormated = this.pipe.transform(this.hoy, 'dd-MM-yyyy');

  public fecha_desde: FormControl = new FormControl(this.pipe.transform(this.hoy, 'dd-MM-yyyy'));

  // Enviadores
  public enviadores = [
    { nombre: 'Enviador Ticktes' },
    { nombre: 'Enviador NoAsistidos' },
    { nombre: 'Enviador Sucursales48hs' },
  ];

  public enviadoresSeleccionados: any = [];

  ngOnInit(): void {
    console.log(this.hoyFormated);
  }

  /**
   *  ENVIADOS POR DIA
   */

  getTickets() {
    // Se muestra el spinner al hacer click en el btn
    let cant_tickets = document.getElementById('cant_tickets');
    cant_tickets?.insertAdjacentHTML(
      'afterbegin',
      `<div class="spinner-border spinner-border-sm" role="status">
    <span class="visually-hidden"></span>
  </div>`
    );

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
    cant_noasistidos?.insertAdjacentHTML(
      'afterbegin',
      `<div class="spinner-border spinner-border-sm" role="status">
    <span class="visually-hidden"></span>
  </div>`
    );

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

  // get48Hs() {
  //   // Se muestra el spinner al hacer click en el btn
  //   let cant_48hs = document.getElementById('cant_48hs');
  //   cant_48hs?.insertAdjacentHTML(
  //     'afterbegin',
  //     `<div class="spinner-border spinner-border-sm" role="status">
  //   <span class="visually-hidden"></span>
  // </div>`
  //   );

  //   // 48hs
  //   this.api48Hs
  //     .get('turnos48Notificados')
  //     .pipe(
  //       timeout(10000),
  //       map((data) => {
  //         this.cant48hs = data;
  //         //console.log(this.cant48hs);
  //         // Se reemplaza el spinner por el dato obtenido
  //         cant_48hs?.replaceChildren(this.cant48hs);
  //       }),
  //       catchError((error) => {
  //         // Manejar el error de timeout aquí
  //         // Por ejemplo, mostrar un mensaje de error al usuario o realizar alguna acción específica
  //         console.error('La solicitud tardó demasiado en responder:', error);
  //         cant_48hs?.replaceChildren(this.cant48hs);
  //         return throwError('La solicitud tardó demasiado en responder. Inténtalo de nuevo.');
  //       })
  //     )
  //     .subscribe();
  // }

  getSucursales48Hs() {
    // Se muestra el spinner al hacer click en el btn
    let cant_sucursales48hs = document.getElementById('cant_sucursales48hs');
    cant_sucursales48hs?.insertAdjacentHTML(
      'afterbegin',
      `<div class="spinner-border spinner-border-sm" role="status">
    <span class="visually-hidden"></span>
  </div>`
    );

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

  /**
   *  ENVIADOS POR FECHA
   */

  // Select enviadores

  addItem(e: any) {
    this.enviadoresSeleccionados.push(e);
    console.log(this.enviadoresSeleccionados);

  }

  deleteItem(e: any) {
    this.enviadoresSeleccionados = this.enviadoresSeleccionados.filter((element: any) => element !== e.value);

    console.log(this.enviadoresSeleccionados);
  }

  buscar() {
    let fecha_desde: any = (<HTMLInputElement>document.getElementById('fecha_desde'))
      .value;
    let fecha_hasta: any = (<HTMLInputElement>document.getElementById('fecha_hasta'))
      .value;

    if (fecha_desde == '') {
      fecha_desde = this.hoyFormated;
    }

    if (fecha_hasta == '') {
      fecha_hasta = fecha_desde;
    }

    console.log(fecha_desde, fecha_hasta);

    let filtroFechas = {
      fecha_desde: fecha_desde,
      fecha_hasta: fecha_hasta,
    }

    console.log(this.enviadoresSeleccionados);

    for (let e of this.enviadoresSeleccionados) {
      if (e === "Enviador Ticktes") {
        this.getTicketsByDate(filtroFechas);
      }

      if (e === "Enviador NoAsistidos") {
        this.getNoAsistidosByDate(filtroFechas)
      }
    }


  }

  getTicketsByDate(filtroFechas: any) {
    this.apiTickets.post('historicosFecha', filtroFechas)
      .pipe(
        map((data) => {
          console.log(data);
        })
      )
      .subscribe();
  }

  getNoAsistidosByDate(filtroFechas: any) {
    this.apiNoAsistidos.post('HistoricosNoAsistidosFecha', filtroFechas)
      .pipe(
        map((data) => {
          console.log(data);
        })
      )
      .subscribe();
  }

}
function throwError(arg0: string): any {
  throw new Error('Function not implemented.');
}

