async function fetchData() {
    const response = await fetch('/api/getUserData');
    const userData = await response.json();
    
    document.getElementById('balance').innerText = userData.balance;
    document.getElementById('income').innerText = userData.incomePerHour;
    
    const flowersDiv = document.getElementById('flowers');
    flowersDiv.innerHTML = '';
    userData.flowers.forEach(flower => {
        const flowerDiv = document.createElement('div');
        flowerDiv.className = 'flower';
        flowerDiv.innerHTML = `${flower.name}: ${flower.count} (Income: ${flower.income})`;
        flowersDiv.appendChild(flowerDiv);
    });
}

async function collect() {
    const response = await fetch('/api/collect', { method: 'POST' });
    const data = await response.json();
    alert(`You collected ${data.collected} petals!`);
    fetchData();
}

document.getElementById('collect-btn').addEventListener('click', collect);
fetchData();
