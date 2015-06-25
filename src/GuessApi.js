/**
 * @flow
 */

var API_URL: string = 'http://guess.liip.ch';

type Person = {
  name: string;
  resultId: string;
}

type Game = {
  gameid: string;
  picture: string;
  persons: Array<Person>;
}

type GameResult = {
  gameid: string;
  resultid: string;
  selectedResultid: string;
  correct: boolean;
  round: number;
  points: number;
  finish: boolean;
}

type Highscore = {
  name: string;
  games: number;
  maxScore: number;
  averageScore: number;
  imageUrl: string;
}

/**
 */
class GuessApi {

  /**
   * Returns true when logged in.
   */
  testAuth(): Promise {
    return this.authUrl().then((authUrl) => {
      // If an auth url wasn't found, we are logged in.
      return !authUrl.length;
    });
  }

  authUrl(): Promise {
    return fetch(API_URL + '/', {credentials: true})
      .then(this.parseAuthUrlFromPage);
  }

  logout(): Promise {
    return fetch(API_URL + '/logout', {credentials: true});
  }

  isStartPage(url: string) :boolean {
    return url == API_URL + '/';
  }

  parseAuthUrlFromPage(response: Object) :string {
    var parseLink: RegExp = /a href="(\/auth\/google\S+)"/m;
    return response.text().then((body) => {
      var matches = parseLink.exec(body);
      if (matches && matches[1]) {
        return API_URL + matches[1];
      }

      return '';
    });
  }

  /**
   * @param level
   */
  create(level: string): Promise {
    return this.request('/' + this.getLevelOrDefault(level) + '/create');
  }

  /**
   */
  check(game: Game, resultid: string, time: number): Promise {
    var params: string = '?gameid=' + game.gameid
               + '&resultid=' + resultid
               + '&time=' + time / 1000;
    return this.request('/' + this.getLevelOrDefault('') + '/check' + params)
        .then(gameResult => {
            gameResult.selectedResultid = resultid;
            return gameResult;
          });
  }

  play(level: string): Promise {
    return fetch(API_URL + '/' + this.getLevelOrDefault(level) + '/play');
  }

  highscore(): any {
    return {
      "resultsAllover": [
        {
          id: 1,
          firstName: 'Pascal',
          lastName: 'lastname',
          games: 2,
          maxPoints: 300,
          avgPoints: 122
        }
      ],
      "resultsYear": [
        {
          id: 1,
          firstName: 'Pascal',
          lastName: 'lastname',
          games: 2,
          maxPoints: 300,
          avgPoints: 122
        }
      ],
      "resultsMonth": [
        {
          id: 1,
          firstName: 'Pascal',
          lastName: 'Helfenstein',
          games: 2,
          maxPoints: 300,
          avgPoints: 122
        },
        {
          id: 2,
          firstName: 'Nithuja',
          lastName: 'Nagendram',
          games: 2,
          maxPoints: 300,
          avgPoints: 122
        }
      ]
    };
  }

  //scrapeHighscore(html) {
  //  var $ = cheerio.load(html);
  //
  //  var highscoreList = artoo.scrape('#monthly .col-md-4', {
  //    title: {sel: 'h3'},
  //    url: {sel: 'img', attr: 'src'},
  //    games: {sel: 'span:nth-of-type(1)'},
  //    score: {sel: 'span:nth-of-type(2)'}
  //  });
  //}

  request(path: string): Promise {
    return fetch(API_URL + path, {credentials: true})
      .then((response) => {
        if (response.status > 200) {
          debugger;
          throw Error(path, response);
        }

        return response.json();
      });
  }

  getLevelOrDefault(level: string): string {
    return level || 'level1';
  }
}

module.exports = new GuessApi();

