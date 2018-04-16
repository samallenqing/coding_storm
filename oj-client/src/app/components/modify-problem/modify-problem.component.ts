import {Component, OnInit} from '@angular/core';
import {Problem} from "../../models/problem.models";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-modify-problem',
  templateUrl: './modify-problem.component.html',
  styleUrls: ['./modify-problem.component.scss']
})
export class ModifyProblemComponent implements OnInit {

  problem: Problem;
  difficulties: string[] = ['Easy', 'Medium', 'Hard', 'Super'];

  constructor(private dataService: DataService,
              private route: ActivatedRoute, private dirRoute: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dataService.getProblem(+params['id'])
        .then(problem => this.problem = problem)
    });
  }

  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.modifyProblem();
  }

  modifyProblem() {
    this.dataService.modifyProblem(this.problem);
    this.dirRoute.navigate(['problems']);
  }
}
