export const calculateScore = (data) => {
    let numberOfYes = 0;
    const values = Object.values(data);
    values.forEach(value => {
        if(value === '1') {
            numberOfYes++;
        }
    })
    if(numberOfYes === 0) {
        return;
    }
    return (numberOfYes/values.length)*100;
}

export const calculateAverageScore = (scores) => {
    if(scores && scores.length>0) {
        const sum = scores.reduce((a,c) => a+c, 0);
        return (sum/scores.length).toFixed(2);
    }
    return; 
}