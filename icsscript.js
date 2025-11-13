const addEventBtn = document.getElementById('add-event');
const generateBtn = document.getElementById('generate-ics');
const container = document.getElementById('events-container');


//handle another event button
addEventBtn.addEventListener('click', () => {
    const firstBlock = container.querySelector('.event-block');
    const newBlock = firstBlock.cloneNode(true);

    newBlock.querySelectorAll('input').forEach(input => input.value = input.defaultValue || '');
    container.appendChild(newBlock);
});

//handle generate ics button
generateBtn.addEventListener('click', () => {
    const eventBlocks = container.querySelectorAll('.event-block');
    const events = [];


//loop through each event blocks to gather input values
    eventBlocks.forEach((block, index) => {
        const title = block.querySelector('.title').value || `Event ${index = +1}`;
        const date = block.querySelector('.date').value;
        const time = block.querySelector('.time').value;
        const duration = parseInt(block.querySelector('.duration').value) || 60;
        const description = block.querySelector(".description").value || '' ;

        if (date && time) {

        const [hours, minutes] = time.split(':').map(Number);
        const [year, month, day] = date.split('-').map(Number);
        const startDate = new Date(year, month -1, day, hours, minutes);
        const endDate = new Date(startDate.getTime() + duration * 60000);

        const formatLocal = (d) => {

            const pad = (n) => n.toString().padStart(2, '0');
            return (
                d.getFullYear().toString() +
                pad(d.getMont() + 1)+
                pad(d.getDate()) +
                'T' +
                pad(d.getHours()) +
                pad(d.getMinutes()) +
                pad(d.getSeconds())
            );
        };
        events.push ({
            uid: Date.now() + index + "@nirajancalendar",
            distamp : formatLocal(new Date()),
            dtstart : formatLocal(startDate),
            dtend: formatLocal(endDate),
            summary: title, 
            description
        })

        let icsContent = `BEGIN:VCALENDAR
        VERSION:2.0
        PRODID:-//Nirajan Calendar//EN`;
        events.forEach(ev => {
            icsContent +=`BEGIN:VEVENT
UID:${ev.uid}
DTSTAMP:${ev.distamp}
DTSTART:${ev.dtstart}
DTEND:${ev.dtend}
SUMMARY:${ev.summary}
DESCRIPTION:${ev.description}
END:VEVENT
`;
        });
        icsContent += 'END:VCALENDAR';

        const blob = new Blob([icsContent], {type: 'text/calendar'});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'events.ics';
        link.click();
        }
    }
    )
});