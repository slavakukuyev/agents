import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import _ from 'lodash';
import moment from 'moment';

import './DefaultSortTable.css';

import $ from 'jquery';

let revertSortFunc = function (a, b, order) {   // order is desc or asc
    let am = moment.utc(a.date).unix();
    let bm = moment.utc(b.date).unix();

    if (order === 'desc') {
        return am - bm;
    } else {
        return bm - am;
    }
};

let agents = [
    {
        agent: '007', country: 'Brazil',
        address: 'Avenida Vieira Souto 168 Ipanema, Rio de Janeiro',
        date: 'Dec 17, 1995, 9:45:17 PM'
    },
    {
        agent: '005', country: 'Poland',
        address: 'Rynek Glowny 12, Krakow',
        date: 'Apr 5, 2011, 5:05:12 PM'
    },
    {
        agent: '007', country: 'Morocco',
        address: '27 Derb Lferrane, Marrakech',
        date: 'Jan 1, 2001, 12:00:00 AM'
    },
    {
        agent: '005', country: 'Brazil',
        address: 'Rua Roberto Simonsen 122, Sao Paulo',
        date: 'May 5, 1986, 8:40:23 AM'
    },
    {
        agent: '011', country: 'Poland',
        address: 'swietego Tomasza 35, Krakow',
        date: 'Sep 7, 1997, 7:12:53 PM'
    },
    {
        agent: '003', country: 'Morocco',
        address: 'Rue Al-Aidi Ali Al-Maaroufi, Casablanca',
        date: 'Aug 29, 2012, 10:17:05 AM'
    },
    {
        agent: '008', country: 'Brazil',
        address: 'Rua tamoana 418, tefe',
        date: 'Nov 10, 2005, 1:25:13 PM'
    },
    {
        agent: '013', country: 'Poland',
        address: 'Zlota 9, Lublin',
        date: 'Oct 17, 2002, 10:52:19 AM'
    },
    {
        agent: '002', country: 'Morocco',
        address: 'Riad Sultan 19, Tangier',
        date: 'Jan 1, 2017, 5:00:00 PM'
    },
    {
        agent: '009', country: 'Morocco',
        address: 'atlas marina beach, agadir',
        date: 'Dec 1, 2016, 9:21:21 PM'
    }
];

let getAgents = function () {
    return agents;
};

let getIsolatedData = function (agents) {
    if (!agents || !agents.length) {
        return "getIsolatedData error: No data in arguments";
    }

    let missionsByAgent = {},
        missionsByCountry = {},
        agentId,
        country,
        i = 0,
        length = agents.length;

    _.forEach(agents, function (agentObj) {
        agentId = agentObj.agent;
        if (!missionsByAgent[agentId]) {
            missionsByAgent[agentId] = [];
        }

        if (missionsByAgent[agentId].indexOf(agentObj.country) === -1) {
            (missionsByAgent[agentId]).push(agentObj.country);
        }
    });


    if (!missionsByAgent || _.isEmpty(missionsByAgent)) {
        return "missions by agent array is empty";
    }

    let addIsolated = function (country, agentId, isolated = "isolated") {
        switch (true) {
            //country key does not exist
            case !missionsByCountry[country]:
                missionsByCountry[country] = {
                    country: country,
                    [isolated]: [agentId]
                };
                break;
            //isolated/nonIsolated property does not exist
            case !missionsByCountry[country][isolated]:
                missionsByCountry[country][isolated] = [agentId];
                break;
            // agent has not added to the isolated/nonIsolated property
            case missionsByCountry[country][isolated].indexOf(agentId) === -1:
                (missionsByCountry[country][isolated]).push(agentId);
                break;
            default:
                break;
        }
    };

    _.forEach(missionsByAgent, function (countries, agentId) {
        if (countries.length === 1) {
            country = countries[0];
            addIsolated(country, agentId, "isolated");
        } else {
            i = 0;
            length = countries.length;
            for (; i < length; i++) {
                country = countries[i];
                addIsolated(country, agentId, "nonIsolated");
            }
        }
    });

    if (_.isEmpty(missionsByCountry)) {
        return "Error: missions by country is empty";
    }

    let maxAgents = 0;
    _.forEach(missionsByCountry, function (obj) {
        if (obj.isolated && obj.isolated.length > maxAgents) {
            maxAgents = obj.isolated.length;
        }
    });

    let isolatedCountry = _.filter(missionsByCountry, function (o) {
        return o.isolated.length === maxAgents;
    });

    let message = "Country/ies: "
        + isolatedCountry.map(function (o) {
            return o.country;
        }).join(",")
        + " has/have max count("
        + maxAgents
        + ") of isolated agents";

    return message;
};

let Coordinates = function () {
    this.accessKey = "AIzaSyAW8VnsEBodqd20vpYKPMqnBuRk0ssM0P4";
    this.basicUrl = "https://maps.googleapis.com/maps/api/geocode/json";
    this.centralOffice = {address: "10 Downing st. London"};

    // get lat lhg coordinates from google API
    this.getLatLong = function (address) {
        let result = false;
        $.ajax({
            url: this.basicUrl,
            data: {address: address, key: this.accessKey},
            async: false,
            success: function (data) {
                result = data;
            }
        });

        return result;
    };

    /*calculate distance between two points
    code taken from stackoverflow:
     http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
    */
    this.calculateDistance = function (lat1, lon1) {
        if (!this.centralOffice.location) {
            return 0;
        }

        let lat2 = this.centralOffice.location.lat;
        let lon2 = this.centralOffice.location.lng;
        let deg2rad = function (deg) {
            return deg * (Math.PI / 180)
        };

        let R = 6371; // Radius of the earth in km
        let dLat = deg2rad(lat2 - lat1);  // deg2rad below
        let dLon = deg2rad(lon2 - lon1);
        let a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    };

};

let getDistanceCollection = function (agents) {
    let coordinatesObj = new Coordinates();
    let locationResult = coordinatesObj.getLatLong(coordinatesObj.centralOffice.address);
    if (locationResult.status !== "OK") {
        console.log("Error on get central office location");
        return false;
    }

    coordinatesObj.centralOffice["location"] = locationResult.results[0].geometry.location;
    let location;

    let i = 0,
        length = agents.length;
    for (; i < length; i++) {
        locationResult = coordinatesObj.getLatLong(agents[i].address);
        if (locationResult.status !== "OK") {
            console.log("Error to get address from Google Maps API for address: " + agents[i].address);
            continue;
        }

        location = locationResult.results[0].geometry.location;
        agents[i]["distance"] = coordinatesObj.calculateDistance(location.lat, location.lng);
    }

    return agents;
};

let columnClassNameFormat  = function(fieldValue, row) {
    // fieldValue is column value
    // row is whole row object
    // rowIdx is index of row
    // colIdx is index of column
    return row.class;
};

class DefaultSortTable extends Component {
    constructor(props) {
        super(props);

        this.options = {
            defaultSortName: 'date',  // default sort column name
            defaultSortOrder: 'desc'  // default sort order
        };


        this.state = {
            agents: getAgents(),
            isolatedData: [],

        };
    };


    componentDidMount() {
        let isolatedData = getIsolatedData(this.state.agents);

        let agents = getDistanceCollection(this.state.agents);
        if (!agents || _.isEmpty(agents)) {
            this.setState({isolatedData: isolatedData});
            return;
        }

        // get mission with max distance from central office
        let maxObj = _.maxBy(agents, function (o) {
            return o.distance;
        });
        // get mission with min distance from central office
        let minObj = _.minBy(agents, function (o) {
            return o.distance;
        });

        // get indexes of missions with max and min distance
        let maxIndex = _.findIndex(agents, maxObj);
        let minIndex = _.findIndex(agents, minObj);

        //set style for both rows
        agents[maxIndex]["class"] = "maxDistance";
        agents[minIndex]["class"] = "minDistance";


        this.setState({isolatedData: isolatedData, agents: agents});
    }



    render() {
        return (
            <div>
                <section>
                    <div className="datagrid">
                        <BootstrapTable data={ this.state.agents } options={ this.options } hover>
                            <TableHeaderColumn dataField='agent' isKey dataSort
                                               columnClassName={ columnClassNameFormat }>Agent</TableHeaderColumn>
                            <TableHeaderColumn dataField='country' dataSort columnClassName={ columnClassNameFormat }>Country</TableHeaderColumn>
                            <TableHeaderColumn dataField='address' dataSort columnClassName={ columnClassNameFormat }>Address</TableHeaderColumn>
                            <TableHeaderColumn dataField='date' dataSort sortFunc={ revertSortFunc }
                                               columnClassName={ columnClassNameFormat }>Date</TableHeaderColumn>
                        </BootstrapTable>

                    </div>
                    <div className="missionsLength">
                        { this.state.agents.length } missions
                    </div>
                </section>
                <section>
                    <div className="isolated">Isolated data : { this.state.isolatedData}</div>
                </section>


            </div>


        );
    }
}

export default DefaultSortTable;
