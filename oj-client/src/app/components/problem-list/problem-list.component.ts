import {Component, OnInit} from '@angular/core';
import {Problem} from '../../models/problem.models';
import {DataService} from '../../services/data.service';
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.scss'],
})

export class ProblemListComponent implements OnInit {
  subscriptionProblems: Subscription;

  problems: Problem[];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.getProblems();
  }

  ngOnDestory(){
    this.subscriptionProblems.unsubscribe();
  }


  private getProblems() {
    this.subscriptionProblems = this.dataService.getProblems()
      .subscribe(problems=> this.problems = problems);
  }
}
