
import * as actions from 'actions/manage-users';
import constants from 'constants';

describe('manage-user actions', function() {

  it('should create an action to request all users ', function() {
    const requestUsers = actions.requestUsers();
    expect(requestUsers).to.eql({
        type: constants.ALL_USERS_REQUESTED
    });
  });

  it('should create ALL_USERS_FETCH_SUCCEEDED when fetching users is successful', function() {
    const getUsersSuccess = actions.getUsersSuccess([{ name: 'Ted Smith', email: 'something@email.com', id: 0 }]);
    expect(getUsersSuccess).to.eql({
        type: constants.ALL_USERS_FETCH_SUCCEEDED,
        users: [{ name: 'Ted Smith', email: 'something@email.com', id: 0 }]
    });
  });

  it('should create an action to get all users ', function() {
    const getUsers = actions.getUsers();
    expect(getUsers).to.eql({
        type: constants.ALL_USERS_FETCHED
    });
  });

  it('should create ALL_USERS_FETCH_FAILED if fetching all users fails ', function() {
    const getUsersError = actions.getUsersError();
    expect(getUsersError).to.eql({
        type: constants.ALL_USERS_FETCH_FAILED
    });
  });
  
});
