async function getData() {
    const response = await fetch('./data/data.json');
    let data = await response.json();
    return data;
    // console.log(data);
}

export { getData };