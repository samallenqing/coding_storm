import {Component, OnInit} from '@angular/core';
import {Problem} from "../../models/problem.models";
import {Subscription} from "rxjs/Subscription";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-edit-problem',
  templateUrl: './edit-problem.component.html',
  styleUrls: ['./edit-problem.component.scss']
})
export class EditProblemComponent implements OnInit {
  subscriptionProblems: Subscription;

  problems: Problem[];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.getProblems();
  }

  ngOnDestory() {
    this.subscriptionProblems.unsubscribe();
  }

  deleteProblem(problem: any) {
    this.dataService.deleteProblem(problem._id);
    this.problems.splice(problem.id -1, 1);
  }

  private getProblems() {
    this.subscriptionProblems = this.dataService.getProblems()
      .subscribe(problems => this.problems = problems);
  }
}
