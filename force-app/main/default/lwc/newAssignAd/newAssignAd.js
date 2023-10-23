import { LightningElement, track } from 'lwc';
import getUserList from '@salesforce/apex/NewAssignAd.getUserList';
import getAdList from '@salesforce/apex/NewAssignAd.getAdList';
import NewFilterAssignAd from '@salesforce/apex/NewFilterAssignAd.newCreateAssignAd';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// defining columns for tables
const columnUser = [
    { label : 'User Id', fieldName : 'Name'},
    { label : 'User Name', fieldName : 'First_Name__c'}
]

const columnAd = [
    { label : 'Advertisement Id', fieldName : 'Name'},
    { label : 'Advertisement Title', fieldName : 'Advertisement_Title__c'}
]

export default class NewAssignAd extends LightningElement {

    @track columnUser = columnUser;
    @track columnAd = columnAd;

    @track userData = [];
    @track adData = [];


    //getting data list of users and ads from apex
    connectedCallback(){
        getUserList()
        .then(userResult =>{this.userData = userResult;
            console.log('this.userData:'+JSON.stringify(this.userData))
        })
        .catch(error => {console.log("error occurred");})
        

        getAdList()
        .then(adResult =>{this.adData = adResult;
            console.log('this.adData:'+JSON.stringify(this.adData))
        })
        .catch(error => {console.log("error occurred");})
        

    }

    //making list of selected Users and Ads
    @track selectedRowsUser = [];
    @track selectedRowsAd = [];

    handleRowSelectionUser(event) {
        this.selectedRowsUser = event.detail.selectedRows;
        console.log('selectedRowsUser:'+JSON.stringify(this.selectedRowsUser))
    }

    handleRowSelectionAd(event) {
        this.selectedRowsAd = event.detail.selectedRows;
        console.log('selectedRowsAd:'+JSON.stringify(this.selectedRowsAd))
    }

    @track createdRecId = [];

    handleCreateAssignAd(){

        NewFilterAssignAd({selUser : this.selectedRowsUser,selAd : this.selectedRowsAd})
        .then(result => { 
            this.createdRecId = result;
            console.log('createdRecId:'+JSON.stringify(this.createdRecId))
           
        })
        .catch(error => { console.log("error occured");}); 

       

    }
}