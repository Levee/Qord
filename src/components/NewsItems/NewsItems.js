import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewsItems extends Component {
  render() {
    const { user, news, current, dispatch } = this.props;
    const renderHTML = (escapedHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: escapedHTML } });
    return (
      <div className='content games list'>
        <h1>AppID: {news.appid}</h1>
        <div className='button pink' onClick={() => {
          dispatch({ type: 'SAVE_CURRENT_GAME', payload: {
            user_id: user.id,
            app_id: current.steam_appid,
            title: current.name,
            developers: current.developers,
            publishers: current.publishers,
            description: current.short_description,
          }});
        }}>
          <div className='shine'>
          </div>Save to Library
        </div>
        {
          news.newsitems.map((x, i) =>
            <div className='news-item' key={i}>
              <h2>{x.title}</h2>
              <p>Author: {x.author ? x.author : 'None found'}</p>
              <a target='_blank' rel='noopener noreferrer' href={x.url}>View original post</a><br />
              <div>{
                renderHTML(
                  x.contents
                    .replace(/\[/g, '<')
                    .replace(/\]/g, '>')
                    .replace(/\*/g, 'li')
                    .replace(/<img>\{STEAM_CLAN_IMAGE\}/g, '<img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/clans')
                    .replace(/<\/img>/g, '"/>')
                    .replace(/<url/g, '<a href')
                    .replace(/\/url>/g, '/a>')
                    .replace(/<a/g, '<a target="_blank" ')
                )
              }</div>
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    news: state.games.news,
    current: state.library.current,
  }
}

export default connect(mapStateToProps)(NewsItems);