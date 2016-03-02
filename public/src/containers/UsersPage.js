import React,{ Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getAllUsers } from '../actions/index';

class UsersPage extends Component {
  componentWillMount() {
    this.props.getAllUsers();
  }

  renderUsers() {
    let rendered = this.props.users.map(user => {
      return (
        <tr key={user._id}>
          <td className="user-link">
            <Link to={`/users/${user.username}`}>{user.username}</Link>
          </td>
        </tr>
      );
    });

    return rendered;
  }

  render() {
    return (
      <div>
        {
          this.props.children ?
          this.props.children
            :(<div className="user-page">
            <div className="container">
              <h2 className='list-header'>Users</h2>
              <div className="panel panel-default">
                <table className="table">
                  <tbody>
                    {this.renderUsers()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.user.all
  }
}

export default connect(mapStateToProps, { getAllUsers })(UsersPage);
