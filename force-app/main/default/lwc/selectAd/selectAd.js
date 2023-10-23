import { LightningElement,wire } from 'lwc';
import getAdList from "@salesforce/apex/wrapperTableAd.getAds";

export default class SelectAd extends LightningElement {

    selectedAds = [];
  adList;
  @wire(getAdList)
  wiredRecord({ error, data }) {
      if (error) {
        // TODO: handle error
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

  getSelectedAds(event) {
      for (var i = 0; i < this.adList.length; i++) {
        if (this.adList[i].isAdSelected) {
          this.selectedAds.push(this.adList[i]);
        }
      }
  }
}