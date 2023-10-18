import { LightningElement, track } from 'lwc';
import getUserList from '@salesforce/apex/NewAssignAd.getUserList';
import getAdList from '@salesforce/apex/NewAssignAd.getAdList';
import createAssignAd from '@salesforce/apex/AssignAd.createAssignAd';
// import AssignAdvObj from '@salesforce/schema/Assign_Add__c';
// import UserLookupField from '@salesforce/schema/Assign_Add__c.User__c';
// import AdLookupField from '@salesforce/schema/Assign_Add__c.Add__c';
// import { createRecord } from 'lightning/uiRecordApi';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';

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

        createAssignAd({selUser : this.selectedRowsUser,selAd : this.selectedRowsAd})
        .then(result => { 
            this.createdRecId = result;
            console.log('createdRecId:'+JSON.stringify(this.createdRecId))
        })
        .catch(error => { console.log("error occured");});


        // for(var i=0 ; i< this.selectedRowsUser.length ; i++){
        // console.log('selectedRowsUser.length:'+JSON.stringify(this.selectedRowsUser.length))
        // console.log('selectedRowsUserLoopField:'+JSON.stringify(this.selectedRowsUser[i].Name))
        //     // userName = this.selectedRowsUser[i].Name;
        //     for(var j=0 ; j< this.selectedRowsAd.length; j++){
        //         console.log('selectedRowsAd.length:'+JSON.stringify(this.selectedRowsAd.length))
        //         console.log('selectedRowsAdLoopField:'+JSON.stringify(this.selectedRowsAd[j].Name))
        //         // adName = this.selectedRowsAd[j].Name;

        //         assignAdfields ={};

        //         assignAdfields.User__c = this.selectedRowsUser[i].Name;
        //         console.log('assignAdfields:'+JSON.stringify(this.assignAdfields.User__c))

        //         assignAdfields.Add__c = this.selectedRowsAd[j].Name;
        //         console.log('assignAdfields:'+JSON.stringify(this.assignAdfields.Add__c))

        //         const recordInput = { apiName: this.Assign_Add_c, assignAdfields };

        //         createRecord(recordInput)
        //             .then(record => {
        //                 // Handle the successful record creation
        //                 this.dispatchEvent(
        //                     new ShowToastEvent({
        //                         title: 'Success',
        //                         message: 'Record created successfully',
        //                         variant: 'success'
        //                     })
        //                 );
        //             })
        //             .catch(error => {
        //                 // Handle errors
        //                 this.dispatchEvent(
        //                     new ShowToastEvent({
        //                         title: 'Error creating record',
        //                         message: error.body.message,
        //                         variant: 'error'
        //                     })
        //                 );
        //             });

        //     }
        // }

    }

    // fieldNameToExtractUser = 'Name';

    // fieldNameToExtractAd = 'Name';

    // get fieldListUser() {
    //     return this.selectedRowsUser.map(record => record[this.fieldNameToExtractUser]);
    // }

    // get fieldListAd() {
    //     return this.selectedRowsAd.map(record => record[this.fieldNameToExtractAd]);
    // }

}