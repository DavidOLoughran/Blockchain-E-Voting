pragma solidity ^0.8.2;

contract Election {
    //Vote[] public votes;

    uint256 public cand1Count = 0;
    uint256 public cand2Count = 0;
    uint256 public voteID = 0;

    struct Vote {
        uint256 voteID;
        bool hasVoted;
        uint256 candidateID;
    }

    struct Candidate {
        uint256 candidateID;
        uint256 voteCount;
        string name;
        string info;
    }

    struct Elections {
        uint256 elecID;
        Candidate[] candidates;
        Vote[] voters;
    }

    mapping(uint256 => Vote) public votes;
    mapping(uint256 => Candidate) public candidates;
    //mapping(uint256 => Elections) public elections;

    //mapping(Elections=>mapping(uint=>Candidate public elections)) elect;

    Elections[] public elections;

    uint256 public candidatesCount = 0;
    uint256 public electionCount = 0;

    constructor() public {}

    //Return arrays of candidate details

    function getCandidates(uint256 _elecID)
        public
        view
        returns (
            string[] memory,
            uint256[] memory,
            string[] memory
        )
    {
        string[] memory names = new string[](
            elections[_elecID].candidates.length
        );
        uint256[] memory voteCounts = new uint256[](
            elections[_elecID].candidates.length
        );
        string[] memory info = new string[](
            elections[_elecID].candidates.length
        );

        for (uint256 i = 0; i < elections[_elecID].candidates.length; i++) {
            names[i] = elections[_elecID].candidates[i].name;
            voteCounts[i] = elections[_elecID].candidates[i].voteCount;
            info[i] = elections[_elecID].candidates[i].info;
        }
        return (names, voteCounts, info);
    }

    function createElection(string[] memory _name, string[] memory _info)
        public
    {
        elections.push();

        Elections storage e = elections[electionCount];
        e.elecID = electionCount;

        for (uint256 i = 0; i < _name.length; i++) {
            e.candidates.push(Candidate(1, 0, _name[i], _info[i]));
        }

        electionCount++;
    }

    function createVote(uint256 _elecID, uint256 _candID) public {
        elections[_elecID].candidates[_candID].voteCount++;

        elections[_elecID].voters.push(Vote(1, true, _candID));
    }

    function hasVoted(uint256 _elecID, uint256 _voteID)
        public
        view
        returns (bool)
    {
        bool valid = false;

        for (uint256 i = 0; i < elections[_elecID].voters.length; i++) {
            //elections[_elecID].voters[i]

            if (elections[_elecID].voters[i].voteID == _voteID) {
                valid = true;
            }
        }

        return valid;
    }

    //function
}
