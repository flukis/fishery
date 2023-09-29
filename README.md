# Fishery Data
This is for test assesment purpose. Open Preview -> [https://test-fishery-f.netlify.app/fishery-price](https://test-fishery-f.netlify.app/fishery-price)

## Stack
- `React >18`
- `Vite`
- `Efishery/json-reactform`, to auto generate form using json file declaration, see more detail [here](https://github.com/eFishery/json-reactform)
- `react-table` v8
- `react-select`

All stack that i choose is stack that already know (except for json-reactform), so it easier to get productive.

## Hot To Navigate This Project
- `src/pages`: all pages will put in, page like home, about, or anything you want
- `src/main.tsx`: if you want add more pages you need to register your page here
- `src/utils`: all helpers here, include the custom hooks
- `src/modules`: all component goes here

## How To Run This Project
1. You need NPM and Node, install latest LTS.
2. I use PNPM so install it using command `npm install -g pnpm`
3. Clone this repo
4. Enter the root folder of this project and type `pnpm install`, it will install a whole internet (just kidding)
5. Run this project by typing `npm run dev`.

## Progression

- [x] Show data to table
- [x] Add filter by province
- [x] Add search throught province name, city name, and comodity
- [x] Table sort using column
- [x] Cache for the list
- [x] Add data using "Tambah" button
- [x] Responsive Mobile
- [x] Write documentation

