import React from 'react'
import PropTypes from "prop-types";
import moment from 'moment';

import { useList, useListKeys, useObject } from 'react-firebase-hooks/database';
import firebase from 'firebase';

const parseDate = dateString => {
    const [year, month, date, hours, minutes, seconds] = (dateString||"").split(',').map(s => Number(s));
    console.log(month);
    return new Date(year, month - 1, date, hours, minutes, seconds, 0);
}

const parseValue = value => {
    return {
        date: moment(parseDate(value.date)).unix(),
        realDate: parseDate(value.date),
        sentiment: value.sentiment * 1.5
    }
}
const FirebaseAdapter = ({children}) => {
    const { error, value, loading } = useObject(firebase.database().ref("data"));
    return (
    <div>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Loading...</span>}
        {value && <span>{
            children({ values: Object.values(value.val()).map(parseValue).sort((a, b) => a.date - b.date) })
        }</span>}
    </div>)

}


FirebaseAdapter.propTypes = {
    children: PropTypes.func.isRequired
};
export default FirebaseAdapter;