public with sharing class AssignAd {
    
    @AuraEnabled
    public static List<Id> createAssignAd(List<User__c> selUser, List<Add__c> selAd){
       List<Assign_Add__c> asad = new List<Assign_Add__c>();

        Integer i = 0;
        Integer j = 0;
        Integer selAdSize = selAd.size();
        Integer selUserSize = seluser.size();
    

        for (i=0;i < selUserSize; i++){
            for (j=0; j < selAdSize ; j++) 
                {
                    Assign_Add__c Obj =  new Assign_Add__c();
                    Obj.User__c = selUser[i].Id;
                    Obj.Add__c = selAd[j].Id;
                    asad.add(obj);
                }
        }
        System.System.debug('asad:'+asad);

        List<Id> createdRecordIds = new List<Id>();
        
        try {
                // Insert the new record
                insert asad;

                // If successful, get the Id of the created record
                for (Assign_Add__c record : asad) {
                    createdRecordIds.add(record.Id);
                }
            }catch (DmlException e) {
                // Handle any exceptions or errors
                // You can log the error, display an error message, or take appropriate action.
                System.debug('Error creating records: ' + e.getMessage());
            }
    
            // Log the created record IDs
            System.debug('Created record Ids: ' + createdRecordIds);
    
            // Return the list of created record IDs to the Lightning Web Component
            return createdRecordIds;

        
  
    }
    
}