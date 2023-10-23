import { LightningElement, track } from 'lwc';
import getUserInfo from '@salesforce/apex/redeemptionApex.getUserInfo';
import redeemUserPoints from '@salesforce/apex/redeemptionApex.getUserInfo';

export default class redemptionLWC extends LightningElement {
    @track username = '';
    @track password = '';
    @track redeemPoints = 0;
    @track user;

    handleUsernameChange(event) {
        this.username = event.target.value;
        console.log('username:'+JSON.stringify(this.username))
    }

    handlePasswordChange(event) {
        this.password = event.target.value;
        console.log('password:'+JSON.stringify(this.password))
    }

    handleLogin() {
        // Call an Apex method to retrieve user information based on username and password
        getUserInfo({ username: this.username, password: this.password })
            .then(result => {
                this.user = result;
                console.log('UserData:'+JSON.stringify(this.user))
            })
            .catch(error => {
                console.error(error);
                console.log('Error on UserData:')
            });
    }

    handleRedeemPointsChange(event) {
        this.redeemPoints = event.target.value;
        console.log('RedeemPoints:'+JSON.stringify(this.redeemPoints))
    }


    handleRedeemPoints() {
        // Call an Apex method to redeem points for the user
        console.log('User BeforeRedeemPointsUserInfo:'+JSON.stringify(this.usUd))
        redeemUserPoints({ userId: this.user.Id, pointsToRedeem: this.redeemPoints })
            .then(result => {
                this.user = result; // Update user data after redeeming points
                console.log('AfterRedeemPointsUserInfo:'+JSON.stringify(this.user))
            })
            .catch(error => {
                console.error(error);
            });
    }
}
