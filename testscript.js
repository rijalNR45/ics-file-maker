const addEventBtn = document.getElementById('add-event');
    const generateBtn = document.getElementById('generate-ics');
    const container = document.getElementById('events-container');

    // Function to format Date object to ICS local time format (YYYYMMDDTHHMMSS)
    const formatLocal = (d) => {
      const pad = (n) => n.toString().padStart(2, '0');
      return (
        d.getFullYear().toString() +
        pad(d.getMonth() + 1) +
        pad(d.getDate()) +
        'T' +
        pad(d.getHours()) +
        pad(d.getMinutes()) +
        pad(d.getSeconds())
      );
    };

    // Add another event block dynamically
    addEventBtn.addEventListener('click', () => {
      const firstBlock = container.querySelector('.event-block');
      const newBlock = firstBlock.cloneNode(true);
      newBlock.querySelectorAll('input').forEach(input => input.value = input.defaultValue || '');
      container.appendChild(newBlock);
    });

    // Generate ICS file
    generateBtn.addEventListener('click', () => {
      const eventBlocks = container.querySelectorAll('.event-block');
      const events = [];

      eventBlocks.forEach((block, index) => {
        const title = block.querySelector('.title').value || `Event ${index+1}`;
        const date = block.querySelector('.date').value;
        const time = block.querySelector('.time').value;
        const duration = parseInt(block.querySelector('.duration').value) || 60;
        const description = block.querySelector('.description').value || '';
        const location = block.querySelector('.location').value || '';

        if (date && time) { // only include valid events
          // Create Date object in local time
          const [hours, minutes] = time.split(':').map(Number);
          const [year, month, day] = date.split('-').map(Number);
          const startDate = new Date(year, month - 1, day, hours, minutes);
          const endDate = new Date(startDate.getTime() + duration * 60000); // duration in ms

          events.push({
            uid: Date.now() + index + "@mycalendar", // unique UID
            dtstamp: formatLocal(new Date()),        // local time
            dtstart: formatLocal(startDate),         // local time
            dtend: formatLocal(endDate),             // local time
            summary: title,
            description,
            location
          });
        }
      });

      // Build ICS content
      let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyApp//Multi-Event ICS Local//EN
`;
      events.forEach(ev => {
        icsContent += `BEGIN:VEVENT
UID:${ev.uid}
DTSTAMP:${ev.dtstamp}
DTSTART:${ev.dtstart}
DTEND:${ev.dtend}
SUMMARY:${ev.summary}
DESCRIPTION:${ev.description}
LOCATION:${ev.location}
END:VEVENT
`;
      });
      icsContent += "END:VCALENDAR";

      // Trigger download
      const blob = new Blob([icsContent], {type: 'text/calendar'});
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'events.ics';
      link.click();
    });