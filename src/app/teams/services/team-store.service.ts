import { Injectable } from '@angular/core';
import { PlanerService, TeamDto } from '../../api/services/planer-api.service';
import { StateService } from '../../shared/services/state.service';
import { Observable } from 'rxjs';

interface TeamState {
  teams: TeamDto[];
  isLoading: boolean;
  selectedTeamId: number;
}


const initState: TeamState = {
  teams: [],
  isLoading: false,
  // @ts-ignore
  selectedTeamId: undefined
};

@Injectable({
  providedIn: 'root'
})
export class TeamStoreService extends StateService<TeamState> {

  teams$: Observable<TeamDto[]> = this.select(state => state.teams);

  selectedTeams$: Observable<TeamDto | undefined> = this.select(state => {
    return state.teams.find(item => item.id === state.selectedTeamId);
  });

  isLoading$: Observable<boolean> = this.select(state => state.isLoading);


  constructor(private apiService: PlanerService) {
    super(initState);
    this.load();
  }

  getCurrentState(): TeamState {
    return this.state;
  }

  loadingTeams(): void {
    this.setState({ isLoading: true });
  }

  add(team: TeamDto): void {
    this.apiService.postTeam(team).subscribe((data) => {
      if (data) {
        this.setState({ teams: [...this.state.teams, data] });
      }
    });
  }

  load(): void {
    this.loadingTeams();
    this.apiService.getListOfAllTeams().subscribe((res) => {
      if (res) {
        this.setState({ teams: res, isLoading: false });
      }
      this.setState({ isLoading: false });
    });
  }

  update(team: TeamDto): void {
    if (team.id) {
      this.apiService.updateTeam(team.id, team).subscribe((data) => {
        if (data) {
          this.setState({
            teams: this.state.teams.map((item) => (item.id === team.id ? data : item))
          });
        }
      });
    }
  }

  removeTransaction(team: TeamDto): void {
    if (team.id) {
      this.apiService.deleteTeam(team.id).subscribe(() => {
        this.setState({
          selectedTeamId: undefined,
          teams: this.state.teams.filter((item) => item.id !== team.id)
        });
      });
    }
  }

}
