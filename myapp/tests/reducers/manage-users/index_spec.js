
import manageUsersReducer from 'reducers/manage-users';
import constants from 'constants';

const initialState = {
    users: [],
    isLoading: false,
    error: false
  };

describe('manage-users reducer', ()=> {

  it('should handle ALL_USERS_REQUESTED', ()=>{
    const newState = manageUsersReducer(initialState, { type: constants.ALL_USERS_REQUESTED });
    expect(newState).to.eql({ 
        isLoading: true,
        error: false,
    });
  });

  it('should handle ALL_USERS_FETCH_SUCCEEDED', ()=>{
    const newState = manageUsersReducer(initialState, { type: constants.ALL_USERS_FETCH_SUCCEEDED, users: [{ name: 'Ted Hughes' }] });
    expect(newState).to.eql({ 
      isLoading: false,
      error: false,
      users: [{ name: 'Ted Hughes' }]
    });
  });

  it('should handle ALL_USERS_FETCH_FAILED', ()=>{
    const newState = manageUsersReducer(initialState, { type: constants.ALL_USERS_FETCH_FAILED });
    expect(newState).to.eql({ 
        isLoading: false,
        error: true,
    });
  });

});
