pragma solidity ^0.5.0;

contract Election {
    
    //Vote[] public votes;
    
    uint256 public cand1Count = 0;
    uint256 public cand2Count = 0;
    uint256 public voteID = 0;




    
    struct Vote {
        uint voteID; 
        bool hasVoted;
        uint candidateID; 
        
    }

    struct Candidate {
        uint candidateID; 
        uint voteCount;
        string name;
         
        
    }

    mapping(uint => Vote) public votes;
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount = 0;

    constructor() public {
        createCandidate("John");
        createCandidate("Mary");
 
    }

    function createCandidate(string memory _name) public{
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, 0,  _name);

    }



    function createVote(uint _candidateID) public{
        if(_candidateID ==  1){
            voteID ++;
            votes[voteID] = Vote(voteID, true , _candidateID);
            cand1Count++;
            //////////////
            //uint cand = candidates[_candidateID];
            candidates[_candidateID].voteCount ++;

        }else if(_candidateID ==  2){
            voteID ++;
            votes[voteID] = Vote(voteID, true , _candidateID);
            cand2Count++;
            candidates[_candidateID].voteCount ++;

        }

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