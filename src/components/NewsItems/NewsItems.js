import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewsItems extends Component {
  render() {
    const { news } = this.props;
    const renderHTML = (escapedHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: escapedHTML } });
    return (
      <div className='content games list'>
        <h1>AppID: {news.appid}</h1>
        <button
          onClick={e => {

          }}
        >
          Save to Library
        </button>
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
    news: state.games.news
  }
}

export default connect(mapStateToProps)(NewsItems);