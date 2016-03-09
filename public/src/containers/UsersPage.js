import React,{ Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getAllUsers } from '../actions/index';

class UsersPage extends Component {
  componentWillMount() {
    this.props.getAllUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.username !== this.props.params.username) {
      console.log('different');
    }
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
    if (this.props.children) {
      return (
        this.props.children
      );
    }
    if (this.props.isLoading) {
      return (
        <div className="loader"></div>
      );
    }
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
    users: state.user.all,
    isLoading: state.loader.isLoading
  }
}

export default connect(mapStateToProps, { getAllUsers })(UsersPage);
