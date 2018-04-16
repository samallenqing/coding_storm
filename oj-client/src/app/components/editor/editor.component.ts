import {Component, OnInit} from '@angular/core';
import {CollaborationService} from "../../services/collaboration.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {DataService} from "../../services/data.service";

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  editor: any;
  public languages: string[] = ['Java', 'Python', 'C++'];
  language: string = 'Java';
  sessionID: string;
  users: string[];
  subscriptionUsers: Subscription;
  output: string = '';

  defaultContent = {
    "Java":
`public class Example {
   public static void main(String[] args) {
  			// Type your Java code here.
  }
}`
    ,
    'Python':
`class Solution:
    # write your python code here.`
    ,
    "C++":
`
#include<iostream> 

int main( int argc, const char* argv[] ){
    // Type your code here
}`
  };

  constructor(private collaboration: CollaborationService, private route: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.sessionID = params['id'];
        this.initEditor();
        this.collaboration.restoreBuffer();
      })
  }

  initEditor(): void {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.resetEditor();
    this.subscriptionUsers = this.collaboration.init(this.editor, this.sessionID)
      .subscribe(users => this.users = users.split(','));
    this.editor.lastAppliedChange = null;
    this.editor.on("change", (e) => {
      console.log('editor changes: ' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e) {
        this.collaboration.change(JSON.stringify(e));
      }
    });
  }

  setLanguage(language: string): void {
    this.language = language;
    this.resetEditor();
  }

  submit(): void {
    let userCode = this.editor.getValue();
    console.log(userCode);
    const data = {
      userCode: userCode,
      lang: this.language.toLocaleLowerCase()
    };
    this.dataService.buildAndRun(data)
      .then(res => this.output = res);

  }


  private resetEditor() {
    this.editor.setValue(this.defaultContent[this.language]);
    this.editor.getSession().setMode("ace/mode/" + this.language.toLocaleLowerCase());
  }
}
