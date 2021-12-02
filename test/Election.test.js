const Election = artifacts.require('./Election.sol')

contract('Election', (accounts) => {
  before(async () => {
    this.election = await Election.deployed()
  })

  it('deploys successfully', async () => {
    const address = await this.election.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('lists votes', async () => {
    const voteID = await this.election.voteID()
    const vote = await this.election.votes(voteID)
    assert.equal(vote.voteID.toNumber(), voteID.toNumber())
    assert.equal(vote.candidateID, 1)
    assert.equal(vote.hasVoted, true)
    assert.equal(voteID.toNumber(), 1)
  })

  it('creates votes', async () => {
    const result = await this.election.createVote(1)
    const voteID = await this.election.voteID()
    assert.equal(voteID, 2)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 2)
    assert.equal(event.candidateID, 2)
    assert.equal(event.hasVoted, true)
  })

  

})