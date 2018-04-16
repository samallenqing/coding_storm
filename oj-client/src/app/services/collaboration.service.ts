import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

declare var io: any;
var users: string[];

@Injectable()
export class CollaborationService {
  collaborationSocket: any;
  private _userSource = new Subject<string>();


  constructor() {
  }

  init(editor: any, sessionId: string): Observable<string> {
    this.collaborationSocket = io(window.location.origin, {query: 'sessionId=' + sessionId});
    this.collaborationSocket.on("change", (delta: string) => {
      console.log('collaboration editor changes ' + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      console.log(delta);
      editor.getSession().getDocument().applyDeltas([delta]);
    });

    this.collaborationSocket.on("show", (res: string[]) => {
      console.log('Get user from backend:' + res);
      this._userSource.next(res.toString());
    });

    return this._userSource.asObservable();
  }

  change(delta: string): void {
    this.collaborationSocket.emit("change", delta);
  }

  show(sessionId: string): string[] {
    this.collaborationSocket.emit("show", sessionId);
    return users;
  }

  restoreBuffer(): void{
    this.collaborationSocket.emit('restore');
  }

}
