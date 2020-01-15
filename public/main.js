const form = document.getElementById('vote-form');

// Form submit event
form.addEventListener('submit', (e) => {
    const choice = document.querySelector('input[name=os]:checked').value;

    const data = {
        os: choice
    };

    fetch('http://localhost:3000/poll', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));

    e.preventDefault();
});

fetch('http://localhost:3000/poll')
.then(res => res.json())
.then(data => {
    const votes = data.votes;       
    const totalVotes = votes.length;
    const voteCounts = votes.reduce(
        (acc, vote) => (
            (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), 
            acc
        ), 
        {}
    );

    let dataPoints = [
        {
            label: 'Windows', y: voteCounts.Windows
        },
        {
            label: 'MacOS', y: voteCounts.MacOS
        },
        {
            label: 'Linux', y: voteCounts.Linux
        },
        {
            label: 'Ubuntu', y: voteCounts.Ubuntu
        },
        {
            label: 'Other', y: voteCounts.Other
        }
    ];
    
    const chartContainer = document.querySelector('#chartContainer');
    
    if (chartContainer) {
        const chart = new CanvasJS.Chart('chartContainer', {
            animationEnabled: true,
            theme: 'theme1',
            title: {
                text: `Total votes ${totalVotes}`
            },
            data: [
                {
                    type: 'column',
                    dataPoints: dataPoints
                }
            ]
        });
    
        chart.render();
    
        Pusher.logToConsole = true;
    
        let pusher = new Pusher('15c582b23992bcac3a50', {
            cluster: 'ap1',
            forceTLS: true
        });
    
        let channel = pusher.subscribe('os-poll');
    
        channel.bind('os-vote', function(data) {
            dataPoints = dataPoints.map((dataPoint) => {
                if (dataPoint.label === data.os) {
                    dataPoint.y += data.points;
                    return dataPoint;
                } else {
                    return dataPoint;
                }
            });
            chart.render();
        });
    }
})
.catch(err => console.error(err));