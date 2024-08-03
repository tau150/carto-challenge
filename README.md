
# How to run the project locally


<br>

### Configuration

<br>

- Create a .env.local file with the following content


Reference: https://www.mapbox.com/
```
VITE_MAP_BOX_API_KEY=your-map-box-key
```

```
  npm install
  npm start
```

<br>

Here there are some sources you can use to play around:

```
https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/san-francisco.geojson
https://raw.githubusercontent.com/dwillis/nyc-maps/master/boroughs.geojson
https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/chicago.geojson
https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart.geo.json
```

<br><br>

## Test

To run tests and check coverage, use:
<br>
```
  npm run test
  npm run coverage
```
<br><br>


## Approach

The idea was to keep the challenge as simple as possible while providing a solid structure for future implementations. With this in mind, I defined module folders containing everything each module needs to work properly, such as components, views, domain models, and hooks. I always try to keep the folders scoped. For example, if there is a component or hook designed to work in a specific component, you will find an inner folder called "components" or "hooks" within that component's folder.



<br><br>

## Data fetching, Layer building, and cache

For data fetching, I implemented a rudimentary cache to avoid refetching resources that were already fetched in the past. This could be handled better with a library like TanStack Query, for example. However, I decided not to install this extra library for the challenge.
I tried to cache the generated layers to avoid recreating them if the data was the same. I noticed that intersections could take some time and are expensive. But for some reason, I encountered some errors when these layers were applied to the map.

<br><br>

## Styles

I am using styled-components because it is simple and flexible. I think for the scope of the exercise, it is more than enough. However, if performance is crucial in the real project and the project would have many styles applied, other options might be better.
I didn't take care about responsive design for this assignment. Because that would take more time, and this app seems to be thinking to work in desktop.


<br><br>

## Linting

I have set some ESLint rules to maintain a consistent style, but this is really opinionated and can be customized to suit the development team's preferences.


<br><br>


## Possible improvements

As mentioned before, the cache could be improved. Probably, the performance of the map and how it loads the layers could also be enhanced. This is something I should research further.
Surely, there are points to improve around the map and the flow. This is my first time using React Flow and DeckGL, so I imagine things could be made better.


<br><br>


## Assignment feedback

The assignment was really fun. I think it is not an easy one for someone who hadn't worked with these specific libraries in the past, like me. It takes some time to understand how things work and requires some research in the libraries' documentation.
It was nice to learn something new.

<br><br>