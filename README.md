Code Challenge 

Use Plunker to implement. Don’t forget to hit save. When you are done, email the url (with the hash).

* Please choose a boilerplate (framework) you feel most comfortable with (Angular 1, Angular 2, React, Vue.js, etc) and use it - This is not optional!
You can choose whatever npm 3rd party package you deem necessary.

* Try to implement with architecture considerations and edge cases in mind.

* Plunker comes with many boilerplates, you can use them if you like (use the green ‘new’ dropdown) or create your own.

Recommendation: read everything before you start to implement.

Good morning, agent. MI6 is trying to gather statistics about its missions.
Your mission, should you decide to accept it, has two parts.

Sample input: 
[
   {agent: '007', country: 'Brazil', 
        address: 'Avenida Vieira Souto 168 Ipanema, Rio de Janeiro',
        date: 'Dec 17, 1995, 9:45:17 PM'
   },
   {agent: '005', country: 'Poland', 
        address: 'Rynek Glowny 12, Krakow',
        date: 'Apr 5, 2011, 5:05:12 PM'
   },
   {agent: '007', country: 'Morocco', 
        address: '27 Derb Lferrane, Marrakech',
        date: 'Jan 1, 2001, 12:00:00 AM'
   },
   {agent: '005', country: 'Brazil', 
        address: 'Rua Roberto Simonsen 122, Sao Paulo',
        date: 'Sao Paulo	May 5, 1986, 8:40:23 AM'
   },
   {agent: '011', country: 'Poland', 
        address: 'swietego Tomasza 35, Krakow',
        date: 'Krakow	Sep 7, 1997, 7:12:53 PM'
   },
   {agent: '003', country: 'Morocco', 
        address: 'Rue Al-Aidi Ali Al-Maaroufi, Casablanca',
        date: 'Aug 29, 2012, 10:17:05 AM'
   },
   {agent: '008', country: 'Brazil', 
        address: 'Rua tamoana 418, tefe',
        date: 'Nov 10, 2005, 1:25:13 PM'
   },
   {agent: '013', country: 'Poland', 
        address: 'Zlota 9, Lublin',
        date: 'Oct 17, 2002, 10:52:19 AM'
   },
   {agent: '002', country: 'Morocco', 
        address: 'Riad Sultan 19, Tangier',
        date: 'Jan 1, 2017, 5:00:00 PM'
   },
   {agent: '009', country: 'Morocco', 
        address: 'atlas marina beach, agadir',
        date: 'Dec 1, 2016, 9:21:21 PM'
   }
]







Part 1: 
An isolated agent is defined as an agent that participated in a single mission.
Find the most isolated country (the country with the highest degree of isolation).
For the above input:
Brazil has 1 isolated agent (008) and 2 non-isolated agents (007, 005)
Poland has 2 isolated agents (011, 013) and one non-isolated agent (005)
Morocco has 3 isolated agents (002, 009, 003) and one non-isolated agent (007)

So the result is Morocco with an isolation degree of 3.

Part 2:
Find the closest and farthest missions from 10 Downing st. London
Without using any css frameworks, implement the grid below with the following guidelines:
Get as close as you can to the styling below
Sorted by mission date ascending
The closest mission in green
The farthest mission in red




Extra effort:
Make the grid sortable by all fields -
this can be a simple drop-down to select the field to sort by
* Using Google Maps api, place map markers on the world map - one for each mission.
Explain the complexity of your algorithm
What test cases would you check?
