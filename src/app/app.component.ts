import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {API} from 'aws-amplify';
import {Pizza} from '../types/pizza';

const apiName = 'remco'; // replace with the name of your API
const path = '/pizzas'; // replace with the name of the path of your resource

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'amplify-remco';
  public createForm: FormGroup;
  public submitForm: () => void;

  pizzas: Array<Pizza>;

  constructor(private fb: FormBuilder) {
  }
  public async ngOnInit(): Promise<void> {
  this.createForm = this.fb.group({
  name: ['', Validators.required],
  description: ['', Validators.required],
  city: ['', Validators.required]
  });
  this.fetchData();
  }
  public async onSubmit(pizza: Pizza): Promise<void> {
  try {
  const response = await API.post(apiName, path, {body: pizza});
  console.log('Added pizza successfully: ' + JSON.stringify(response));
  } catch (error) {
  console.error(error);
  } finally {
  this.createForm.reset();
  }
  }

  private async fetchData(): Promise<void> {
  try {
  this.pizzas = await API.get(apiName, path, {});
  } catch (error) {
  console.error(error);
  }
  }   
 }
// export class AppComponent {
//   title = 'amplify-remco';
// }
