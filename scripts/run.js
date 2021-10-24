const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const jokeContractFactory = await hre.ethers.getContractFactory('JokePortal');
    const jokeContract = await jokeContractFactory.deploy();
    await jokeContract.deployed();
    
    console.log("Contract deployed to: ", jokeContract.address);
    console.log("Contract deployed by: ", owner.address);

    let jokeCount;
    jokeCount = await jokeContract.getTotalJokes();

    let jokeTxn = await jokeContract.tellJoke();
    await jokeTxn.wait();

    waveCount = await jokeContract.getTotalJokes();

    jokeTxn = await jokeContract.connect(randomPerson).tellJoke();
    await jokeTxn.wait();

    waveCount = await jokeContract.getTotalJokes();
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