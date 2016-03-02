import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllPolls } from '../actions/index';
import PollsList from '../components/polls/PollsList';

class PollsPage extends Component {
  componentWillMount() {
    this.props.fetchAllPolls();
  }

  render() {
    return (
      <div>
        {
          this.props.children ?
          this.props.children
          : (
            <div className="polls-page">
            <div className="container">
              <h2 className='list-header'>Recent Polls</h2>
              <PollsList
                user={this.props.user}
                polls={this.props.polls}
              />
            </div>
          </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.current,
    polls: state.polls.all
  }
}

export default connect(mapStateToProps, { fetchAllPolls })(PollsPage);
