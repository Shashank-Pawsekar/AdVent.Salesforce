import { wire, LightningElement } from "lwc";
import getUserList from "@salesforce/apex/wrapperTable.getUsers";

export default class Demouserlist extends LightningElement {

    selectedUsers = [];
    userList;
    @wire(getUserList)
    wiredRecord({ error, data }) {
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

    getSelectedUsers(event) {
        for (var i = 0; i < this.userList.length; i++) {
          if (this.userList[i].isSelected) {
            this.selectedUsers.push(this.userList[i]);
          }
        }
    }
}