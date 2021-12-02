App = {
    loading: false,
    contracts: {},

    load: async () => {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.render()
    },

    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
        } else {
            window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                // Request account access if needed
                await ethereum.enable()
                // Acccounts now exposed
                web3.eth.sendTransaction({/* ... */ })
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */ })
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },

    loadAccount: async () => {
        App.account = web3.eth.accounts[0]
        console.log(App.account)
    },

    loadContract: async () => {

        const election = await $.getJSON('Election.json')

        App.contracts.Election = TruffleContract(election)
        App.contracts.Election.setProvider(App.web3Provider)

        App.election = await App.contracts.Election.deployed()
    },

    render: async () => {

        // Prevent double render
        if (App.loading) {
            return
        }

        App.setLoading(true)

        $('#account').html(App.account)

        await App.renderTasks()

        App.setLoading(false)

    },

    setLoading: (boolean) => {
        App.loading = boolean
        const loader = $('#loader')
        const content = $('#content')
        if (boolean) {
            loader.show()
            content.hide()
        } else {
            loader.hide()
            content.show()
        }
    },

    renderTasks: async () => {
        const voteCount = await App.election.voteCount()
        const $taskTemplate = $('.taskTemplate')

        for (var i = 1; i <= voteCount; i++) {

            const task = await App.election.votes(i)
            const voteID = task[0].toNumber()
            const hasVoted = task[1]
            const candidate = task[2]

            const $newTaskTemplate = $taskTemplate.clone()
            $newTaskTemplate.find('.content').html(candidate)
            $newTaskTemplate.find('.voteID').html("VoteID: " + voteID)
            $newTaskTemplate.find('input')
                .prop('name', voteID)
                //.prop('checked', taskCompleted)
            // .on('click', App.toggleCompleted)

            if (hasVoted) {
                $('#taskList').append($newTaskTemplate)
            } 

            $newTaskTemplate.show()

        }

    }





}







$(() => {
    $(window).load(() => {
        App.load()
    })
})

