import _ from 'lodash';

export const loadState = (key) => {
    try {
        let serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (key, state) => {
    try {
        localStorage.removeItem(key);
        let serializedState = JSON.stringify(state);
        localStorage.setItem(key, serializedState);
    } catch (err) {

    }
};

export const logout = () => {
    try {
        localStorage.removeItem('currentUser');
        return true;
    } catch (err) {
        return false;
    }
};

export const isAuthenticated = () => {
    try {
        let serializedState = localStorage.getItem('currentUser');

        return serializedState !== null;
    } catch (err) {
        return false;
    }
};

export const checkProfile = (profile) => {
    try {
        let serializedState = localStorage.getItem('currentUser');
        let currentUser = JSON.parse(serializedState);
        let indexProfile = _.findIndex(currentUser.profiles, (value) => {
            return value.code === profile;
        });
        return indexProfile !== -1;
    } catch (err) {
        return false;
    }
};

export const checkRole = (role) => {
    try {
        let serializedState = localStorage.getItem('currentUser');
        let currentUser = JSON.parse(serializedState);
        let indexRole = _.findIndex(currentUser.roles, (value) => {
            return value === role;
        });
        return indexRole !== -1;
    } catch (err) {
        return false;
    }
};
