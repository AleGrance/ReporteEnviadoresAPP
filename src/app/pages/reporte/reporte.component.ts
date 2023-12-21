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
import { ToastrService } from 'ngx-toastr';
import { ApiPrimeraconsultaService } from 'src/app/services/api-primeraconsulta.service';

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
    public apiSucursales48Hs: ApiSucursales48hsService,
    public apiPrimeraConsulta: ApiPrimeraconsultaService,
    public toastr: ToastrService
  ) {
    registerLocaleData(localeEsPy);
  }

  // Icons
  faRefresh = faRefresh;
  faFileExcel = faFileExcel;

  public cantTickets: any = [];
  public cantTicketsByDate: any = [];

  public cantNoAsistidos: any = [];
  public cant48hs: any = [];
  public cantSucursales48hs: any = [];
  public cantSucursales48hsByDate: any = [];
  public cantPrimeraConsulta: any = [];

  // Fecha
  public pipe = new DatePipe('en-US');

  // Fecha
  public hoy = new Date();
  public hoyFormated = this.pipe.transform(this.hoy, 'yyyy-MM-dd');
  public fecha_desde: any = '';
  public fecha_hasta: any = '';


  // Enviadores
  public enviadores = [
    { nombre: 'Enviador Ticktes' },
    { nombre: 'Enviador NoAsistidos' },
    { nombre: 'Enviador Sucursales48hs' },
    { nombre: 'Enviador Primera Consulta' },
  ];

  public enviadoresSeleccionados: any = [];

  // Datos para la tabla
  public datosHistoricosTabla: any = [];

  ngOnInit(): void {
    console.log('Hoy es:', this.hoyFormated);
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

  getPrimeraConsulta() {
    // Se muestra el spinner al hacer click en el btn
    let cant_primeraConsulta = document.getElementById('cant_primeraConsulta');
    cant_primeraConsulta?.insertAdjacentHTML(
      'afterbegin',
      `<div class="spinner-border spinner-border-sm" role="status">
    <span class="visually-hidden"></span>
  </div>`
    );

    // Sucursales Sucursales 48hs
    this.apiPrimeraConsulta
      .get('PrimeraConsultaNotificados')
      .pipe(
        map((data) => {
          this.cantPrimeraConsulta = data;
          //console.log(this.cantSucursales48hs);
          // Se reemplaza el spinner por el dato obtenido
          cant_primeraConsulta?.replaceChildren(this.cantPrimeraConsulta);
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

  deleteAllItems() {
    console.log('clear all items');
    this.enviadoresSeleccionados = [];
  }

  // Buscar

  retraso = () => new Promise((r) => {
    setTimeout(r, 2000);
  });

  async buscar() {
    if (this.enviadoresSeleccionados.length <= 0) {
      this.toastr.info('Debe seleccionar al menos un enviador', 'Alerta', {
        progressBar: true,
        positionClass: 'toast-top-center'
      });

      console.log('Debe seleccionar al menos un enviador');
      return;
    }

    this.fecha_desde = (<HTMLInputElement>document.getElementById('fecha_desde')).value;
    this.fecha_hasta = (<HTMLInputElement>document.getElementById('fecha_hasta')).value;

    if (this.fecha_desde == '') {
      this.fecha_desde = this.hoyFormated;
    }

    if (this.fecha_hasta == '') {
      this.fecha_hasta = this.fecha_desde;
    }

    console.log(this.fecha_desde, this.fecha_hasta);

    let filtroFechas = {
      fecha_desde: this.fecha_desde,
      fecha_hasta: this.fecha_hasta,
    }

    console.log(this.enviadoresSeleccionados);

    for (let e of this.enviadoresSeleccionados) {
      console.log(e);
      if (e === "Enviador Ticktes") {
        this.getTicketsByDate(filtroFechas);
      }

      if (e === "Enviador NoAsistidos") {
        this.getNoAsistidosByDate(filtroFechas)
      }

      if (e === "Enviador Sucursales48hs") {
        this.getSucursales48hsByDate(filtroFechas)
      }

      if (e === "Enviador Primera Consulta") {
        this.getPrimeraConsultaByDate(filtroFechas)
      }

      await this.retraso();
    }

    // Generar los datos para mostrar en la tabla
    this.genDataTable();
  }


  /**
   * OBTENER HISTORICOS POR FECHA
   * @param filtroFechas
   */

  getTicketsByDate(filtroFechas: any) {
    this.apiTickets.post('historicosFecha', filtroFechas)
      .pipe(
        map((data) => {
          console.log(data);
          this.cantTicketsByDate = data;
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

  getSucursales48hsByDate(filtroFechas: any) {
    this.apiSucursales48Hs.post('historicosSucursales48hsFecha', filtroFechas)
      .pipe(
        map((data) => {
          console.log(data);
          this.cantSucursales48hsByDate = data;
        })
      )
      .subscribe();
  }

  getPrimeraConsultaByDate(filtroFechas: any) {
    this.apiPrimeraConsulta.post('historicosPrimeraConsultaFecha', filtroFechas)
      .pipe(
        map((data) => {
          console.log(data);
        })
      )
      .subscribe();
  }

  // Generar los datos para mostrar en la tabla
  genDataTable() {
    console.log('Gen table');
    console.log(this.fecha_desde, this.fecha_hasta);

    let fechaHasta = new Date(this.fecha_hasta);

    for (let fecha = new Date(this.fecha_desde); fecha <= fechaHasta; fecha.setDate(fecha.getDate() + 1)) {
      console.log('dentro del for')
      let fechaStr = fecha.toISOString().split('T')[0]; // Convertir la fecha a string en formato 'YYYY-MM-DD'

      // Buscar la cantidad en arrayUno
      let cantidadArrayUno = 0;
      let itemArrayUno = this.cantTicketsByDate.find((item: any) => item.fecha === fechaStr);
      if (itemArrayUno) {
        cantidadArrayUno = itemArrayUno.cant_enviados;
      }

      // Buscar la cantidad en arrayDos
      let cantidadArrayDos = 0;
      let itemArrayDos = this.cantSucursales48hsByDate.find((item: any) => item.fecha === fechaStr);
      if (itemArrayDos) {
        cantidadArrayDos = itemArrayDos.cant_enviados;
      }

      // Agregar el objeto al array ambosArrays
      this.datosHistoricosTabla.push({
        fecha: fechaStr,
        arrayUno: cantidadArrayUno,
        arrayDos: cantidadArrayDos,
      });
    }

    console.log(this.datosHistoricosTabla);
  }
}
