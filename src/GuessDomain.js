/* @flow */

export type Person = {
  name: string;
  resultId: string;
}

export type Game = {
  gameid: string;
  picture: string;
  persons: Array<Person>;
}

export type GameResult = {
  gameid: string;
  resultid: string;
  selectedResultid: string;
  correct: boolean;
  round: number;
  points: number;
  finish: boolean;
}

export type Highscore = {
  id: number;
  firstName: string;
  lastName: string;
  games: number;
  maxPoints: number;
  avgPoints: number;
}

export type HighscoreList = {
  resultsAllover: Array<Highscore>;
  resultsYear: Array<Highscore>;
  resultsMonth: Array<Highscore>;
}
