import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';
import { PreguntaDosOpc } from 'src/app/Shared/Data';

@Component({
  selector: 'app-encuesta-cog',
  templateUrl: './encuesta-cog.component.html',
  styleUrls: ['./encuesta-cog.component.scss']
})
export class EncuestaCogComponent implements OnInit{
  isSelected: { [key: string]: boolean } = {};
  caregoria: String = 'Undefinid';
  preguntasCamIcu: PreguntaDosOpc[] = [
    {texto: 'Existencia de Cambio agudo del Estado Mental', respuesta:''},
    {texto: 'Estado Mental del Paciente ha fluctuado durante las últimas 24hrs', respuesta:''},
    {texto: 'Apretar Mano (Médico) cuando el paciente diga A', respuesta:''},
    {texto: 'Diga al Paciente que Deletree C-A-S-A-B-L-A-N-C-A', respuesta:''},
    {texto: 'Vigile al pacinete y verifique: Alerta de RASS0', respuesta:''},
    {texto: 'Las Piedras flotan en el Agua', respuesta:''},
    { texto: 'Hay Peces en el mar', respuesta: '' },
    { texto: '1kg pesa más que 2kg', respuesta: '' },
    { texto: 'Los martillos sirven para poner clavos', respuesta: '' }
  ] //Preguntas del SI o NO

  constructor(private router: Router, private categoriaEncuestaComponenet: ApiService){

  }

  ngOnInit(): void {
      this.categoriaEncuestaComponenet.selectEncuest$.subscribe(subCategoria => { 
        this.caregoria = subCategoria;
      });
  }

  // Función para alternar el color
  toggleTextColor(textKey: string): void {
    this.isSelected[textKey] = !this.isSelected[textKey];
  }
  //Metodo del boton Finalizar
  finalizarEncuesta(){
    this.router.navigate(['home/resultado']);
  }
  //Receptaculo Categoria
  actualizarEncuesta(encuestaS: String){
    this.caregoria = encuestaS;
  }

}
