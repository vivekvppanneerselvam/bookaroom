const Room = require('./Room')

Room.create([ 
  {
    no:101,
    name: 'Green Screen Room',
    floor: '13',
    capacity: 2,
    wingName: 'Kalam Wing',
    assets: {
      ac: true
    }
  }
])
  .then((rooms) => {
    console.log(`Created ${rooms.length} rooms.`)
  })
  .catch((error) => {
    console.error(error)
  })