import {Injectable} from '@angular/core';
import {Problem} from '../models/problem.models';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class DataService {

  private _problemSource = new BehaviorSubject<Problem[]>([]);


  constructor(private httpClient: HttpClient) {
  }

  getProblems(): Observable<Problem[]> {
    this.httpClient.get("api/v1/problems")
      .toPromise()
      .then((res: any) => {
        this._problemSource.next(res);
      })
      .catch(this.handleError);
    return this._problemSource.asObservable();
  }

  getProblem(id: number): Promise<Problem> {
    return this.httpClient.get(`api/v1/problems/${id}`)
      .toPromise()
      .then((res: any) => res)
      .catch(this.handleError);
  }

  addProblem(newProblem: Problem) {
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.httpClient.post("api/v1/problems", newProblem, options)
      .toPromise()
      .then((res: any) => {
        this.getProblems();
        return res;
      })
      .catch(this.handleError);
  }

  deleteProblem(id: String): Promise<Problem> {
    return this.httpClient.delete(`api/v1/problems/` + id)
      .toPromise()
      .then((res: any) => res)
      .catch(this.handleError);
  }

  modifyProblem(newProblem: Problem) {
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.httpClient.put('api/v1/problems', newProblem, options)
      .toPromise()
      .then((res: any) => res)
      .catch(this.handleError);
  }

  buildAndRun(data): Promise<any> {
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    return this.httpClient.post('api/v1/build_and_run', data, options)
      .toPromise()
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(this.handleError);
  }

  private handleError(err: any): Promise<any> {
    console.error("An error occurred:", err);
    return Promise.reject(err.body || err);
  }


}
