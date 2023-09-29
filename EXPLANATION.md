# Context

There is a data from sheet [https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list](https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list), we need to serve that data, the data is about fishery price in some area, it have comodity (fish name), city, province, price, size, and data creation date.

# Goals

We need a basic features like:
1. View and search for the desired data list
2. Sort and filter data based on the desired column
3. Add data to the price "list".

The desired goals are:
1. A pleasant experience to search and view data
2. Enjoyable experience for adding data
3. A display that can be enjoyed comfortably on desktop or mobile

# Problems

Problem come from the API, the API have limited capability for pagination, it just have `limit` to limit per page and `offset` to cursoring the page number, this information based on the documentation [https://docs.steinhq.com/read-data ](https://docs.steinhq.com/read-data), it doesnt have sorting, filter `LIKE` so i dont want to use the `limit` and `offset`.

The goals is have `search`, `sort`, and `filter` functionality so what i do is `fetch` all data without `limit` and `offset` params, and yes it will give a problem related with loading speed on client side.

# Solution

## Speed Problem

My plan is use a webworker to cache the data with stale while revalidate strategy, but the problem is the API doesnt provide a header to inform `max-age` of the data so we need to do manually in client side, need to found a way to do caching without that `max-age` information.

## Mobile View And Desktop View

I come with approach __adaptive design__ not __responsive__ design, icome with this approach because i think server data on mobile and desktp is different and need different view. In __addaptive design__, it will fit the look of the table based on screen width, it happen before the render.

1. Desktop View
For the desktop view, i come with common solution that is showing list of data using table with pagination.

![Screenshot from desktop view](desktop-view.png)

2. Mobile View
For the mobile view, i come with approach to combine some data and leaving only 2 column, the `Komoditas` and `Price`, in `Komoditas` i combine data from the `size`, `province` and `city`, with this approach i can get compact view that still __readable from my perspective__.

![Screenshot from mobile view](mobile-view.png)

## Functionality

- Search, this search input is searching for data from komoditi, province, and city. It also give information how much data found.
- Filter based on Province, it will filter based on the province user choose, user can choose multiple province to it.
- Per page, basic functionality for pagination, user can choose to show 10, 25, 50, or 100.
- Bottom navigation: navigation using Next and Previous.

## Input New Data

I come with basic approach, when user click the button, it will show a modal with form inside it, use can fill fish name, price, area (province and city), and size and then save the new data.
Data in select for the area was come from [https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_area](https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_area) and the size select come from [https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_size](https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_size)

![Tambah Data](tambah-data.png).
