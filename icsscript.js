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
        const date = block.querySelector
    }

});