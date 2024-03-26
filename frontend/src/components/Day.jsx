import React, { useEffect, useState } from 'react'

const Day = ({weather, mood, number}) => {
  return (
        <li className='day'>
            <span>{number}</span>
            {/* animated svgs on hover */}
            <img src={`../images/${weather}`} />
            <img src={`../images/${mood}`} alt="" />
        </li>
    )
};

export default Day;