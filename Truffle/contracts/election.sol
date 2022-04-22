pragma solidity ^0.8.2;

import "@opengsn/contracts/src/BaseRelayRecipient.sol";

contract Election is BaseRelayRecipient{
    //Vote[] public votes;
    address public owner;

    uint256 public cand1Count = 0;
    uint256 public cand2Count = 0;
    uint256 public voteID = 0;

    struct Vote {
        string voteID;
        bool hasVoted;
        uint256 candidateID;
    }

    struct Candidate {
        uint256 candidateID;
        uint256 voteCount;
        string name;
        string info;
        string image;
        
    }

    struct Elections {
        string elecName;
        uint256 startTime;
        uint256 endTime;
        uint256 elecID;
        Candidate[] candidates;
        Vote[] voters;
    }

    mapping(uint256 => Vote) public votes;
    mapping(uint256 => Candidate) public candidates;
    //mapping(uint256 => Elections) public elections;

    modifier onlyOwner() {
        require(owner == msg.sender, "");
        _;
    }

    //mapping(Elections=>mapping(uint=>Candidate public elections)) elect;

    Elections[] public elections;

    uint256 public candidatesCount = 0;
    uint256 public electionCount = 0;

    //constructor() public {}

    /**
     * Set the trustedForwarder address either in constructor or
     * in other init function in your contract
     */
    constructor(address _trustedForwarder) {
        _setTrustedForwarder(_trustedForwarder);
        //data = "Hello Metatransaction";
        owner = msg.sender;
    }

    /**
     * OPTIONAL
     * You should add one setTrustedForwarder(address _trustedForwarder)
     * method with onlyOwner modifier so you can change the trusted
     * forwarder address to switch to some other meta transaction protocol
     * if any better protocol comes tomorrow or current one is upgraded.
     */
    function setTrustForwarder(address _trustedForwarder) public onlyOwner {
        _setTrustedForwarder(_trustedForwarder);
    }

    /**
     * Override this function.
     * This version is to keep track of BaseRelayRecipient you are using
     * in your contract.
     */
    function versionRecipient() external pure override returns (string memory) {
        return "1";
    }

    //Return arrays of candidate details

    function compareStrings(string memory a, string memory b) public view returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function isElectionLive(uint256 _elecID) public view returns (bool) {

        bool isLive = false;

        uint256 lastUpdated = block.timestamp;

        if (lastUpdated >= elections[_elecID].startTime && lastUpdated <= elections[_elecID].endTime) {
            isLive = true;
        } 

        return (isLive);
    }

    //Return arrays of candidate details

    function getCandidates(uint256 _elecID) public view returns (string[] memory, uint256[] memory, string[] memory, string[] memory, string memory, uint256) {

        string[] memory names = new string[](elections[_elecID].candidates.length);
        uint256[] memory voteCounts = new uint256[](elections[_elecID].candidates.length);
        string[] memory info = new string[](elections[_elecID].candidates.length);
        string[] memory image = new string[](elections[_elecID].candidates.length);
        string memory elecName = elections[_elecID].elecName;
        //uint256 startTime = elections[_elecID].startTime;
        uint256 endTime = elections[_elecID].endTime;
        

        for(uint i = 0; i < elections[_elecID].candidates.length; i++){
            names[i] = elections[_elecID].candidates[i].name;
            voteCounts[i] = elections[_elecID].candidates[i].voteCount;
            info[i] = elections[_elecID].candidates[i].info;
            image[i] = elections[_elecID].candidates[i].image;
            
        }
        return (names, voteCounts, info, image, elecName, endTime);
    }

    function getElection(uint256 _elecID, string memory _voteID) public view returns (uint256[] memory, string[] memory, string[] memory, uint256[] memory) {

        uint256 numElections = getElectionCount(_voteID);

        uint256[] memory elecIDs = new uint256[](numElections);
        string[] memory elecNames = new string[](numElections);

        string[] memory TopElecNames = new string[](elections.length);
        uint256[] memory VotersCount = new uint256[](elections.length);

        uint256 count = 0;

        for(uint i = 0; i < elections.length; i++){

            TopElecNames[i] = elections[i].elecName;
            VotersCount[i] = elections[i].voters.length;
            
            for(uint256 j=0; j < elections[i].voters.length; j++) {
            //elections[_elecID].voters[i]
            
            

                if(compareStrings(elections[i].voters[j].voteID, _voteID)){
                    elecIDs[count] = i;
                    elecNames[count] = elections[i].elecName;
                    count++;
                } 
        }
        }
            
        
        
        return (elecIDs, elecNames, TopElecNames, VotersCount);
    }



    function getElectionCount(string memory _voteID) public view returns (uint256) {

        //uint256[] memory elecIDs = new uint256[](elections.length);
        //string[] memory elecNames = new string[](elections.length);

        uint256 count = 0;

        for(uint i = 0; i < elections.length; i++){
            
            for(uint256 j=0; j < elections[i].voters.length; j++) {
            //elections[_elecID].voters[i]

                if(compareStrings(elections[i].voters[j].voteID, _voteID)){

                    count++;
                } 
        }
        }
            
        
        
        return (count);
    }

    

    //Function is responsible for initialising and populating a newly created election
    //Storage keyword used as our newly created instance is assingned to storage outside the bounds of our funtion
    // Populates the elections candidates and voters by looping of the given parameters
    function createElection(string memory _elecName, uint256 _startDate, uint256 _endDate, string[] memory _name, string[] memory _info, string[] memory _image, string[] memory _voters) public {
        elections.push();
        
        Elections storage e = elections[electionCount];
        e.elecID = electionCount;
        e.elecName = _elecName;
        e.startTime = _startDate;
        e.endTime = _endDate;

        for(uint256 i=0; i < _name.length; i++) {
            e.candidates.push(Candidate(1, 0, _name[i], _info[i], _image[i]));
        }

        for(uint256 i=0; i < _voters.length; i++) {
            e.voters.push(Vote(_voters[i], false, 0));
        }

        electionCount++;
    }

    function createVote(uint256 _elecID, uint256 _candID, string memory _voterID) public {

        require(hasVoted(_elecID, _voterID) == false && isElectionLive(_elecID), "Already Voted or Election is not live");
        
        elections[_elecID].candidates[_candID].voteCount++; 

        for(uint256 i=0; i < elections[_elecID].voters.length; i++) {
            //elections[_elecID].voters[i]

                if(compareStrings(elections[_elecID].voters[i].voteID, _voterID)){

                    elections[_elecID].voters[i].hasVoted = true;
                    elections[_elecID].voters[i].candidateID = _candID;
                } 
        }    
    }

    // Checks if the specified voter has already voted in the specified election

    function hasVoted(uint256 _elecID, string memory _voteID) public view returns (bool) {

        bool valid = false;
        
        for(uint256 i=0; i < elections[_elecID].voters.length; i++) {
            //elections[_elecID].voters[i]

            if(compareStrings(elections[_elecID].voters[i].voteID, _voteID) && elections[_elecID].voters[i].hasVoted){
                valid = true;
            } 
        }

        return valid;
    }

    //function 
}

