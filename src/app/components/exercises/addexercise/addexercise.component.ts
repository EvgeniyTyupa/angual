import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-addexercise',
  templateUrl: './addexercise.component.html',
  styleUrls: ['./addexercise.component.css']
})
export class AddexerciseComponent implements OnInit {
  form: FormGroup;
  serverError: string = "";
  userId: string;

  options: string[] = ["meters", "kilograms", "time"];
  selectedOption: string = this.options[0];

  constructor(
    private exerciseService: ExerciseService,
    private authService: AuthService) { }

  get title(){
    return this.form.get('title');
  }

  get measurement(){
    return this.form.get('measurement');
  }

  ngOnInit(): void {
    this.authService.userData$.subscribe(user => {
      this.userId = user._id;
    });

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      measurement: new FormControl('', [])
    });
  }

  onSubmit(){
    const title = this.form.value.title;
    const measurement = this.selectedOption;
    
    this.exerciseService.addExercise(this.userId, title, measurement)
      .subscribe((res) => {
        console.log(res);
        this.form.value.title = "";
        this.selectedOption = this.options[0];
      },
      (err) => {
        this.serverError = err.error.message;
      }
    );
  }

  handleSelect(option: string){
    this.selectedOption = option;
  }

}
