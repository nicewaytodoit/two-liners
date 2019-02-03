import React, { Component } from 'react';
import UserControl from './User/User';
import TwoLinerControl from './TwoLiner/TwoLiners';
import styles from './Layout.module.css';

const storedUser = { UserName: null, Date: null, LocalAddress: null };
const storeUserConfig = (user) => localStorage.setItem('UserConfig', JSON.stringify(user));
const retrieveUserConfig = () => JSON.parse(localStorage.getItem('UserConfig'));
const getLocalAddress = () => 'future';

class Layout extends Component {
    constructor(props) {
        super(props);
        const userConfig = retrieveUserConfig();
        this.state = {
            User: {
                hasUserName: !!(userConfig && !!userConfig.UserName),
                userName: (userConfig && userConfig.UserName),
            },
            TwoLiner: {
                yesterday: '',
                tomorrow: '',
                actions: '',
                actionType: 'comment',
            }
        }
    }


    SaveUser = (username) => {
        if (!!username && username.length > 3) {
            storedUser.UserName = username;
            storedUser.Date = new Date();
            storedUser.LocalAddress = getLocalAddress();
            storeUserConfig(storedUser);
            this.setState((prevState) => {
                return { ...prevState, User: { ...prevState.User, hasUserName: true } };
            });
        }
    }

    ChangeUser = (e) => {
        const userName = e.target.value;
        this.setState((prevState) => {
            const currentState = { ...prevState, User: { ...prevState.User } };
            currentState.User.userName = userName;
            return currentState;
        });
    }


    SaveTwoLiner = () => {

    }

    ValueChange = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        // console.log(val, name, e.target);
        this.setState((prevState) => ({
            ...prevState,
            TwoLiner: {
                ...prevState.TwoLiner, 
                [name]: val,
        }}));
    }

    render() {
        const { User, TwoLiner } = this.state;
        return (
            <div className={styles.Layout}>
                {User.hasUserName ?
                    <TwoLinerControl
                        onSaveClick={this.SaveTwoLiner}
                        onValueChange={this.ValueChange}
                        {...TwoLiner}
                        userName={User.userName}
                    /> :
                    <UserControl
                        onSaveClick={() => this.SaveUser(User.userName)}
                        userName={User.userName}
                        onUserChange={this.ChangeUser}
                    />
                }
            </div>
        );
    }
}

export default Layout;
