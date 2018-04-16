import {Component, OnInit} from '@angular/core';
import {Problem} from '../../models/problem.models';
import {DataService} from '../../services/data.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.scss']
})

export class NewProblemComponent implements OnInit {
  newProblem = new Problem();
  difficulties: string[] = ['Easy', 'Medium', 'Hard', 'Super'];

  constructor(private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
  }

  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.addProblem();
  }

  addProblem() {
    this.dataService.addProblem(this.newProblem);
    this.router.navigate(['problems']);
  }
}
