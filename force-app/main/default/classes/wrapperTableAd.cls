public with sharing class wrapperTableAd {
    public wrapperTableAd() {
    }

    @AuraEnabled(cacheable=true)

    public static String getAds() {
        Integer adrowIndex = 0;
        List<adWrap> adWrapList = new List<adWrap>();
        try {
            List<Add__c> adList = [SELECT Id, Name, Advertisement_Title__c FROM Add__c];
            for(Add__c a : adList) {
                adWrapList.add(new adWrap(a.Id,a.Name,a.Advertisement_Title__c,adrowIndex));
                adrowIndex++;
            }
            return JSON.serialize(adWrapList);
        }
        catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
    }

    public class adWrap{
        public String AdId;
        public String AdvId;
        public String AdTitle;
        public Boolean isAdSelected;
        public Integer indexAd;

        public adWrap(String AdId, String AdvId, String AdTitle, Integer indexAd){
            this.AdId = AdId;
            this.AdvId = AdvId;
            this.AdTitle = AdTitle;
            this.isAdSelected = false;
            this.indexAd = indexAd;
		}
    }

}