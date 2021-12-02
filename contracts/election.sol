pragma solidity ^0.5.0;

contract Election {
    
    //Vote[] public votes;
    
    uint256 public cand1Count = 0;
    uint256 public cand2Count = 0;
    uint256 public voteID = 0;




    
    struct Vote {
        uint voteID; 
        bool hasVoted;
        string candidate; 
        
    }

    struct Candidate {
        uint candidateID; 
        uint voteCount;
        string name;
         
        
    }

    mapping(uint => Vote) public votes;
    mapping(uint => Candidate) public candidates;

    constructor() public {
        createVote("Candidate 1");
        createVote("Candidate 1");
        createVote("Candidate 1");
        createVote("Candidate 2");
    }

    function createVote(string memory _candidateID) public{
        if(_candidateID ==  ){

        }

        voteID ++;
        votes[voteID] = Vote(voteID, true , _candidateID);
    }
    
    // function addVote (uint userID, uint voteID, bool hasVoted, uint candidate) public{
    //     votes.push(Vote(userID, voteID, hasVoted, candidate));
    // }
    
    // function removeVote (uint voteID) public{
        
    //     for (uint i=0; i<votes.length; i++) {
    //         if (voteID == votes[i].voteID) {
    //             delete votes[i];
   
    //     }}
    // }
    
}