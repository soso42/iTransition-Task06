import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {GeneratorService} from "./generator.service";
import {DataService} from "./data.service";
declare var require: any;
const Srand = require('seeded-rand');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  random = new Srand();

  initialSumOfRecords = 30;
  numOfAddedRecords = 10;
  recordsList : string[][] = [];

  errorCount = 0;
  country = 'us';
  seed = 0;

  constructor(private generator: GeneratorService) {}

  ngOnInit(): void {
  }

  onClickGenerateData() {
    this.fetchInitialData();
  }

  onClickGenerateSeed() {
    this.seed = this.random.intInRange(0, 9999);
    console.log(this.seed);
  }

  onFormUpdate() {
    if (this.recordsList.length > 0) {
      this.generator.setData(this.seed);
      this.fetchInitialData();
    }
  }

  onScrollDown() {
    this.initialSumOfRecords += this.numOfAddedRecords;
    this.addRecords(this.country, this.errorCount);
  }

  fetchInitialData() {
    this.recordsList = [];
    this.generator.setData(this.seed);
    for (let i = 0; i < this.initialSumOfRecords; i++) {
      this.recordsList.push(this.generator.getRecord(this.country, this.errorCount));
    }
  }

  addRecords(country: string, errorCount: number) {
    for (let i = 0; i < this.initialSumOfRecords; ++i) {
      this.recordsList.push(this.generator.getRecord(country, errorCount));
    }
  }

}
