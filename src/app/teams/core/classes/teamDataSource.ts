import { Team } from './team';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MetaData, PagedResponse } from './paged-response';
import { TeamService } from '../../services/team.service';
import { CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';

export class TeamDataSource implements DataSource<Team> {
  private playersSubject = new BehaviorSubject<Team[]>([]);
  private metaDataSubject = new BehaviorSubject<MetaData>(new MetaData());
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public metaData$ = this.metaDataSubject.asObservable();
  public currentTeams: Team[];

  constructor(private teamService: TeamService) {}

  connect(collectionViewer: CollectionViewer): Observable<Team[] | readonly Team[]> {
    return this.playersSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.playersSubject.complete();
    this.loadingSubject.complete();
  }

  loadTeams(filter = '', pageIndex = 0, pageSize = 10, sortColumn = 'Name', sortDirection = 'asc') {
    this.loadingSubject.next(true);

    this.teamService
      .getTeam(filter, pageIndex + 1, pageSize, sortColumn, sortDirection)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: PagedResponse<Team>) => {
        this.currentTeams = result.items;
        this.playersSubject.next(result.items);
        this.metaDataSubject.next(result.metaData);
      });
  }
}
