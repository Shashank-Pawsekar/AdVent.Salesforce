public class NewFilterAssignAd {
    
    @AuraEnabled
    public static List<Id> newCreateAssignAd (List<User__c> selUser, List<Add__c> selAd){
        // Assuming you have two lists: userList and clientList

            List<Assign_Add__c> newAssignments = new List<Assign_Add__c>();
        
            for (User__c user : selUser) {
                for (Add__c add	 : selAd) {
                    // Create a unique identifier for the pairing
                    String uniqueIdentifier = user.Id + '-' + add.Id;
        
                    // Check if a record with the same pairing already exists
                    if (!assignmentExists(uniqueIdentifier)) {
                        Assign_Add__c assignment = new Assign_Add__c(
                            User__c = user.Id,  
                            Add__c = add.Id,  
                            UniqueIdentifier__c = uniqueIdentifier );
        
                    	newAssignments.add(assignment);
                	} 
                    else {
                    // Handle the error or log it
                    System.debug('Assignment already exists for User: ' + user.Name + ' and Add: ' + add.Name);
                    // You can also add these to a list to handle the error messages more formally
                	}
            	}
        	}
        
        	List<Id> createdRecordIds = new List<Id>();
            // Insert the new assignment records
            if (!newAssignments.isEmpty()) {
                
                
                insert newAssignments;
                
                for (Assign_Add__c record : newAssignments) {
                        createdRecordIds.add(record.Id);
            	}	
    		}
        return createdRecordIds;
	}

    // Method to check if a UserClientAssignment record with the given unique identifier already exists
    public static Boolean assignmentExists(String uniqueIdentifier) {
        List<Assign_Add__c> existingAssignments = [SELECT Id FROM Assign_Add__c WHERE UniqueIdentifier__c = :uniqueIdentifier LIMIT 1];

        return !existingAssignments.isEmpty();
    }
    
}