
function main() {
    try {
        sub1();
        sub2();
        sub3();

    } catch (e) {
        console.log("main catch")
    } finally {
        console.log("main finally")
    }
}

function sub1() {
    sub1_1();
    sub1_2();
    sub1_3();
}

function sub2() {
    console.log("sub2");
}

function sub3() {
    console.log("sub3");
}


function sub1_1() {
    console.log("sub1_1");
}

function sub1_2() {
    try {
        console.log("sub1_2a");
        if (process.argv[2] === "RETURN") {
            return;
        }
        if (process.argv[2] === "THROW") {
            throw new Error("例外発生!");
        }
        console.log("sub1_2b");
        
    } finally {
        console.log("sub1_2 finally")
    }
}

function sub1_3() {
    console.log("sub1_3");
}

main();
