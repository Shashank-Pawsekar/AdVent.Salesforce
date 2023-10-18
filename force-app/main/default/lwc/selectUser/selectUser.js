import { LightningElement, wire } from 'lwc';
import getUserList from "@salesforce/apex/wrapperTable.getUsers";

export default class SelectUser extends LightningElement {

    selectedUsers = [];
    userList;
    @wire(getUserList)
    wiredRecord({ error, data }) {
        if (error) {
          // TODO: handle error
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