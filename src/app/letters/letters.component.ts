 import { Component, OnInit,
			trigger,
			state,
			style,
			transition, 
			animate, 
			keyframes
 } from '@angular/core';
 import { DataService } from "../data.service"; 
 import { Goals } from "../goals";

@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.css'],
  animations: [
  	trigger('focusPanel', [
  		state('inactive', style({
  			 transform: 'scale(1)'
  		})),
  		state('active', style({
  			transform: 'translateX(550px)'
  		})),
  		transition('inactive=>active', animate('100ms ease-in')), 
  		transition('active=>inactive', animate('100ms ease-out')), 
  		]),  
  	trigger('inputPanel', [
  		state('invisible', style({
  			 transform: 'scale(0)'
  		})),
  		state('visible', style({
  			transform: 'scale(1)'
  		})),
  		transition('visible=>invisible', animate('100ms ease-in')), 
  		transition('invisible=>visible', animate('100ms ease-out')), 
  		]), 
  			trigger('hideInput', [
  					state('hide', style({
  						transform: 'scale(0)'
  					})),
  					state('show', style({
  						transform: 'scale(1)'
  					})),
  					transition('hide=>show', animate('250ms ease-in') ),
  			
  				]),


  ]
})
export class LettersComponent implements OnInit {
		state: string = 'inactive';
		inp: string = 'visible';
		hid: string = 'hide';
		
	toggleMove(){
		this.state = (this.state === 'inactive' ? 'active': 'inactive');
}

	inputSlice(){
		this.inp = (this.inp === 'visible' ? 'invisible': 'visible')
	}
	showInput(){
		this.hid = (this.hid === 'hide' ? 'show' : 'hide')
	}

  goals: Goals[] = [];
  goal: string;

  constructor(private dataService: DataService) { 
      this.dataService.getGoals()
      .subscribe(goals => {
        this.goals = goals;
      })
  }

  addGoal(event){
      event.preventDefault();
      var newGoal = {
        goal: this.goal
      }
      this.dataService.addGoal(newGoal)
        .subscribe(goal => {
             this.goals.push(goal);
        })
      }

  deleteGoal(id){
      var goals = this.goals;

      this.dataService.deleteGoal(id).subscribe(data => {
        if(data.n === 1){ 
          for(var i = 0; i < goals.length; i++ ){
            if(goals[i]._id == id){
              goals.splice(i, 1);
            }
          }
        }
      })
  }


  ngOnInit() {
  }
 
}
