import React, { Component } from 'react';
import { Link } from 'react-router';
import { deletePoll } from '../actions/index';

export default class PollTitle extends Component {
  handleDelete() {
    let { dispatch, _id } = this.props;
    dispatch(deletePoll(_id));
  }

  render() {
    let { _id, username,question } = this.props;
    return (
      <tr
        className='title-list-item'
        id={_id}
      >
        <td>
          <Link
            to={`/users/${username}/${question}`}
          >
            <h3>
              {this.props.question}
            </h3>
          </Link>
        </td>
        <td>
          <button
            onClick={this.handleDelete.bind(this)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}
