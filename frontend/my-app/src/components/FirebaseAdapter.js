import React from 'react'
import PropTypes from "prop-types";

import { useList, useListKeys, useObject } from 'react-firebase-hooks/database';
import firebase from 'firebase';

const parseDate = dateString => {
    const [year, month, date, hours, minutes, seconds] = dateString.split(',').map(s => Number(s));
    return new Date(year, month, date, hours, minutes, seconds, 0);
}

const parseValue = value => {
    return {
        date: parseDate(value.date).getTime(),
        sentiment: value.sentiment
    }
}
const FirebaseAdapter = ({children}) => {
    const { error, value, loading } = useObject(firebase.database().ref("data"));
    return (
    <div>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Loading...</span>}
        {value && <span>{
            children({ values: Object.values(value.val()).map(parseValue) })
        }</span>}
    </div>)

}


FirebaseAdapter.propTypes = {
    children: PropTypes.func.isRequired
};
export default FirebaseAdapter;