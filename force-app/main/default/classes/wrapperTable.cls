public with sharing class wrapperTable {
    public wrapperTable() {

    }

    @AuraEnabled(cacheable=true)

    public static String getUsers() {
        Integer rowIndex = 0;
        List<userWrap> usWrapList = new List<userWrap>();
        try {
            List<User__c> userList = [SELECT Id, Name, First_Name__c FROM User__c];
            for(User__c a : userList) {
                usWrapList.add(new userWrap(a.Id,a.Name,a.First_Name__c,rowIndex));
                rowIndex++;
            }
            return JSON.serialize(usWrapList);
        }
        catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
    }

    
    public class userWrap{
        public String Id;
        public String UserId;
        public String FirstName;
        public Boolean isSelected;
        public Integer index;

        public userWrap(String Id, String UserId, String FirstName, Integer index){
            this.Id = Id;
            this.UserId = UserId;
            this.FirstName = FirstName;
            this.isSelected = false;
            this.index = index;
		}
    }

}
