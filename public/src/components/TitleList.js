import React, { Component } from 'react';
import { Link } from 'react-router';

export default class TitleList extends Component {
  renderTitles() {
    if (!this.props.polls) {
      return null;
    }

    let list = this.props.polls.map((pollInfo) => {
      return (
        <tr
          className='title-list-item'
          key={pollInfo._id}
          id={pollInfo._id}
        >
          <td>
            <Link
              to={`/users/${this.props.username}/${pollInfo.question}`}
            >
              <h3>
                {pollInfo.question}
              </h3>
              </Link>
            </td>
          <td>
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
      );
    });

    return list;
  }

  render() {
    return (
      <div className="panel panel-default">
        <table className="table current-user-polls">
          <tbody>
          {this.renderTitles()}
        </tbody>
      </table></div>
    );
  }
}
