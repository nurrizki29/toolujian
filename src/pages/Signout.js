//import hook react
import React, { useState ,useEffect } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';

import Cookies from 'universal-cookie';
import ReactGA from 'react-ga';

function Signout() {
    const cookies = new Cookies();
    const history = useHistory();
    ReactGA.event({
        category: 'Account',
        action: 'Signout',
        label: cookies.get("data").nama
    })
    cookies.remove("data",{path:'/'});
    //redirect login page
    history.push('/');
    return (<div></div>
    )
}

export default Signout
