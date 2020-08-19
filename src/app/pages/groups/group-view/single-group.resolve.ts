import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {GroupService} from '../group.service';

@Injectable()
export class SingleGroupResolve implements Resolve<any> {
  constructor(private groupService: GroupService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.groupService.getGroup(route.params.id);
  }

}
