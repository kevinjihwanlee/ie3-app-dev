// mock data
// if you think each event object needs more attributes, include them in your PR

let events = [
  {
    id: '1',
    name: 'Rachael\'s 21st Birthday!',
    author: 'rach',
    description: 'better than the party below because it has a really long description, so you can test what long descriptions do, in case that is interesting content to know about. We can make this section as long as we want with as much text as we want.',
    date_created: Date.now(),
    date_event: 'Feb 8',
    start_time: '10:00pm',
    end_time: '1:00am',
    location: '1024 Noyes Avenue, Evanston, IL 60201',
    saved: 32,
    coordinate: {
      latitude: 42.05336,
      longitude: -87.672662,
    },
    is_saved: true, // for if a user has saved that event
    uri: '' // we should pass in a unique image url here for each image to display
  },
  {
    id: '2',
    name: 'Norris Grand Opening',
    author: 'id123',
    description: 'Come celebrate the grand opening of Norris with free food!',
    date_created: Date.now(),
    date_event: 'Oct 8',
    start_time: '1:00pm',
    end_time: '4:00pm',
    location: "Norris Student Center at Northwestern University",
    saved: 2,
    latitude: 42.05336,
    longitude: -87.672662,
    is_saved: true,
  },
  {
    id: '3',
    name: 'a party',
    author: 'id321',
    description: 'party to end all parties at ridge and noyes, you cannot miss this spectacle. lots of good times and chips and dip. welcome to all! :)',
    date_created: Date.now(),
    date_event: 'Feb 8',
    start_time: '10:00pm',
    end_time: '3:00am',
    location: 'mikalya\'s place, 1514 Ridge Place',
    saved: 45,
    latitude: 42.05336,
    longitude: -87.672662,
    is_saved: true,
  },
  {
    id: '4',
    name: 'Rachael\'s 20th Birthday!',
    author: 'rach',
    description: 'a past event that happened in the past it has a really long description you can test what long descriptions do, in case that is interesting content to know about. We can make this section as long as we want with as much text as we want.',
    date_created: Date.now(),
    date_event: 'Feb 8',
    start_time: '10:00pm',
    end_time: '1:00am',
    location: '1024 Noyes Avenue, Evanston, IL 60201',
    saved: 32,
    latitude: 42.05336,
    longitude: -87.672662,
  },
  {
    id: '5',
    name: 'Lunar New Year Parade',
    author: 'rach',
    description: 'Come see the parade in Chicago, it will be soo much fun with everyone there to cheer on our dancers and eat good food. We will provide free lanterns for our lantern lighting festival, we just ask you to bring cash for our food vendors at the event!',
    date_created: Date.now(),
    date_event: 'Feb 10',
    start_time: '1:00am',
    end_time: '6:00am',
    location: 'Chinatown, by Jill\'s Bakery',
    saved: 32,
    latitude: 42.05336,
    longitude: -87.672662,
  },
  {
    id: '6',
    name: 'Shrek the Musical',
    author: 'rach',
    description: 'You know everyone\'s excited to see Shrek and the gang back at it again.',
    date_created: Date.now(),
    date_event: 'Feb 11',
    start_time: '6:00pm',
    end_time: '8:00pm',
    location: 'Cahn Auditorium',
    saved: 32,
    latitude: 42.05336,
    longitude: -87.672662,
  }
]