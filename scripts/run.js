const main = async () => {
    const jokeContractFactory = await hre.ethers.getContractFactory('JokePortal');
    const jokeContract = await jokeContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1')
    });
    await jokeContract.deployed();
    
    console.log("Contract deployed to: ", jokeContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(jokeContract.address);
    console.log('Contract balance: ', hre.ethers.utils.formatEther(contractBalance));

    let jokeCount;
    jokeCount = await jokeContract.getTotalJokes();

    let jokeTxn = await jokeContract.tellJoke("Hey Batty!");
    await jokeTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(jokeContract.address);
    console.log('Contract balance: ', hre.ethers.utils.formatEther(contractBalance));

    const [_, randomPerson] = await hre.ethers.getSigners();
    jokeTxn = await jokeContract.connect(randomPerson).tellJoke("Back again Mr. Wayne");
    await jokeTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(jokeContract.address);
    console.log('Contract balance: ', hre.ethers.utils.formatEther(contractBalance));


    let allJokes = await jokeContract.getAllJokes();
    console.log(allJokes);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();