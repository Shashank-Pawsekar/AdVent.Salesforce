import { wire, LightningElement } from "lwc";
import getUserList from "@salesforce/apex/wrapperTable.getUsers";
import getAdList from "@salesforce/apex/wrapperTableAd.getAds";
import assignAds from "@salesforce/apex/AssignAd.createAssignAd";

export default class assignAd extends LightningElement {


  selectedUsers = [];
  userList;
  @wire(getUserList)
  wiredRecordUser({ error, data }) {
      if (error) {
        let message = "Unknown error";
        if (Array.isArray(error.body)) {
          message = error.body.map((e) => e.message).join(", ");
        } 
        else if (typeof error.body.message === "string") {
          message = error.body.message;
        }
      }
      else if (data) {
          this.userList = JSON.parse(data);
      }
  }

  handleAllChange(event) {
      for (var i = 0; i < this.userList.length; i++) {
        this.userList[i].isSelected = event.target.checked;
      }
  }

  handleCheckChange(event) {
      this.userList[event.target.value].isSelected = event.target.checked;
  }

  // getSelectedUsers(event) {
  //     for (var i = 0; i < this.userList.length; i++) {
  //       if (this.userList[i].isSelected) {
  //         this.selectedUsers.push(this.userList[i]);
  //       }
  //     }
  // }

  selectedAds = [];
  adList;
  @wire(getAdList)
  wiredRecordAd({ error, data }) {
      if (error) {
        let message = "Unknown error";
        if (Array.isArray(error.body)) {
          message = error.body.map((e) => e.message).join(", ");
        } 
        else if (typeof error.body.message === "string") {
          message = error.body.message;
        }
      }
      else if (data) {
          
          this.adList = JSON.parse(data);
      }
  }

  handleAllChangeAd(event) {
      for (var i = 0; i < this.adList.length; i++) {
        this.adList[i].isAdSelected = event.target.checked;
      }
  }

  handleCheckChangeAd(event) {
      this.adList[event.target.value].isAdSelected = event.target.checked;
  }

  getSelectedUsersAds(event) {
      for (var i = 0; i < this.adList.length; i++) {
        if (this.adList[i].isAdSelected) {
          this.selectedAds.push(this.adList[i]);
        }
      }

      for (var i = 0; i < this.userList.length; i++) {
        if (this.userList[i].isSelected) {
          this.selectedUsers.push(this.userList[i]);
        }
      }

      for (var i=0; i < this.selectedUsers.length; i++){
        createAssignAd({selUser : this.selectedUsers ,selAd : selectedAds})
        
      }
  }

}