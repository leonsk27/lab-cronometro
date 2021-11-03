import { Component } from '@angular/core';
import { Tiempo } from "./classes/tiempo";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cronometro';
  nombreReiniciarVuelta = "Reiniciar";
  nombreIniciarPausar = "iniciar";

  boolReiniciarVuelta = true;
  boolIniciarPausar = false;
  list: number[][] = [];
  tiempoActual: Tiempo = new Tiempo();
  centiSeg = 0;
  seg = 0;
  min = 0;
  vuelta = 0;
  vueltacentiSeg = 0;
  vueltaseg = 0;
  vueltamin = 0;
  reiniciarVuelta(): void {
    if (!this.boolReiniciarVuelta) this.crearTiempo();
    else this.limpiar();
  }
  crearTiempo() {
    this.tiempoActual.vuelta  = this.vuelta;
    this.vueltamin = this.tiempoActual.vueltaMin;
    this.vueltaseg = this.tiempoActual.vueltaSeg;
    this.vueltacentiSeg = this.tiempoActual.vueltaCentiseg;
    
    this.min = this.tiempoActual.min;
    this.seg = this.tiempoActual.seg;
    this.centiSeg = this.tiempoActual.centiseg;

    this.list.unshift([
      ++this.vuelta,
      this.vueltamin,
      this.vueltaseg,
      this.vueltacentiSeg,
      
      this.min,
      this.seg,
      this.centiSeg
    ]);
    this.tiempoActual.vuelta += 2;
  }
  limpiar() {
    this.list = [];
    this.tiempoActual = new Tiempo();
    this.vuelta =0;
      this.vueltamin = 0;
      this.vueltaseg = 0;
      this.vueltacentiSeg = 0;
      
      this.min = 0;
      this.seg = 0;
      this.centiSeg = 0;

    this.nombreReiniciarVuelta = "Reiniciar";
    this.nombreIniciarPausar = "iniciar";

    this.boolReiniciarVuelta = true;
    this.boolIniciarPausar = false;
  }








  iniciarPausar(): void {
    if (!this.boolIniciarPausar) {
      this.boolIniciarPausar = true;
      this.nombreIniciarPausar = "Pausar";
      this.minuto();

      this.boolReiniciarVuelta = false;
      this.nombreReiniciarVuelta = "Vuelta";

    } else {
      this.boolIniciarPausar = false;
      this.nombreIniciarPausar = "Iniciar";

      this.boolReiniciarVuelta = true;
      this.nombreReiniciarVuelta = "Reiniciar";
    }
    
  }

  calcularTiempo() {

    this.tiempoActual.vueltaMin = this.tiempoActual.min - this.min;
    this.tiempoActual.vueltaSeg = this.tiempoActual.seg - this.seg;
    this.tiempoActual.vueltaCentiseg = this.tiempoActual.centiseg - this.centiSeg;

    if (this.tiempoActual.vueltaSeg < 0) {
      console.log(this.tiempoActual.vueltaCentiseg);
      console.log(this.centiSeg);
      this.tiempoActual.vueltaMin--;
      this.tiempoActual.vueltaSeg = 100 + this.tiempoActual.vueltaSeg;
    }
    if (this.tiempoActual.vueltaCentiseg < 0) {
      console.log(this.tiempoActual.vueltaCentiseg);
      console.log(this.centiSeg);
      this.tiempoActual.vueltaSeg--;
      this.tiempoActual.vueltaCentiseg = 100 + this.tiempoActual.vueltaCentiseg;
    }
  }
  centisegundos() {
      if (++this.tiempoActual.centiseg > 99) {this.segundos(); return};
        setTimeout(() =>{
          this.calcularTiempo();
        if (this.boolIniciarPausar) {
          this.centisegundos();
        }
        }, 10);
  }
  segundos() {
    if (this.tiempoActual.centiseg == 100) {
      this.tiempoActual.seg++;
      this.tiempoActual.centiseg = 0;
      this.centisegundos();
    }
    if (this.tiempoActual.seg == 60) {
      this.minuto();
    }
  }
  minuto() {
    if (this.tiempoActual.min == 59 && this.tiempoActual.seg == 59 && this.tiempoActual.centiseg == 100)
    { 
      this.iniciarPausar();
      this.reiniciarVuelta();
    }
      else {
        if (this.tiempoActual.seg == 60) {
          this.tiempoActual.min++;
          this.tiempoActual.seg = 0;
        }
        this.centisegundos();
      }
  }
}
