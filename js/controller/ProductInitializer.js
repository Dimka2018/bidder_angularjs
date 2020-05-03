(function () {
    let products = [
        {id: 1,
            title: "motorolla razr i",
            start: {
                day: 12,
                month: 1,
                year: 2017,
                hour: 21,
                min: 3,
                sec: 33
            },
            end: {
                day: 15,
                month: 1,
                year: 2017,
                hour: 21,
                min: 3,
                sec: 33
            },
            bid: 10,
            price: 100,
            description: "bla bla"},
        {id: 2,
            title: "iPhone 7",
            start: {
                day: 17,
                month: 6,
                year: 2017,
                hour: 21,
                min: 5,
                sec: 33
            },
            end: {
                day: 17,
                month: 6,
                year: 2019,
                hour: 21,
                min: 3,
                sec: 33
            },
            bid: 150,
            price: 1000,
            description: "iphone 7"},
        {id: 3,
            title: "iPhone 8",
            start: {
                day: 17,
                month: 7,
                year: 2017,
                hour: 21,
                min: 5,
                sec: 33
            },
            end: {
                day: 17,
                month: 8,
                year: 2019,
                hour: 21,
                min: 3,
                sec: 33
            },
            bid: 150,
            price: 1000,
            description: "iphone 8"},
        {id: 4,
            title: "iPhone X",
            start: {
                day: 17,
                month: 6,
                year: 2017,
                hour: 21,
                min: 5,
                sec: 33
            },
            end: {
                day: 17,
                month: 6,
                year: 2029,
                hour: 21,
                min: 3,
                sec: 33
            },
            bid: 150,
            price: 1000,
            description: "iphone X"}
    ];

    let request = window.indexedDB.open("BidDB", 1);
    request.onupgradeneeded = (event) => {
        console.log("upgrade");
        let db = event.target.result;
        db.createObjectStore("users", {keyPath: "login"});
        let productStore = db.createObjectStore("products", {keyPath: "id"});
        products.forEach((item) => productStore.add(item));
    };
}());