public with sharing class redeemptionApex {
    
    @AuraEnabled(cacheable=true)
    public static User__c getUserInfo(String username, String password) {
        // Implement logic to retrieve user information based on the username and password.
        // You should validate the credentials and query the custom object.

        // Example query:
        User__c user = [SELECT Id, First_Name__c, Redemption_Points__c ,User_s_Last_Name__c,User_Points_Last_Reimburse_Date__c,User_Liginname__c
                        FROM User__c WHERE User_Liginname__c = :username AND User_Password__c = :password LIMIT 1];

        return user;
    }

    @AuraEnabled
    public static User__c redeemUserPoints(Id userId, Integer pointsToRedeem) {
        // Implement logic to redeem points for the user.
        // Update the Redeemable_Points__c field and perform any necessary validation.

        User__c user = [SELECT Id, First_Name__c,  Redemption_Points__c,User_Liginname__c 
                        FROM User__c WHERE Id = :userId LIMIT 1];
        user.Redemption_Points__c = user.Redemption_Points__c - pointsToRedeem;

        update user;

        return user;
    }
}