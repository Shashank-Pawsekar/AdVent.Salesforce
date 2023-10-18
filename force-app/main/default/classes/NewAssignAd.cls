public with sharing class NewAssignAd {
    
    @AuraEnabled
    public static List<User__c> getUserList(){
       
        List<User__c> userList = [SELECT Id,Name,First_Name__c from User__c ORDER BY Name ASC];
        return userList;
    }

    @AuraEnabled
    public static List<Add__c> getAdList(){
        
        List<Add__c> adList = [SELECT Id,Name,Advertisement_Title__c from Add__c ORDER BY Name ASC];
        return adList;
    }
}