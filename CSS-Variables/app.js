// Select all input elements 
const inputs = document.querySelectorAll('.controls input'); // create a NoteList

function handleUpdate() {
   const suffix = this.dataset.sizing || ''; // '' means or nothing to avoid undefined value
//    console.log(this.value + suffix) --> 10px
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix); 
    // <input id="spacing" type="range" name="spacing" min="10" max="200" value="10" data-sizing="px">
    //--${this.name} = --spacing;
    // this.value = value=""
}

// Listen for change events 
inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));