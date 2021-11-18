pragma solidity >=0.7.0 <0.9.0;

contract Voting {
    
    Vote[] public votes;

    struct Vote {
        uint userID;
        uint voteID; 
        bool hasVoted;
        uint candidate; 
        
    }
    
    function addVote (uint userID, uint voteID, bool hasVoted, uint candidate) public{
        votes.push(Vote(userID, voteID, hasVoted, candidate));
    }
    
    
    function removeVote (uint voteID) public{
        //Loop through votes by voteID
        for (uint i=0; i<votes.length; i++) {
            //If match found remove current element
            if (voteID == votes[i].voteID) {
                delete votes[i];
   
        }}
    }
    
}
