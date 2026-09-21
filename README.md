# To-do List

A simple to-do list. Add tasks, tick them off, delete them, and filter by All, Active, or Done. A progress bar shows how much you've finished, and your list is saved in your browser so it's still there after a refresh.

Built with plain HTML, CSS, and JavaScript. No libraries, no build step.

## Use it

1. Download or clone this repo.
2. Open `index.html` in your browser.

## How it works

- Tasks live in an array of objects: `{ id, text, done }`.
- Every action (add, tick, delete, clear) changes the array, saves it to `localStorage`, and redraws the list.
- One event listener on the list handles all the checkboxes and delete buttons, so new tasks work without extra setup.

## Files

- `index.html`: page structure
- `style.css`: layout and styling
- `script.js`: app logic

## Ideas for next steps

- Edit a task by double-clicking it
- Add due dates and sort by them
- Drag and drop to reorder tasks
- Add categories or tags

## Live demo

https://github.com/saundankararnav7625
