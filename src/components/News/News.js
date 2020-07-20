import React, { Component } from 'react';
import { connect } from 'react-redux';
import fuzzysort from 'fuzzysort';
import NewsItems from '../NewsItems/NewsItems';
import BarLoader from 'react-spinners/BarLoader';
import './News.css';

const override = `
  border-radius: 100px;
  border: 1px solid #db2cb5;
`;

class News extends Component {
  state = {
    name: '',
    id: '',
    count: '',
  }

  componentDidMount = () => {
    this.props.dispatch({ type: 'FETCH_ALL_GAMES' });
  }

  getGameId = (event) => {
    const { games, dispatch } = this.props;
    const results = fuzzysort.go(event.target.value, games, { threshold: -Infinity, limit: 15, allowTypo: true, key: 'name' });
    console.log(results);
    if (!event || !results.total) {
      return;
    } else {
      dispatch({ type: 'FETCH_GAME_SEARCH_RESULTS', payload: [...results] });
      this.setState({ id: results[0].obj.appid });
      return results[0].obj.appid;
    }
  }

  getNews = () => {
    const { dispatch } = this.props;
    if(!this.state.id || !this.state.count) {
      alert('Error! Inputs cannot be empty.');
      return;
    }
    dispatch({ type: 'FETCH_NEWS', payload: { id: this.state.id, count: this.state.count } });
    dispatch({ type: 'FETCH_CURRENT_GAME', payload: this.state.id });
  }

  render() {
    const { search, news, loading } = this.props;
    return (
      <>{loading ? <>
        <p>Games are currently loading...</p>
        <BarLoader
          css={override}
          height='10px'
          width='50%'
          color='#db2cb5'
          loading={loading}
        /></> :
        <><div className='content games search'>
          <input
            autoComplete='off'
            className='input game'
            type='text'
            name='game'
            list='game-titles'
            onChange={this.getGameId}
            placeholder='Enter a title...'
          />
          <input
            autoComplete='off'
            className='input post'
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
          <div className='content-games'>
            <div className='button pink' onClick={this.getNews}>
              <div className='shine'>
              </div>View Game
            </div>
          </div>
          </div>
          {news === null ? <h3>Enter an app ID above to get the latest news on a game!</h3> : <NewsItems name={this.state.name} />}
        </>}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    games: state.games.games,
    search: state.games.search,
    news: state.games.news,
    loading: state.games.loading,
  }
}

export default connect(mapStateToProps)(News);