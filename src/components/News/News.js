import React, { Component } from 'react';
import { connect } from 'react-redux';
import fuzzysort from 'fuzzysort';
import NewsItems from '../NewsItems/NewsItems';

class News extends Component {
  state = {
    name: '',
    id: '',
    count: '',
  }

  componentDidMount = () => {
    console.log('component did mount');
    this.props.dispatch({ type: 'FETCH_ALL_GAMES' });
  }

  getGameId = (event) => {
    const { games, dispatch } = this.props;
    const results = fuzzysort.go(event.target.value, games, { threshold: -Infinity, limit: 15, allowTypo: true, key: 'name' });
    console.log(results);
    if (!event || !results.total) {
      return;
    } else {
      dispatch({ type: 'FETCH_SEARCH_RESULTS', payload: [...results] });
      this.setState({ id: results[0].obj.appid });
      return results[0].obj.appid;
    }
  }

  getNews = () => {
    console.log(this.state.id);
    this.props.dispatch({ type: 'FETCH_NEWS', payload: { id: this.state.id, count: this.state.count } });
  }

  render() {
    const { search, news } = this.props;
    return (
      <>
        <input
          type='text'
          name='game'
          list='game-titles'
          onChange={this.getGameId}
          placeholder='Enter a title...'
        />
        <input
          type='number'
          value={this.state.count}
          onChange={e => this.setState({ count: e.target.value })}
          placeholder='Post #'
        />
        <datalist id='game-titles'>
          {
            search.map((game, i) =>
              <option
                onSelect={() => this.setState({ name: game.obj.name, id: game.obj.appid })}
                key={i}
              >
                {game.obj.name}
              </option>
            )
          }
        </datalist>
        <button onClick={this.getNews}>Get Game News!</button><br />
        {news === null ? <h3>Enter an app ID above to get the latest news on a game!</h3> : <NewsItems />}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    games: state.games.games,
    search: state.games.search,
    news: state.games.news,
  }
}

export default connect(mapStateToProps)(News);