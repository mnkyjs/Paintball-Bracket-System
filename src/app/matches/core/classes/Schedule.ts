import { Team } from 'src/app/teams/core/classes/team';

export class Schedule {
  id: number;
  name: string;
  teams: Team[] = [];
  addClashToAnExistingOne: boolean;
  date: string;
  paintballFieldId: number;
}
