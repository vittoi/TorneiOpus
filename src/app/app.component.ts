import { WeekDay } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { provideRoutes, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chaves';
  allTeams: string[];
  keys:string[];
  nColumn:number;
  columns: any[];
  len:number;
  qtdElem:number;
  
  constructor(private router:Router){
    this.allTeams = [
      "Vitor",
      "Joao",
      "Pedro",
      "Maria",
      "Vitoria",
      "Joana",
      /*"Alex",
      "Luiz",
      "Vitor2",
      "Joao2",
      "Pedro2",
      "Maria2",
      "Vitoria2",
      "Joana2",
      "Alex2",
      "Luiz2" */
    ];
    
    this.keys = Array<string>();
    
    
    this.len = this.allTeams.length
    let fact = Math.log2(this.len);
    let qtdBotao = Math.pow(2, Math.ceil(fact));
    this.qtdElem = qtdBotao*2-1;
    
    this.nColumn = Math.ceil(fact)+1
    this.columns = Array<any>(this.nColumn);

    this.initializeRow(qtdBotao)
    
    this.columns[this.nColumn-1].push({isButton: 0, idxOnKey:  -1})
    console.log(this.columns[this.nColumn-1])
    
    

    this.initializeKeys(qtdBotao)
  }
  initializeKeys(qtdBotao: number){
    this.keys.push(... Array(this.qtdElem).fill("",0));
    let j= 0;
    for(let i =0; i<qtdBotao && j!=this.len; i+=2, j++){
      this.keys[i] = this.allTeams[j];
    }

    for(let i =1; i<qtdBotao; i+=2, j++){
      this.keys[i] = this.allTeams[j];
      if(j>=this.len && this.keys[i-1] != ""){
        let newpos = Math.floor(i/2) + Math.pow(2, Math.ceil(Math.log2(this.len)));
        this.keys[newpos] = this.keys[i-1];

        //faz os botoes sumirem
        this.columns[this.nColumn-1][i] = {isButton: 0, idxOnKey:  -1, w: 0, r: 0}
        this.columns[this.nColumn-1][i-1] = {isButton: 0, idxOnKey:  -1, w: 0, r: 0}
        this.columns[this.nColumn-2][i-1] = {isButton: 1, idxOnKey:  newpos, w: 0, r: 0}
      }
    }


  }
  

  initializeRow(qtdItem:number){
    let qtdPerRow = qtdItem;
    let beginSpace=0;
    let spaceBetween;
    let init:number = 0;
    let wd = 160
    let rg = -30; 
    let dif =0;
    let aum = 80
    
    for(let i =this.nColumn-1; i>=0 ; i--){
      let vet = Array(qtdPerRow); //vetor de true e false true se vai ter o botao false se nao
      
      if(i === this.nColumn-1) {
        vet.fill( {isButton: 1, idxOnKey:  -1, w: 0, r: 0} ,0);
        
      }else{
        spaceBetween = beginSpace*2+1;
        vet.fill({isButton: 0, idxOnKey:  -1, w: wd, r: rg},0);
        
        
        for (let j = 0, actualInd = beginSpace; j < qtdItem; j++) {
          vet[actualInd] = {isButton: 1, idxOnKey:-1, w: wd, r: rg};
          actualInd = actualInd+spaceBetween+1;
        }
        beginSpace = beginSpace*2+1;
        dif+=2.5
        rg = rg-aum +2.5;
        aum = aum*2;
        wd = (wd*2)-dif;
        console.log(wd, rg);
      }
      
      for(let j = 0,nItem = 0; j<qtdPerRow; j++){
        
        if(vet[j].isButton==1){
         vet[j] = {isButton: 1, idxOnKey: init+nItem, w: vet[j].w, r: vet[j].r}
         nItem++;
      }else{
         vet[j] ={isButton: 0, idxOnKey: -1, w: vet[j].w, r: vet[j].r} ;
      }
      }
      
      this.columns[i] = vet.slice()
      /* console.log(this.columns, i, init) */
      init = init+qtdItem;
      qtdItem = qtdItem/2; 
    } 

  }

  goToChampionship(){
    this.router.navigate(['Inicio']);
  }

  nextKey(idxItem:number){
    let newpos = Math.floor(idxItem/2) + Math.pow(2, Math.ceil(Math.log2(this.len)));
    if((idxItem%2 == 1 && this.keys[idxItem-1] =="") || (idxItem%2 == 0 && this.keys[idxItem+1] =="") || idxItem== this.qtdElem-1)
      return
      this.keys[newpos] = this.keys[idxItem];
    
  }
}
